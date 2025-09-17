import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

import {
  API_URL,
  androidClientId,
  iosClientId,
  webClientId
} from "../env-vars";

const getRedirectUri = () => {
  const isExpoGo = Constants.executionEnvironment === "storeClient";
  
  if (isExpoGo) {
    // Always use the proxy URI format for Expo Go
    const owner = Constants.expoConfig?.owner;
    const slug = Constants.expoConfig?.slug;
    
    if (!owner || !slug) {
      console.warn("Missing owner or slug in expoConfig");
      // Fallback to makeRedirectUri if config is missing
      return AuthSession.makeRedirectUri({ useProxy: true });
    }

    return `https://auth.expo.dev/@${owner}/${slug}`;
  } else {
    // Use custom scheme for standalone builds
  return AuthSession.makeRedirectUri({
    native:
        "com.googleusercontent.apps.569847732356-mv68e01dvj204ouqjj0k48a8hq54knh3:/oauthredirect",
  });
  }
};

const redirectUri = getRedirectUri();
console.log("Google Redirect URI:", redirectUri);

export const useGoogleAuth = () => {
  console.log("🔍 Client IDs:", {
    androidClientId: androidClientId?.substring(0, 20) + "...",
    iosClientId: iosClientId?.substring(0, 20) + "...",
    webClientId: webClientId?.substring(0, 20) + "...",
  });
  
  return Google.useAuthRequest({
    androidClientId,
    iosClientId,
    webClientId,
    // expoClientId,
    responseType: "id_token",
    scopes: ["openid", "profile", "email"],
    redirectUri, // use the variable
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
    if (response?.type !== "success") {
      console.warn("⚠️ Google login cancelled or failed:", response);
      return null;
    }

    const id_token = response.params?.id_token || response.authentication?.idToken;
    if (!id_token) {
      console.error("❌ No ID token received from Google response:", response);
      return null;
    }

    const payload = { token: id_token }; // 👈 always id_token
    console.log("👉 Sending id_token to backend:", id_token.slice(0, 10));

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

    if (data?.access_token) {
      await AsyncStorage.setItem("@token", data.access_token);
    }
    if (data?.user) {
      await AsyncStorage.setItem("@user", JSON.stringify(data.user));
    }

    return data;
  } catch (err) {
    console.error("❌ Google login error:", err.message || err);
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


