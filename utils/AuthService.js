// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { makeRedirectUri } from "expo-auth-session";
// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from "expo-web-browser";
// import { Platform } from "react-native";
// WebBrowser.maybeCompleteAuthSession();

// import {
//   API_URL,
//   androidClientId,
//   iosClientId,
//   webClientId,
// } from "../env-vars";

// // // Google Auth Request
// // export const useGoogleAuth = () => {
// //   return Google.useAuthRequest({
// //     androidClientId: androidClientId,
// //     iosClientId: iosClientId,
// //     webClientId: webClientId,
// //     // redirectUri: "https://kokoro.doctor",
// //     redirectUri: makeRedirectUri({
// //     native: "com.kokoro.doctor:/oauthredirect",
// //     }),
// //     useProxy: false,
// //   });
// // };

// // Google Auth Request
// // export const useGoogleAuth = () => {
// //   return Google.useAuthRequest({
// //     androidClientId,
// //     iosClientId,
// //     webClientId,
// //     redirectUri: makeRedirectUri({
// //       scheme: "kokoro",     // must match app.json → "scheme": "kokoro"
// //     }),
// //     useProxy: __DEV__,      // true in dev, false in production build
// //   });
// // };

// // Enhanced Google Auth Request with Debugging
// export const useGoogleAuth = () => {
//   console.log("🔍 Auth Debug Info:");
//   console.log("Platform:", Platform.OS);
//   console.log("__DEV__:", __DEV__);
  
//   const config = {
//     androidClientId,
//     iosClientId,
//     webClientId,
//     useProxy: __DEV__,
//   };
  
//   // Force Expo's proxy redirect URI in development
//   if (__DEV__) {
//     config.redirectUri = "https://auth.expo.io/@kokoro_doctor/kokoro-doctor";
//     console.log("🛠️ Development mode - forcing Expo proxy URI");
//   } else {
//     config.redirectUri = makeRedirectUri({
//       scheme: "kokoro",
//     });
//     console.log("🏭 Production redirectUri:", config.redirectUri);
//   }
  
//   console.log("📋 Final config:", JSON.stringify(config, null, 2));
  
//   return Google.useAuthRequest(config);
// };

// export const registerDoctor = async ({
//   doctorname,
//   email,
//   password,
//   phoneNumber,
//   location,
// }) => {
//   const response = await fetch(`${API_URL}/auth/doctor/signup`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       doctorname,
//       email,
//       password,
//       phoneNumber,
//       location,
//     }),
//   });

//   if (!response.ok) {
//     throw new Error("Doctor registration failed");
//   }

//   const data = await response.json();
//   const { doctor } = data;

//   await AsyncStorage.setItem("@doctor", JSON.stringify(doctor));
//   return doctor;
// };

// export const signup = async (
//   username,
//   email,
//   password,
//   phoneNumber,
//   location
// ) => {
//   const response = await fetch(`${API_URL}/auth/user/signup`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username, email, password, phoneNumber, location }),
//   });

//   // if (!response.ok) {
//   //   throw new Error("Signup Failed");
//   // }
//   if (!response.ok) {
//     const data = await response.json(); // Parse error response
//     const errorMessage =
//       data?.detail || `SignUp Failed ${response.status}`;
//     throw new Error(errorMessage);
//   }
//   const data = await response.json();
//   const { user } = data;

//   await AsyncStorage.setItem("@user", JSON.stringify(user));
//   return user;
// };

// export const login = async (email, password) => {
//   const response = await fetch(`${API_URL}/auth/user/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!response.ok) {
//     const data = await response.json(); // Parse error response
//     const errorMessage =
//       data?.detail || `Login failed with status ${response.status}`;
//     throw new Error(errorMessage);
//   }

//   const data = await response.json();
//   const { access_token, user } = data;

//   await AsyncStorage.setItem("@token", access_token);
//   await AsyncStorage.setItem("@user", JSON.stringify(user));

//   return { access_token, user };
// };

// export const logOut = async (setUser) => {
//   await AsyncStorage.removeItem("@token");
//   await AsyncStorage.removeItem("@user");
// };

// export const getUserInfo = async (token) => {
//   if (!token) return;
//   const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   const user = await response.json();
//   await AsyncStorage.setItem("@user", JSON.stringify(user));
//   await AsyncStorage.setItem("@token", token);
//   return user;
// };

// export const handleGoogleLogin = async (response) => {
//   if (response?.type === "success" && response.authentication?.accessToken) {
//     const user = await getUserInfo(response.authentication.accessToken);
//     WebBrowser.dismissBrowser();
//     return user;
//   }
//   return null;
// };

// export const restoreUserState = async () => {
//   const token = await AsyncStorage.getItem("@token");
//   const user = await AsyncStorage.getItem("@user");
//   if (token && user) {
//     return { token, user: JSON.parse(user) };
//   }
//   return null;
// };






import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

import {
  API_URL,
  webClientId
} from "../env-vars";

// Google Auth Request
export const useGoogleAuth = () => {
  return Google.useAuthRequest({
    androidClientId: webClientId,
    iosClientId: webClientId, 
    webClientId,
    useProxy: true,
    redirectUri: "https://auth.expo.io/@kokoro_doctor/kokoro-doctor",
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
    const errorMessage =
      data?.detail || `SignUp Failed ${response.status}`;
    throw new Error(errorMessage);
  }

  const data = await response.json();

  if (data.user) {
    await AsyncStorage.setItem("@user", JSON.stringify(data.user));
    return data.user;
  }

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
    const data = await response.json();
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
};

export const getUserInfo = async (token) => {
  if (!token) return;
  
  const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }
  
  const user = await response.json();
  await AsyncStorage.setItem("@user", JSON.stringify(user));
  await AsyncStorage.setItem("@token", token);
  return user;
};

// export const getUserInfo = async (token) => {
//   console.log("🔹 Fetching user info with token:", token);

//   if (!token) {
//     console.error("❌ No token provided to getUserInfo");
//     return null;
//   }

//   const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   console.log("🔹 Google userinfo API response status:", response.status);

//   if (!response.ok) {
//     const text = await response.text();
//     console.error("❌ Failed to fetch user info. Response:", text);
//     throw new Error("Failed to fetch user info");
//   }

//   const user = await response.json();
//   console.log("✅ Parsed Google user info:", user);

//   await AsyncStorage.setItem("@user", JSON.stringify(user));
//   await AsyncStorage.setItem("@token", token);

//   return user;
// };


export const handleGoogleLogin = async (response) => {
  if (response?.type === "success" && response.authentication?.accessToken) {
    try {
      const user = await getUserInfo(response.authentication.accessToken);
      WebBrowser.dismissBrowser();
      return user;
    } catch (error) {
      console.error("Google login failed:", error);
      return null;
    }
  }
  return null;
};

// export const handleGoogleLogin = async (response) => {
//   console.log("🔹 Entered handleGoogleLogin with response:", response);

//   if (response?.type === "success" && response.authentication?.accessToken) {
//     try {
//       console.log("🔹 Access token received:", response.authentication.accessToken);

//       const user = await getUserInfo(response.authentication.accessToken);
//       console.log("✅ User info fetched from Google:", user);

//       WebBrowser.dismissBrowser();
//       return user;
//     } catch (error) {
//       console.error("❌ Error inside handleGoogleLogin:", error);
//       return null;
//     }
//   } else {
//     console.log("⚠️ Login not successful. Response type:", response?.type);
//   }
//   return null;
// };

export const restoreUserState = async () => {
  try {
    const token = await AsyncStorage.getItem("@token");
    const user = await AsyncStorage.getItem("@user");
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
  } catch (error) {
    console.error("Failed to restore user state:", error);
  }
  return null;
};

