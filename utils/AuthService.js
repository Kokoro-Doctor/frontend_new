import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";
WebBrowser.maybeCompleteAuthSession();

import {
  API_URL,
  androidClientId,
  expoClientId,
  iosClientId,
  webClientId,
} from "../env-vars";


// Google Auth Request
export const useGoogleAuth = () => {
  return Google.useAuthRequest({
    androidClientId,
    iosClientId,
    webClientId,
    expoClientId,
    // Web can request ID token, native will fall back to accessToken
    responseType: Platform.OS === "web" ? "id_token" : "token",  
    scopes: ["openid", "profile", "email"],
    redirectUri: makeRedirectUri({
      native: "com.profcess.kokoro.doctor.app:/oauthredirect", // must match in Google console
      useProxy: __DEV__, // only use proxy in dev
    }),
  });
};

export const registerDoctor = async ({
  doctorname,
  email,
  password,
  phoneNumber,
  location,
}) => {
  const response = await fetch(`${API_URL}/auth/doctor/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      doctorname,
      email,
      password,
      phoneNumber,
      location,
    }),
  });

  if (!response.ok) {
    throw new Error("Doctor registration failed");
  }

  const data = await response.json();
  const { doctor } = data;

  await AsyncStorage.setItem("@doctor", JSON.stringify(doctor));
  return doctor;
};


export const signup = async (
  username,
  email,
  password,
  phoneNumber,
  location
) => {
  const response = await fetch(`${API_URL}/auth/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password, phoneNumber, location }),
  });

  if (!response.ok) {
    const data = await response.json();
    const errorMessage = data?.detail || `SignUp Failed ${response.status}`;
    throw new Error(errorMessage);
  }

  const data = await response.json();
  console.log("Signup API Response:", data);

  return data;
};

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const data = await response.json(); // Parse error response
    const errorMessage =
      data?.detail || `Login failed with status ${response.status}`;
    throw new Error(errorMessage);
  }

  const data = await response.json();
  const { access_token, user } = data;

  await AsyncStorage.setItem("@token", access_token);
  await AsyncStorage.setItem("@user", JSON.stringify(user));

  return { access_token, user };
};

export const logOut = async (setUser) => {
  await AsyncStorage.removeItem("@token");
  await AsyncStorage.removeItem("@user");
  if (setUser) setUser(null);
};

export const getUserInfo = async (token) => {
  if (!token) return;
  const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const user = await response.json();
  await AsyncStorage.setItem("@user", JSON.stringify(user));
  await AsyncStorage.setItem("@token", token);
  return user;
};


export const handleGoogleLogin = async (response) => {
  try {
    let payload = {};

    if (response?.type === "success") {
      if (Platform.OS === "web") {
        // Web gives id_token
        const id_token = response.params?.id_token || response.authentication?.idToken;
        payload = { token: id_token, type: "id" };
        console.log("👉 Sending id_token to backend:", id_token?.slice(0, 10));
      } else {
        // iOS / Android gives accessToken
        const accessToken = response.authentication?.accessToken;
        payload = { token: accessToken, type: "access" };
        console.log("👉 Sending accessToken to backend:", accessToken?.slice(0, 10));
      }
    }

    const res = await fetch(`${API_URL}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(`Google login failed on backend: ${error.detail}`);
    }

    const data = await res.json();
    console.log("✅ Backend login success:", data);
    return data;
  } catch (err) {
    console.error("❌ Google login error:", err);
    return null;
  }
};

export const restoreUserState = async () => {
  const token = await AsyncStorage.getItem("@token");
  const user = await AsyncStorage.getItem("@user");
  if (token && user) {
    return { token, user: JSON.parse(user) };
  }
  return null;
};


