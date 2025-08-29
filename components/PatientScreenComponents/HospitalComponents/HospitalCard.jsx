import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  TextInput,
  Keyboard,
  Text,
  FlatList,
  Animated,
  Dimensions,
  Pressable,
  useWindowDimensions,
} from "react-native";
const width = Dimensions.get("window").width;

const isSmallDevice = width <= 360;
const isMediumDevice = width > 360 && width < 768;

const HospitalCard = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const handleCardpress = () => {
    navigation.navigate("HospitalsInfoWithRating");
  };

  return (
    <>
      {Platform.OS === "web" && width > 1000 && (
        <Pressable style={styles.card} onPress={handleCardpress}>
          {/* Image Section */}
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/Images/HospitalImage2.jpg")} // Importing local image
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Details Section */}

          <View style={styles.detailsContainer}>
            <View style={styles.topRow}>
              <TouchableOpacity
                onPress={() => alert("Booking Confirmed!")}
                style={styles.HospitalStyle}
              >
                <Text style={styles.hospitalName}>Apollo</Text>
              </TouchableOpacity>
              <Text style={styles.rating}>⭐ 4.5</Text>
            </View>
            <Text style={styles.description}>Multispaciality Hospital</Text>
          </View>
        </Pressable>
      )}

      {(Platform.OS !== "web" || width < 1000) && (
        <View style={styles.app_parent}>
          <View style={styles.app_top}>
            <View style={styles.app_imageContainer}>
              <Image
                source={require("../../../assets/Images/hospitalImage.jpeg")}
                style={styles.app_image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.app_topRight}>
              <View style={styles.app_conatiner1}>
                <View style={styles.app_container1Left}>
                  <Text style={styles.app_hospitalname}>Apollo Hospital</Text>
                  <Text style={styles.app_hospitaltype}>Multispecialty</Text>
                </View>
                <View style={styles.app_container1Right}>
                  <View style={styles.app_rating}>
                    <Text>⭐ 4.5</Text>
                  </View>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: isSmallDevice ? 8 : isMediumDevice ? 9 : 12,
                        color: "#2C00D9",
                        textDecorationLine: "underline",
                      }}
                    >
                      know more
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.app_conatiner2}>
                <View style={styles.app_container2Left}>
                  <Text style={styles.app_distanceheading}>Distance</Text>
                  <Text style={styles.app_distanceAway}>2.3 km away</Text>
                </View>
                <View style={styles.app_container2Right}>
                  <Text style={styles.app_ArrivalHeadeing}>Arrival time</Text>
                  <Text style={styles.app_Arrivingin}>Reaches in 10 min</Text>
                </View>
              </View>

              <View style={styles.app_conatiner3}>
                <View style={styles.app_container3Left}>
                  <Image
                    source={require("../../../assets/Icons/GreenDot.png")}
                  />
                  <Text style={styles.app_bedAvialable}>
                    Emergency Beds Available
                  </Text>
                </View>
                {/* <View style={styles.app_container3Right}>
                  <TouchableOpacity>
                    <Icon
                      style={styles.app_icondesign}
                      name="call-outline"
                      size={20}
                      color="#FF7072"
                    />
                  </TouchableOpacity>
                  <Text style={styles.app_callHospital}>Call Hospital</Text>
                </View> */}
              </View>
            </View>
          </View>
          <View style={styles.app_bottom}>
            <TouchableOpacity
              onPress={() => navigation.navigate("HospitalsInfoWithRating")}
            >
              <View style={styles.app_buttonContainer}>
                <Text style={styles.app_text}>Book Hospital</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  HospitalStyle: {
    cursor: "pointer",
  },
  card: {
    width: "80%",
    height: "100%",
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "red",
    elevation: 2, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  imageContainer: {
    height: "60%",
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    height: "40%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#a13721",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hospitalName: {
    fontSize: 16,
    color: "#fff",
    cursor: "pointer",
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  description: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4,
  },

  //App design start...............
  app_parent: {
    height: isSmallDevice ? 200 : isMediumDevice ? 230 : 260,

    // height:"100%",
    width: "100%",
    padding: "2%",

    borderRadius: 5,
    backgroundColor: "#FFF",
    elevation: 5, // Shadow for Android
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  app_top: {
    height: isSmallDevice ? "80%" : isMediumDevice ? "82%" : "75%",
    // height: "70%",
    width: "100%",
    flexDirection: "row",
  },
  app_imageContainer: {
    height: "90%",
    width: "45%",
  },
  app_image: {
    height: "100%",
    width: "100%",
    borderRadius: 8,
  },
  app_topRight: {
    height: "90%",
    width: "55%",
    // backgroundColor: "blue",
    gap: isSmallDevice ? 2 : 4,
    alignItems: "center",
  },
  app_conatiner1: {
    height: "33%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: "1%",
    // backgroundColor: "red",
    gap: isSmallDevice ? 10 : 15,
  },
  app_container1Left: {
    height: "100%",
    width: "60%",
    marginLeft: "2%",
    justifyContent: "space-evenly",
  },
  app_hospitalname: {
    fontStyle: "Poppins",
    fontWeight: "bold",
    fontSize: isSmallDevice ? 12 : isMediumDevice ? 14 : 16,

    color: "#000000",
  },
  app_hospitaltype: {
    fontSize: isSmallDevice ? 12 : isMediumDevice ? 14 : 16,

    color: "5F5F5F",
  },
  app_container1Right: {
    height: "100%",
    width: "30%",
    justifyContent: "space-evenly",
    paddingRight: "2%",
    // alignItems: "flex-end",
  },
  app_rating: {
    // borderColor: "#000000",
    borderRadius: 1,
    padding: 1,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: "#FFF",
  },
  app_conatiner2: {
    height: isSmallDevice ? "35%" : isMediumDevice ? "40%" : "40%",
    width: "95%",
    // borderWidth: 1,
    // borderColor: "black",
    borderRadius: 5,
    shadowOffset: 1,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: isSmallDevice ? 1 : isMediumDevice ? 2 : 3,

    flexDirection: "row",
    backgroundColor: "#F7F5F5",
    justifyContent: "space-evenly",
  },
  app_container2Left: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    // alignItems: "center",
    paddingLeft: "2%",
  },
  app_distanceheading: {
    fontStyle: "Poppins",
    fontSize: isSmallDevice ? 9 : isMediumDevice ? 12 : 16,
  },
  app_distanceAway: {
    fontSize: isSmallDevice ? 9 : isMediumDevice ? 12 : 16,

    fontStyle: "poppins",
    color: "#FF0000",
  },
  app_container2Right: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  app_ArrivalHeadeing: {
    fontStyle: "Poppins",
    fontSize: isSmallDevice ? 9 : isMediumDevice ? 12 : 16,
  },
  app_Arrivingin: {
    fontStyle: "Poppins",
    fontSize: isSmallDevice ? 9 : isMediumDevice ? 12 : 16,

    color: "#2CBE5E",
  },

  app_conatiner3: {
    height: "30%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    // backgroundColor: "yellow",
  },
  app_container3Left: {
    width: "50%",
    height: "100%",
    padding: "2%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 2,
  },
  app_bedAvialable: {
    fontSize: isSmallDevice ? 9 : isMediumDevice ? 12 : 16,
    fontStyle: "poppins",
    flexWrap: "wrap",
  },
  app_container3Right: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  app_icondesign: {
    padding: isSmallDevice ? 3 : 4,
    borderRadius: 50,
    backgroundColor: "#fdecea",
  },
  app_callHospital: {
    fontSize: isSmallDevice ? 10 : isMediumDevice ? 12 : 16,
  },

  app_bottom: {
    height: "18%",
    width: "100%",
  },

  app_buttonContainer: {
    height: "100%",
    width: "100%",

    backgroundColor: "#FF7373",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    padding: Platform.OS === "web" ? "3%" : 0,
  },
  app_text: {
    fontStyle: "Poppins",
    fontSize: isSmallDevice ? 12 : isMediumDevice ? 14 : 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default HospitalCard;
