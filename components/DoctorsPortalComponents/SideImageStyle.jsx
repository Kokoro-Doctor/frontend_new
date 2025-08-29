import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  FlatList,
  StatusBar,
  ScrollView,
} from "react-native";

const SideImageStyle = () => {
  return (
    <>
      <View style={styles.image_container}>
        <Image
          source={require("../../assets/DoctorsPortal/Icons/icon9.png")}
          // style={styles.icondesign}
        />
        <Image
          source={require("../../assets/DoctorsPortal/Icons/icon10.png")}
          // style={styles.icondesign}
        />
        <Image
          source={require("../../assets/DoctorsPortal/Icons/icon8.png")}
          // style={styles.icondesign}
        />
        <View style={styles.icon_innerContainer}>
          <Image
            source={require("../../assets/DoctorsPortal/Icons/icon2.png")}
            // style={styles.icondesign}
          />
          <Image
            source={require("../../assets/DoctorsPortal/Icons/icon3.png")}
            // style={styles.icondesign}
          />
        </View>

        <Image
          source={require("../../assets/DoctorsPortal/Icons/icon6.png")}
          // style={styles.icondesign}
        />

        <View style={styles.icon_innerContainer2}>
          <Image
            source={require("../../assets/DoctorsPortal/Icons/icon7.png")}
            // style={styles.icondesign}
          />

          <Image source={require("../../assets/DoctorsPortal/Icons/icon4.png")} />
          <Image source={require("../../assets/DoctorsPortal/Icons/icon5.png")} />
          <Image source={require("../../assets/DoctorsPortal/Icons/icon1.png")} />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  image_container: {
    width: "20%",
    height: "100%",
    paddingRight: "0.5%",
    paddingTop: "7%",
    alignItems: "flex-end",
    gap: 2,
    backgroundColor: "#FCF5F7",
  },
  icon_innerContainer: {
    flexDirection: "row",
  },
  icon_innerContainer2: {
    gap: 20,
  },
});
export default SideImageStyle;
