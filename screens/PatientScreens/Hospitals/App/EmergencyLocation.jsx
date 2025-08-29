import React, { useCallback, useState } from "react";
import * as Location from "expo-location";

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
  Modal,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
//import { Picker } from "@react-native-picker/picker";
import { useChatbot } from "../../../../contexts/ChatbotContext";
import { useFocusEffect } from "@react-navigation/native";
// import SideBarNavigation from "../../../../components/PatientScreenComponents/SideBarNavigation";
// import Header from "../../../components/PatientScreenComponents/Header";
// import SearchBar from "../../../components/PatientScreenComponents/SearchBar";

const EmergencyLocation = ({ navigation, route }) => {
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { setChatbotConfig } = useChatbot();
  const phoneNumber = "+918069991061";

  useFocusEffect(
    useCallback(() => {
      setChatbotConfig({ height: "32%" });
    }, [])
  );

  const handleSearch = () => {
    Alert.alert(`Search Results for: ${searchQuery}`);
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const profileOptions = ["View Profile", "Edit Profile", "Logout"]; // Dropdown menu options

  const [selectedMethod, setSelectedMethod] = useState("Card");
  const [country, setCountry] = useState("United States");
  const [Message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const handleCallPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  //  state to hold the location which is entered
  const [location, setLocation] = useState(null);

  // state to get current location of the user
  const [currLocation, setCurrLocation] = useState(null);

  const getCurrLoaction = async () => {
    // Request permission
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location permission is required.");
      return;
    }

    // Get the current location
    const currentLocation = await Location.getCurrentPositionAsync({});
    setCurrLocation(currentLocation.coords);
  };

  return (
    <>
      {/* App */}

      {(Platform.OS !== "web" || width < 1000) && (
        <View style={styles.appContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#fff" />
          <View style={styles.main}>
            <View style={styles.body}>
              <View style={styles.bodyHeadContainer}>
                <Text style={styles.bodytitle}> Find Hospital near you</Text>
              </View>
              <View style={styles.locationConatiner}>
                <View style={styles.locationinput}>
                  <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setLocation("")}
                  >
                    <MaterialIcons name="arrow-back" size={34} color="#666" />
                  </TouchableOpacity>

                  <TextInput
                    style={styles.textinput}
                    placeholder="Enter Location"
                    value={location}
                    onChangeText={setLocation}
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
              {
                <View style={styles.currlocationContainer}>
                  <View style={styles.currlocationleft}>
                    <MaterialCommunityIcons
                      name="crosshairs-gps"
                      size={30}
                      color="#444444"
                    />

                    <Text style={styles.exactLocation}>
                      Give us your exact location{" "}
                    </Text>
                  </View>
                  <View style={styles.currlocationRight}>
                    <TouchableOpacity
                      onPress={getCurrLoaction}
                      style={styles.detectButton}
                    >
                      <Text style={styles.detectButtonText}>
                        Detect Location
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              }
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },

  //......
  // App design start

  appContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    // backgroundColor: "pink",
  },
  body: {
    height: "100%",
    width: "100%",
    paddingTop: "10%",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  bodyHeadContainer: {
    height: "8%",
    ...Platform.select({
      web: {
        height: "10%",
        maxHeight: "20%",

        marginBottom: "5%",
      },
    }),
    width: "90%",
    justifyContent: "center",
    paddingTop: "8%",
    // backgroundColor: "yellow",
    // alignItems:"center"
  },
  bodytitle: {
    fontSize: 24,
    fontStyle: "popins",
    color: "#000000",
    fontWeight: "bold",
  },

  locationConatiner: {
    height: "12%",
    width: "90%",
    // backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  locationinput: {
    height: "50%",
    width: "100%",
    ...Platform.select({
      web: {
        paddingTop: "5%",
        paddingBottom: "5%",
      },
    }),
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ff7072",
    borderRadius: 6,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  currlocationContainer: {
    height: "10%",
    width: "100%",
    ...Platform.select({
      web: {
        marginTop: "2%",
        paddingTop: "5%",
        paddingBottom: "10%",
      },
    }),
    backgroundColor: "#ff7072",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  currlocationleft: {
    height: "100%",
    width: "50%",
    // padding:"5%",
    ...Platform.select({
      web: {
        paddingBottom: "5%",
      },
    }),
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingTop: "5%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  exactLocation: {
    flexWrap: "wrap",
    fontSize: 15,
    color: "#ffff",
    fontStyle: "Montserrat",
    fontWeight: "bold",
  },
  currlocationRight: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",

    // backgroundColor:"black",
  },
  detectButton: {
    height: "50%",
    width: "60%",
    padding: "2%",
    ...Platform.select({
      web: {
        marginTop: "5%",
        padding: "5%",
      },
    }),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffff",
    borderRadius: 5,
  },
  detectButtonText: {
    fontSize: 14,
    color: "#ffff",
    fontStyle: "Montserrat",
    fontWeight: "bold",
  },
});

export default EmergencyLocation;
