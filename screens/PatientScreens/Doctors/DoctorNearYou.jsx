import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useWindowDimensions,
  StatusBar,
  //Modal,
  //TouchableWithoutFeedback,
} from "react-native";
import DoctorResultShow from "./DoctorResultShow";

const DoctorNearYou = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const handleContinueButtonApp = () => {
    navigation.navigate(DoctorResultShow);
  };

  return (
    <>
      <View style={styles.appContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#fff" />
        <View style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Find Doctor near you</Text>
          </View>
          <View style={styles.locationContainer}>
            <TouchableOpacity style={styles.arrowIcon}>
              <Image
                source={require("../../../assets/Icons/LocationArrow .png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.textArea}
              placeholder="Enter Location"
              placeholderTextColor="#444444"
              multiline={true}
            />
          </View>
          <View style={styles.detectLocationContainer}>
            <View style={styles.iconBox}>
              <Image
                source={require("../../../assets/Icons/LocationLogo.png")}
                style={styles.locationIcon}
              />
            </View>
            <TouchableOpacity style={styles.locationTextBox1}>
              <Text style={styles.locationText1}>
                Give us your exact location
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.locationTextBox2}>
              <Text style={styles.locationText2}>Detect Location</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleContinueButtonApp}
            style={styles.skipButton}
          >
            <Image
              source={require("../../../assets/Images/right-arrow.png")}
              style={styles.skipIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },

  headerContainer: {
    width: "80%",
    marginBottom: "8%",
    //borderWidth:1,
    alignSelf: "flex-start",
    marginHorizontal: "6%",
    marginVertical: "15%",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
  },
  locationContainer: {
    width: "88%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#FF7072",
    borderRadius: 3,
    alignItems: "center",
    paddingHorizontal: "4%",
    paddingVertical: "2%",
    marginHorizontal: "5%",
  },
  icon: {
    height: 15,
    width: 30,
  },
  textArea: {
    flex: 1,
    fontSize: 14,
    color: "#000",
    paddingHorizontal: "5%",
  },
  detectLocationContainer: {
    // height: "10%",
    minHeight: 60,
    width: "100%",
    //borderWidth: 1,
    marginVertical: "2%",
    backgroundColor: "rgb(250, 128, 152)",
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    height: "60%",
    width: "10%",
    // borderWidth: 1,
    marginLeft: "4%",
  },
  locationIcon: {
    alignSelf: "center",
    marginTop: "20%",
    height: 23,
    width: 26,
  },
  locationTextBox1: {
    height: "70%",
    width: "32%",
    //borderWidth: 1,
    marginLeft: "2%",
  },
  locationText1: {
    fontSize: 15,
    fontWeight: 600,
    color: "#fff",
  },
  locationTextBox2: {
    height: "62%",
    width: "35%",
    borderWidth: 1,
    marginLeft: "11%",
    borderRadius: 5,
    borderColor: "#fff",
  },
  locationText2: {
    fontSize: 14,
    fontWeight: 400,
    color: "#fff",
    alignSelf: "center",
    marginTop: "5%",
  },
  skipButton: {
    width: "20%",
    borderWidth: 1,
    borderColor: "#fff",
    alignSelf: "center",
    marginVertical: "100%",
    //backgroundColor: "rgb(250, 128, 152)",
  },
  skipIcon: {
    alignSelf: "center",
  },
  //   overlay: {
  //     flex: 1,
  //     backgroundColor: "rgba(0, 0, 0, 0.9)", // Dark background
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  //   popupContainer: {
  //     height: "30%",
  //     width: "60%",
  //     borderWidth: 1,
  //     borderColor: "#fff",
  //     backgroundColor: "#fff",
  //     flexDirection: "column",
  //   },
  //   titleHeadText: {
  //     height: "10%",
  //     width: "81%",
  //     //borderWidth: 1,
  //     borderColor: "#000",
  //     flexDirection: "row",
  //     alignSelf: "center",
  //     marginVertical: "10%",
  //     marginBottom: "2%",
  //   },
  //   popupTitle: {
  //     fontSize: 17,
  //     fontWeight: 600,
  //     alignSelf: "center",
  //   },
  //   popupTitle1: {
  //     fontSize: 17,
  //     fontWeight: 300,
  //     paddingHorizontal: "1%",
  //   },
  //   locationBox: {
  //     height: "10%",
  //     width: "71%",
  //     // borderWidth:1,
  //     borderColor: "#000",
  //     alignSelf: "center",
  //     flexDirection: "row",
  //     justifyContent: "space-between",
  //   },
  //   mapIconBox: {
  //     height: "100%",
  //     width: "15%",
  //     //borderWidth:1,
  //     borderColor: "#000",
  //     alignItems: "center",
  //     paddingVertical: "2%",
  //   },
  //   locationKnowBox: {
  //     height: "100%",
  //     width: "85%",
  //     //borderWidth:1,
  //     borderColor: "#000",
  //   },
  //   locationKnowBoxText: {
  //     fontSize: 13,
  //     fontWeight: 400,
  //   },
  //   allowAccessBox: {
  //     height: "52%",
  //     width: "85%",
  //     //borderWidth: 1,
  //     borderColor: "#000",
  //     flexDirection: "column",
  //     justifyContent: "space-between",
  //     alignSelf: "center",
  //     marginVertical: "5%",
  //   },
  //   allowAccess: {
  //     width: "92%",
  //     //borderWidth: 1,
  //     borderColor: "#000",
  //     alignSelf: "center",
  //     paddingVertical: "4%",
  //     borderRadius: 15,
  //     backgroundColor: " rgba(240, 173, 248, 0.15)",
  //   },
  //   allowAccessText: {
  //     color: "#000",
  //     alignSelf: "center",
  //     fontSize: 12,
  //     fontWeight: 400,
  //   },
});
export default DoctorNearYou;
