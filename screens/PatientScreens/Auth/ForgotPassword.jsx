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

const ForgotPassword = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  // Validate phone number
  const validatePhoneNumber = (number) => {
    setPhoneNumber(number);
    // Check if phone number is at least 10 digits
    setIsPhoneValid(number.length >= 1);
  };

  const handleSendOTP = () => {
    if (email.trim() === "" && phoneNumber.trim() === "") {
      alert("Please enter either an email or a phone number");
      return;
    }

    if (phoneNumber && !isPhoneValid) {
      alert("Please enter a valid phone number with at least 10 digits");
      return;
    }

    // Add your OTP sending logic here
    setOtpSent(true);
  };

  const handleVerifyOTP = () => {
    // Check if all OTP digits are filled
    const isOtpComplete = otp.every((digit) => digit !== "");

    if (!isOtpComplete) {
      alert("Please enter the complete OTP");
      return;
    }

    // Add your OTP verification logic here
    navigation.navigate("ResetPassword");
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if current input is filled
    if (value !== "" && index < otp.length - 1) {
      // Focus next input (requires refs which would need to be added)
    }
  };

  return (
    <>
      {/* Web Version (for larger screens) */}
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

            {/* Right side with forgot password form - 60% */}
            <View style={styles.rightContainer}>
              <View style={styles.mainright}>
                <Text style={styles.title}>Forgot Password ?</Text>
                <Text style={styles.subtitle}>No worries Reset Password</Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Enter Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your Email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                <View style={styles.orContainer}>
                  <View style={styles.orLine} />
                  <Text style={styles.orText}>or</Text>
                  <View style={styles.orLine} />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Enter Phone Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your Phone no"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={validatePhoneNumber}
                    maxLength={15} // Allow for country codes
                  />
                </View>

                <Text style={styles.otpInfoText}>We'll send you OTP</Text>

                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={handleSendOTP}
                >
                  <Text style={styles.continueButtonText}>Send OTP</Text>
                </TouchableOpacity>

                {otpSent && (
                  <>
                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Enter OTP</Text>
                      <View style={styles.otpContainer}>
                        {otp.map((digit, index) => (
                          <TextInput
                            key={index}
                            style={styles.otpInput}
                            value={digit}
                            onChangeText={(value) =>
                              handleOtpChange(value, index)
                            }
                            keyboardType="number-pad"
                            maxLength={1}
                          />
                        ))}
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.verifyButton}
                      onPress={handleVerifyOTP}
                    >
                      <Text style={styles.continueButtonText}>Verify OTP</Text>
                    </TouchableOpacity>
                  </>
                )}
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
            <Text style={styles.mobileTitle}>Forgot Password ?</Text>
            <Text style={styles.mobileSubtitle}>No worries Reset Password</Text>

            {/* Email Input */}
            <Text style={styles.mobileInputLabel}>Enter Email</Text>
            <TextInput
              style={styles.mobileInput}
              placeholder="Enter your Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            {/* Or Divider */}
            <View style={styles.mobileOrContainer}>
              <View style={styles.mobileOrLine} />
              <Text style={styles.mobileOrText}>or</Text>
              <View style={styles.mobileOrLine} />
            </View>

            {/* Phone Number Input */}
            <Text style={styles.mobileInputLabel}>Enter Phone Number</Text>
            <TextInput
              style={styles.mobileInput}
              placeholder="Enter your Phone no"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={validatePhoneNumber}
              maxLength={15}
            />

            <Text style={styles.mobileOtpInfoText}>We'll send you OTP</Text>

            {/* Send OTP Button */}
            <TouchableOpacity
              style={styles.mobileSendOtpButton}
              onPress={handleSendOTP}
            >
              <Text style={styles.mobileSendOtpText}>Send OTP</Text>
            </TouchableOpacity>

            {otpSent && (
              <>
                <Text style={styles.mobileInputLabel}>Enter OTP</Text>
                <View style={styles.mobileOtpContainer}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      style={styles.mobileOtpInput}
                      value={digit}
                      onChangeText={(value) => handleOtpChange(value, index)}
                      keyboardType="number-pad"
                      maxLength={1}
                    />
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.mobileVerifyButton}
                  onPress={handleVerifyOTP}
                >
                  <Text style={styles.mobileVerifyText}>Verify OTP</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  // Web styles
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
  input: {
    height: 50,
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    paddingHorizontal: "3%",
    fontSize: 14,
    width: "100%",
  },
  otpInfoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: "2%",
  },
  continueButton: {
    backgroundColor: "#10B981",
    width: "100%",
    height: 50,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginBottom: "3%",
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: "3%",
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDD",
  },
  orText: {
    fontSize: 14,
    color: "#666",
    paddingHorizontal: "2%",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    marginTop: "2%",
  },
  otpInput: {
    width: "20%",
    height: 40,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    textAlign: "center",
    fontSize: 16,
    marginRight: "5%",
  },
  verifyButton: {
    backgroundColor: "#000000",
    width: "100%",
    height: 50,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginTop: "3%",
    marginBottom: "2%",
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
  },
  mobileInput: {
    height: 56,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    paddingHorizontal: "4%",
    fontSize: 16,
    marginBottom: "4%",
    width: "100%",
  },
  mobileOrContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: "4%",
  },
  mobileOrLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDD",
  },
  mobileOrText: {
    paddingHorizontal: "4%",
    color: "#666",
    fontSize: 14,
  },
  mobileOtpInfoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: "4%",
    alignSelf: "center",
  },
  mobileSendOtpButton: {
    backgroundColor: "#10B981",
    height: 56,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "6%",
    width: "100%",
  },
  mobileSendOtpText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  mobileOtpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: "2%",
    marginBottom: "6%",
  },
  mobileOtpInput: {
    width: "15%",
    height: 56,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: "2%",
  },
  mobileVerifyButton: {
    backgroundColor: "#000000",
    height: 56,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "4%",
    width: "100%",
  },
  mobileVerifyText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ForgotPassword;
