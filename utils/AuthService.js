import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

import {
  API_URL,
  androidClientId,
  iosClientId,
  webClientId,
} from "../env-vars";


// Google Auth Request
export const useGoogleAuth = () => {
  return Google.useAuthRequest({
    androidClientId,
    iosClientId,
    webClientId,
    redirectUri: makeRedirectUri({
      
      scheme: "kokoro",     // must match app.json → "scheme": "kokoro"
    }),
    useProxy: __DEV__,      // true in dev, false in production build
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

  // if (!response.ok) {
  //   throw new Error("Signup Failed");
  // }
  if (!response.ok) {
    const data = await response.json(); // Parse error response
    const errorMessage =
      data?.detail || `SignUp Failed ${response.status}`;
    throw new Error(errorMessage);
  }
  const data = await response.json();
  const { user } = data;

  await AsyncStorage.setItem("@user", JSON.stringify(user));
  return user;
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

// export const handleGoogleLogin = async (response) => {
//   if (response?.type === "success" && response.authentication?.accessToken) {
//     const user = await getUserInfo(response.authentication.accessToken);
//     WebBrowser.dismissBrowser();
//     return user;
//   }
//   return null;
// };

export const handleGoogleLogin = async (response) => {
  if (response?.type === "success" && response.authentication?.idToken) {
    try {
      const backendResponse = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.authentication.idToken }),
      });

      if (!backendResponse.ok) {
        throw new Error("Google login failed on backend");
      }

      const data = await backendResponse.json();
      const { user, access_token } = data;

      await AsyncStorage.setItem("@token", access_token);
      await AsyncStorage.setItem("@user", JSON.stringify(user));

      return user;
    } catch (err) {
      console.error("❌ Google login backend error:", err);
      throw err;
    }
  }
  return null;
};


export const restoreUserState = async () => {
  const token = await AsyncStorage.getItem("@token");
  const user = await AsyncStorage.getItem("@user");
  if (token && user) {
    return { token, user: JSON.parse(user) };
  }
  return null;
};


