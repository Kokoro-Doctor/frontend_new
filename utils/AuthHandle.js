// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function AuthHandler() {
//   const navigate = useNavigate();

//   useEffect(async () => {
//     const urlParams = new URLSearchParams(window.location.hash.substring(1));
//     const accessToken = urlParams.get("access_token");

//     if (accessToken) {
//       console.log("Login successful!", accessToken);
//       await AsyncStorage.setItem("token", accessToken); 
//       navigate("/");
//     }
//   }, []);

//   return <div>Authenticating...</div>;
// }
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function AuthHandler() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleAuth = async () => {
//       const urlParams = new URLSearchParams(window.location.hash.substring(1));
//       const accessToken = urlParams.get("access_token");

//       if (accessToken) {
//         console.log("✅ Login successful!", accessToken);
//         try {
//           await AsyncStorage.setItem("token", accessToken);
//           navigate("/");
//         } catch (err) {
//           console.error("❌ Failed to store token:", err);
//         }
//       } else {
//         console.warn("⚠ No access_token found in URL");
//       }
//     };

//     handleAuth(); // call async handler inside useEffect
//   }, [navigate]);

//   return <div>Authenticating...</div>;
// }
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const queryParams = new URLSearchParams(window.location.search);

    const access_token = hashParams.get("access_token") || queryParams.get("access_token");

    console.log("URL Hash:", window.location.hash);
    console.log("Access Token:", access_token);

    if (access_token) {
      AsyncStorage.setItem("token", access_token)
        .then(() => {
          console.log("Login successful!");
          navigate("/");
        })
        .catch((err) => {
          console.error("Failed to store token:", err);
        });
    } else {
      console.error("Access token missing from URL.");
    }
  }, []);

  return <div>Authenticating...</div>;
}