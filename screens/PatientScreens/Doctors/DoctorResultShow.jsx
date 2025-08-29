import React, { useCallback, useState, useEffect } from "react";
import {
  Alert,
  Image,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Linking,
  Keyboard,
  Platform,
  ScrollView,
  useWindowDimensions,
  StatusBar,
  Dimensions,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useChatbot } from "../../../contexts/ChatbotContext";
import { useFocusEffect } from "@react-navigation/native";
import SideBarNavigation from "../../../components/PatientScreenComponents/SideBarNavigation";
import Header from "../../../components/PatientScreenComponents/Header";
import SearchBar from "../../../components/PatientScreenComponents/SearchBar";
import DoctorAppointmentData from "../../../components/PatientScreenComponents/DoctorComponents/DoctorsAppointmentData";
import PromoModal from "../../../components/PatientScreenComponents/PromoModal";
// Create a platform-specific location implementation
const GetLocationPolyfill = {
  getCurrentPosition: (options) => {
    // For web, use the browser's Geolocation API
    if (Platform.OS === "web") {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                altitude: position.coords.altitude || 0,
                accuracy: position.coords.accuracy,
                speed: position.coords.speed || 0,
                time: position.timestamp,
              });
            },
            (error) => {
              reject({
                code: error.code,
                message: error.message,
              });
            },
            options
          );
        } else {
          reject({
            code: "UNAVAILABLE",
            message: "Geolocation not available on this browser",
          });
        }
      });
    } else {
      // For native platforms, we would import the actual module
      // This will never run in web bundling
      console.warn("Native GetLocation used in non-native environment");
      return Promise.reject({
        code: "PLATFORM_NOT_SUPPORTED",
        message: "Platform not supported",
      });
    }
  },
};

// Helper function to determine if an error is a location error
const isLocationError = (error) => {
  return (
    error && typeof error.code === "string" && typeof error.message === "string"
  );
};

const DoctorResultShow = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [locationInput, setLocationInput] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to toggle dropdown visibility
  const { setChatbotConfig } = useChatbot();
  const phoneNumber = "+918069991061";
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (Platform.OS !== "web") {
      timeoutId = setTimeout(() => {
        setShowPromo(true);
      }, 1000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Reset chatbot height when this screen is focused
      setChatbotConfig({ height: "50%" });
    }, [])
  );

  const handleSearch = () => {
    Alert.alert(`Search Results for: ${searchQuery}`);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const handleCallPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const requestLocation = () => {
    setLoading(true);
    setLocation(null);
    setError(null);

    GetLocationPolyfill.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
    })
      .then((newLocation) => {
        setLoading(false);
        setLocation(newLocation);
        Alert.alert(
          "Location detected",
          `Lat: ${newLocation.latitude.toFixed(
            4
          )}, Lng: ${newLocation.longitude.toFixed(4)}`
        );
      })
      .catch((ex) => {
        if (isLocationError(ex)) {
          const { code, message } = ex;
          console.warn(code, message);
          setError(code);
          Alert.alert("Location Error", `Could not get location: ${message}`);
        } else {
          console.warn(ex);
          Alert.alert(
            "Error",
            "An unknown error occurred while getting location"
          );
        }
        setLoading(false);
        setLocation(null);
      });
  };

  return (
    <>
      {Platform.OS === "web" && width > 1000 && (
        <View style={styles.webContainer}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require("../../../assets/Images/MedicineBackground.png")}
              style={styles.imageBackground}
            >
              <View
                style={[
                  styles.overlay,
                  { backgroundColor: "rgba(16, 16, 16, 0.3)" },
                ]}
              />

              <View style={styles.parent}>
                <View style={styles.Left}>
                  <SideBarNavigation navigation={navigation} />
                </View>
                <View style={styles.Right}>
                  <View style={styles.header}>
                    <Header navigation={navigation} />
                  </View>

                  <View style={styles.contentContainer}>
                    <View style={styles.searchSection}>
                      <Text style={styles.mainHeading}>
                        Let me find the best doctor for you !!
                      </Text>

                      <View style={styles.locationContainer}>
                        <TouchableOpacity
                          style={styles.detectLocationButton}
                          onPress={requestLocation}
                        >
                          <MaterialIcons
                            name="my-location"
                            size={18}
                            color="#333"
                          />
                          <Text style={styles.detectLocationText}>
                            {loading
                              ? "Detecting..."
                              : "Detect Current Location"}
                          </Text>
                        </TouchableOpacity>

                        <Text style={styles.orText}>Or</Text>

                        <View style={styles.locationInputContainer}>
                          <MaterialIcons
                            name="location-on"
                            size={18}
                            color="#333"
                          />
                          <TextInput
                            style={styles.locationInput}
                            placeholder="Enter Location"
                            placeholderTextColor="#666"
                            value={locationInput}
                            onChangeText={setLocationInput}
                          />
                        </View>
                      </View>

                      {location && (
                        <Text style={styles.locationFoundText}>
                          Location: {location.latitude.toFixed(4)},{" "}
                          {location.longitude.toFixed(4)}
                        </Text>
                      )}

                      <Text style={styles.searchResultText}>Search Result</Text>
                    </View>

                    <View style={styles.middlepart}>
                      <DoctorAppointmentData navigation={navigation} />
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      )}
      {(Platform.OS !== "web" || width < 1000) && (
        <View style={styles.appContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#fff" />
          <View style={[styles.header, { height: "15%" }]}>
            <Header navigation={navigation} />
          </View>

          <View style={styles.searchBar}>
            <SearchBar />
          </View>
          <View style={styles.middlepart}>
            <DoctorAppointmentData navigation={navigation} />
          </View>
        </View>
      )}
      <PromoModal isVisible={showPromo} onClose={() => setShowPromo(false)} />
    </>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  // App design start
  appContainer: {
    flex: 1,
    flexDirection: "column",
    hieght: "100%",
    width: "100%",
    backgroundColor: "#fff",
  },
  searchBar: {
    marginTop: "4%",
  },

  imageContainer: {
    height: "100%",
    width: "100%",
  },
  imageBackground: {
    flex: 1,
    height: "100%",
    width: "100%",
    borderWidth: 1,
    opacity: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  parent: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  Left: {
    height: "100%",
    width: "15%",
  },
  Right: {
    height: "100%",
    flex: 1,
  },
  header: {
    // borderWidth: 5,
    // borderColor: "black",
    zIndex: 2,
    ...Platform.select({
      web: {
        width: "100%",
      },
    }),
  },
  contentContainer: {
    ...Platform.select({
      web: {
        marginTop: 10,
        height: "75%",
        backgroundColor: "white",
        marginLeft: "3%",
        borderRadius: 10,
        overflow: "hidden",
        paddingBottom: 20,
        width: "93%",
        // position: "relative",
        // top: -80,
      },
    }),
  },
  searchSection: {
    padding: 20,
  },
  mainHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detectLocationButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  detectLocationText: {
    marginLeft: 5,
    color: "#333",
  },
  orText: {
    marginHorizontal: 15,
    color: "#666",
  },
  locationInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  locationInput: {
    flex: 1,
    marginLeft: 5,
    color: "#333",
    height: 40,
  },
  locationFoundText: {
    fontSize: 14,
    color: "#4CAF50",
    marginBottom: 10,
  },
  searchResultText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  middlepart: {
    flex: 1,
    //borderWidth: 1,
    height: "10%",
    width: "98%",
    marginVertical: "5%",
    alignSelf: "center",
    paddingHorizontal: "2%",
    ...Platform.select({
      web: {
        width: "90%",
        // height: windowWidth>1000 ? "90%"  : "10%",
        flex: 1,
        marginHorizontal: "5%",
        borderWidth: 0,
        borderRadius: 0,
        borderColor: "transparent",
        overflow: "visible",
        marginVertical: 0,
      },
    }),
  },
  center: {
    marginHorizontal: "2%",
    marginTop: "3%",
    padding: "1.2%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "80%",
    height: "12%",
    flexDirection: "row",
    zIndex: 10,
  },
  center_textbar: {
    height: "200%",
    width: "40%",
    marginRight: "11.5%",
    marginVertical: "2%",
    flexDirection: "column",
  },
  centerText: {
    fontWeight: 500,
    fontSize: 42,
    fontFamily: "Inter",
    color: "white",
    paddingTop: "1%",
  },
  lowertext: {
    color: "#FFFFFF",
    paddingLeft: "3%",
  },
  search_bar: {
    flexDirection: "row",
    height: 40,
    width: 250,
    borderWidth: 1,
    borderColor: "#aaa",
    right: 60,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    alignItems: "flex-end",
    color: "#FFF",
    ...Platform.select({
      web: {
        outlineStyle: "none",
        borderWidth: 0,
      },
    }),
  },
  chatIcon: {
    width: 20,
    height: 20,
    marginLeft: 0,
  },
  notification: {
    height: 22,
    width: 22,
    borderColor: "#fff",
    marginLeft: "3%",
  },
  bellIcon: {
    height: 22,
    width: 22,
  },
  profileContainer: {
    height: "130%",
    width: "10%",
    borderColor: "#fff",
    marginLeft: "6%",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
  },
  profileIcon: {
    width: 40,
    height: 45,
    marginRight: 10,
    bottom: 8,
    borderRadius: 20,
  },
  dropdownMenu: {
    marginTop: 2,
    backgroundColor: "#f8f8ff",
    borderRadius: 8,
    padding: 6,
    width: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  dropdownItem: {
    paddingVertical: 1,
  },
  dropdownText: {
    color: "#000000",
    fontSize: 14,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  hospitalSection: {
    width: "40%",
    height: "100%",
  },
  hospitalProfile: {
    height: "62%",
    width: "100%",
    borderColor: "#fff",
    marginLeft: "1%",
    marginTop: "1%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hospital: {
    height: "100%",
    width: "30%",
    borderColor: "#FFFFFF",
    flexDirection: "column",
  },
  hospitalImage: {
    height: "60%",
    width: "100%",
    borderRadius: 15,
    resizeMode: "cover",
  },
  hospitalRating: {
    color: "#fff",
    fontWeight: 300,
    fontSize: 18,
    fontFamily: "Poppins",
    marginVertical: "4%",
    marginHorizontal: "27%",
  },
  hospitalDetails: {
    height: "100%",
    width: "100%",
    borderColor: "#FFFFFF",
  },
  hospitalName: {
    color: "#fff",
    marginLeft: "36%",
    fontWeight: 300,
    fontSize: 20,
    fontFamily: "Poppins",
    marginVertical: "2%",
    width: "60%",
    marginRight: "65%",
    alignSelf: "center",
  },
  specialist: {
    color: "#fff",
    fontWeight: 300,
    fontSize: 20,
    fontFamily: "Poppins",
    marginLeft: "5%",
    marginVertical: "1%",
  },
  workingExperience: {
    color: "#fff",
    fontWeight: 300,
    fontSize: 20,
    fontFamily: "Poppins",
    marginLeft: "5%",
    marginVertical: "1%",
  },
  appointmentButton: {
    height: "15%",
    width: "60%",
    borderWidth: 1,
    borderColor: "#ff6347",
    backgroundColor: "#FF7072",
    left: "1%",
    borderRadius: 15,
  },
  appointmentButtonText: {
    color: "#fff",
    fontWeight: 300,
    fontSize: 22,
    fontFamily: "Poppins",
    textAlign: "center",
    top: "24%",
  },
  paymentSection: {
    height: "100%",
    width: "35%",
    flexDirection: "column",
    marginTop: 10,
  },
  paymentMethods: {
    height: "70%",
    width: "83%",
    borderColor: "#fff",
    paddingTop: "1%",
    flexDirection: "row",
    alignSelf: "center",
  },
  paymentOption: {
    height: "20%",
    width: "31%",
    padding: "5%",
    borderColor: "#ccc",
    marginHorizontal: 5,
    backgroundColor: "#fff",
    textAlign: "left",
    borderRadius: 4,
    marginLeft: "1%",
  },
  paymentText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  selectedOption: {
    borderColor: "#007BFF",
  },
  inputContainer: {
    width: "81%",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    marginLeft: "12.5%",
    marginVertical: "-42%",
    borderColor: "#00ffff",
    marginTop: "-100%",
  },
  inputBox: {
    marginBottom: "1%",
    right: "5%",
  },
  input: {
    borderColor: "#000000",
    padding: "3%",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "#fff",
    width: "auto",
    paddingTop: "2%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "38%",
    right: "6%",
    gap: 8,
    padding: "1.5%",
  },
  half: {
    width: "60%",
    padding: "3%",
  },
  booknowButton: {
    height: "30%",
    width: "80%",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#ff6347",
    backgroundColor: "#FF7072",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: "5%",
    paddingHorizontal: 5,
  },
  booknowButtonText: {
    color: "#fff",
    fontWeight: 300,
    fontSize: 20,
    fontFamily: "Poppins",
    textAlign: "center",
  },
  boxAds: {
    width: "25%",
    borderWidth: 25,
    borderColor: "#F4B442",
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: "#F4B442",
  },
  adsText: {
    fontWeight: 500,
    fontSize: 25,
    fontFamily: "Poppins",
  },
});

export default DoctorResultShow;
