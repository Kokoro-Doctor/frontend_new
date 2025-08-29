import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur"; // use BlurView from 'react-native-blur' if not using Expo

const CongratulationsPopup = ({ isVisible, onClose, onBook }) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.7}
      useNativeDriver
      style={{ margin: 0 }}
    >
      <BlurView intensity={70} tint="dark" style={StyleSheet.absoluteFill} />

      <View style={styles.modalContainer}>
        <View style={styles.checkCircle}>
          <Image source={require("../../../assets/Images/popupCongrats.png")} />
        </View>

        <Text style={styles.title}>Congratulations</Text>
        <View style={styles.textBox}>
          <Text style={styles.subtitle}>You have successfully </Text>
          <Text style={styles.subtitle}>subscribed the doctor !</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => navigation.navigate("DoctorsInfoWithBooking")}
          >
            <Text style={styles.bookText}>Book Slot</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  modalContainer: {
    height: "44%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    width: windowWidth > 1000 ? "20%" : "75%",
    margin: "auto",
    ...Platform.select({
      web: {
        height: windowWidth > 1000 ? "44%" : "34%",
        height: windowWidth < 400 ? "auto" : "auto",
      },
    }),
  },

  checkCircle: {
    backgroundColor: "#FFFFFF",

    padding: "1%",
  },
  checkMark: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: "1%",
    textAlign: "center",
  },
  textBox: {
    padding: "8%",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",

    textAlign: "center",

    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 5,

    justifyContent: "space-between",
  },
  closeButton: {
    width: "45%",
    borderColor: "#EF4444",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeText: {
    color: "#EF4444",
    fontWeight: "500",
    textAlign: "center",
  },
  bookButton: {
    width: "45%",
    backgroundColor: "#22C55E",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bookText: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
});

export default CongratulationsPopup;
