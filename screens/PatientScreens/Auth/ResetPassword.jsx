import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ResetPassword = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleResetPassword = () => {
    // Add your password reset logic here
    // Validate passwords match and meet requirements
    if (newPassword === confirmPassword && newPassword.length >= 8) {
      // Handle successful password reset
      navigation.navigate("PasswordSuccess");
    } else {
      // Show validation error to user
      if (newPassword !== confirmPassword) {
        alert("Error Passwords don't match");
      } else if (newPassword.length < 8) {
        alert("Error Password must be at least 8 characters");
      }
    }
  };

  return (
    <>
      {/* Web Version (for larger screens) - UNCHANGED FROM ORIGINAL */}
      {Platform.OS === "web" && width > 1000 && (
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />

          <View style={styles.mainContainer}>
            {/* Left side with background image - 40% */}
            <View style={styles.leftContainer}>
              <ImageBackground
                source={require("../../../assets/Images/login-background.png")}
                style={styles.backgroundImage}
                resizeMode="cover"
              >
                <Text style={styles.quoteText}>
                  "Nurture Your Heart. It Will Nurture You."
                </Text>
              </ImageBackground>
            </View>

            {/* Rectangular divider */}
            <View style={styles.divider} />

            {/* Right side with reset password form - 60% */}
            <View style={styles.rightContainer}>
              <View style={styles.mainright}>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.subtitle}>
                  Must be at least 8 Characters
                </Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>New Password</Text>
                  <View style={styles.passwordInputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="New Password"
                      placeholderTextColor="#999"
                      secureTextEntry={!showNewPassword}
                      value={newPassword}
                      onChangeText={setNewPassword}
                    />
                    <TouchableOpacity
                      style={styles.eyeIconButton}
                      onPress={toggleNewPasswordVisibility}
                    >
                      <Ionicons
                        name={showNewPassword ? "eye-off" : "eye"}
                        size={24}
                        color="#999"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Confirm Password</Text>
                  <View style={styles.passwordInputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Confirm Password"
                      placeholderTextColor="#999"
                      secureTextEntry={!showConfirmPassword}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity
                      style={styles.eyeIconButton}
                      onPress={toggleConfirmPasswordVisibility}
                    >
                      <Ionicons
                        name={showConfirmPassword ? "eye-off" : "eye"}
                        size={24}
                        color="#999"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={handleResetPassword}
                >
                  <Text style={styles.resetButtonText}>Reset Password</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Mobile Version (for smaller screens) */}
      {(Platform.OS !== "web" || width < 1000) && (
        <View style={styles.mobileContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/Images/KokoroLogo.png")}
              style={styles.logoImage}
            />
            <Text style={styles.logoText}>Kokoro.Doctor</Text>
          </View>

          <View style={styles.mobileFormContainer}>
            <Text style={styles.mobileTitle}>Reset Password</Text>
            <Text style={styles.mobileSubtitle}>
              Must be at least 8 Characters
            </Text>

            {/* New Password Input */}
            <Text style={styles.mobileInputLabel}>New Password</Text>
            <View style={styles.mobilePasswordInputWrapper}>
              <TextInput
                style={styles.mobileInput}
                placeholder="New Password"
                placeholderTextColor="#999"
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity
                style={styles.mobileEyeIconButton}
                onPress={toggleNewPasswordVisibility}
              >
                <Ionicons
                  name={showNewPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password Input */}
            <Text style={styles.mobileInputLabel}>Confirm Password</Text>
            <View style={styles.mobilePasswordInputWrapper}>
              <TextInput
                style={styles.mobileInput}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                style={styles.mobileEyeIconButton}
                onPress={toggleConfirmPasswordVisibility}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            {/* Reset Password Button */}
            <TouchableOpacity
              style={styles.mobileResetButton}
              onPress={handleResetPassword}
            >
              <Text style={styles.mobileResetButtonText}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  // Keep ALL existing web styles from the original implementation
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
  },
  leftContainer: {
    width: "40%",
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  quoteText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 30,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    width: "80%",
  },
  divider: {
    width: "0.15%",
    height: "100%",
    backgroundColor: "#EEEEEE",
  },
  rightContainer: {
    width: "60%",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: "5%",
  },
  mainright: {
    width: "65%",
    margin: "auto",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: "1%",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: "4%",
  },
  inputContainer: {
    marginBottom: "3%",
    width: "100%",
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: "1%",
    fontWeight: "500",
  },
  passwordInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    height: 50,
    minHeight: 48,
  },
  input: {
    flex: 1,
    height: 50,
    minHeight: 48,
    paddingHorizontal: "3%",
    fontSize: 14,
    outlineStyle: "none",
    borderwidth: 0,
  },
  eyeIconButton: {
    padding: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "#10B981",
    width: "100%",
    height: 50,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginTop: "3%",
  },
  resetButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  // Mobile styles
  mobileContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: "5%",
    paddingTop: "15%",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "10%",
  },
  logoImage: {
    width: 30,
    height: 30,
    marginRight: "2%",
  },
  logoText: {
    fontSize: 18,
    color: "#666",
    fontWeight: "500",
  },
  mobileFormContainer: {
    width: "100%",
    alignItems: "center",
  },
  mobileTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: "1%",
    alignSelf: "center",
  },
  mobileSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: "6%",
    alignSelf: "center",
  },
  mobileInputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: "2%",
    alignSelf: "flex-start",
    width: "100%",
  },
  mobilePasswordInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: "4%",
  },
  mobileInput: {
    height: 56,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    paddingHorizontal: "4%",
    fontSize: 16,
    flex: 1,
  },
  mobileEyeIconButton: {
    position: "absolute",
    right: 10,
    padding: 10,
  },
  mobileResetButton: {
    backgroundColor: "#10B981",
    height: 56,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "4%",
    width: "100%",
  },
  mobileResetButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ResetPassword;
