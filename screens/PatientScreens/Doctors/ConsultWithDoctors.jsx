import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Platform,
  useWindowDimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import Header from "../../../components/PatientScreenComponents/Header";
import SearchBar from "../../../components/PatientScreenComponents/SearchBar";
import SideBarNavigation from "../../../components/PatientScreenComponents/SideBarNavigation";
import Icon from "react-native-vector-icons/FontAwesome";
import MyLinearGradient1 from "../../../components/PatientScreenComponents/MyLinearGradient1";
import DoctorNearYou from "./DoctorNearYou";
import DoctorResultShow from "../../../screens/PatientScreens/Doctors/DoctorResultShow";

const ConsultWithDoctors = ({ navigation }) => {
  const [selectedCards, setSelectedCards] = useState([]); // for selecting symptoms cards
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91"); //for selecting country code
  const { width } = useWindowDimensions();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //This is the array for symptoms cards
  const symptoms = [
    "Chest Pain",
    "Shortness of breath",
    "fainting",
    "High blood pressure",
    "Dizziness",
    "Fatigue",
    "Swelling in legs",
    "Irregular heartbeat",
    "Others",
  ];

  // This function related to selection of symptoms cards.
  const toggleCardSelection = (item) => {
    if (selectedCards.includes(item)) {
      // If already selected, remove from array
      setSelectedCards(selectedCards.filter((symptom) => symptom !== item));
    } else {
      // If not selected, add to array
      setSelectedCards([...selectedCards, item]);
    }
  };

  const handleContinueButtonApp = () => {
    navigation.navigate(DoctorResultShow);
  };
  const handleContinueButton = () => {
    navigation.navigate(DoctorResultShow);
  };
  return (
    <>
      {Platform.OS === "web" && width > 1000 && (
        <View style={styles.webContainer}>
          {/* Background Image */}
          <ImageBackground
            source={require("../../../assets/Images/background.jpg")}
            style={styles.imageBackground}
            resizeMode="cover"
          >
            {/* Dark Overlay */}
            <View style={styles.overlay} />

            {/* Parent Container */}
            <View style={styles.parent}>
              {/* Left Section - Sidebar Navigation */}
              <View style={styles.Left}>
                <SideBarNavigation navigation={navigation} />
              </View>

              <View style={styles.Right}>
                {/* Header */}
                <View style={styles.header}>
                  <Header navigation={navigation} />
                </View>

                {/* 🔹 Gradient Section (Using MyLinearGradient) */}
                <MyLinearGradient1 style={styles.gradientBox}>
                  {/* Consultation Form */}
                  <View style={styles.formBox}>
                    {/* <Text style={styles.formTitle}>Subscribe to a Doctor</Text> */}

                    <View style={styles.formContent}>
                      {/* Left Section */}
                      <View style={styles.leftSection}>
                        <Text style={styles.formTitle}>
                          Subscribe to a Doctor
                        </Text>
                        <Text style={styles.inputLabel}>
                          Tell us your symptoms
                        </Text>
                        <TextInput
                          style={styles.textArea}
                          placeholder="Eg: chest pain"
                          placeholderTextColor="#999"
                          multiline={true}
                          numberOfLines={4}
                          textAlignVertical="top"
                        />

                        <Text style={styles.inputLabel}>Mobile Number</Text>
                        <TextInput
                          style={styles.mobileInput}
                          placeholder="Enter Mobile Number here"
                          keyboardType="numeric"
                          placeholderTextColor="#999"
                        />

                        <Text style={styles.additionalText}>
                          A verification code will be sent to this number
                        </Text>

                        <TouchableOpacity
                          style={styles.button}
                          onPress={handleContinueButton}
                        >
                          <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                      </View>

                      {/* Vertical Line */}
                      <View style={styles.verticalLine} />

                      {/* Right Section */}
                      <View style={styles.rightSection}>
                        <Image
                          source={require("../../../assets/DoctorsPortal/Images/MedicalVault.png")}
                          style={styles.MedicalImage}
                        />
                        <Text style={styles.secureText}>
                          Your secure digital medical vault
                        </Text>
                        <View style={styles.medilockerTextBox}>
                          <Text style={styles.medilockerText}>
                            Tired of searching for medical documents when you
                            need them the most? MediLocker is here to make your
                            life easier!
                          </Text>
                        </View>
                        <View style={styles.keyPointBox}>
                          <View style={styles.iconBox}>
                            <Image
                              source={require("../../../assets/DoctorsPortal/Icons/star.png")}
                              style={styles.starIcon}
                            />
                            <Image
                              source={require("../../../assets/DoctorsPortal/Icons/star.png")}
                              style={styles.starIcon}
                            />
                            <Image
                              source={require("../../../assets/DoctorsPortal/Icons/star.png")}
                              style={styles.starIcon}
                            />
                            <Image
                              source={require("../../../assets/DoctorsPortal/Icons/star.png")}
                              style={styles.starIcon}
                            />
                          </View>
                          <View style={styles.keyPointTextBox}>
                            <Text style={styles.keyPointText}>Store All Medical Records in One Place</Text>
                            <Text style={styles.keyPointText}>Access Anytime, Anywhere</Text>
                            <Text style={styles.keyPointText}>100% Secure & Private</Text>
                            <Text style={styles.keyPointText}>Share with a Tap</Text>
                          </View>
                        </View>
                        <TouchableOpacity style={styles.tryMedilockerButton}>
                          <Text style={styles.tryText}>Try Medilocker</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </MyLinearGradient1>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
      {(Platform.OS !== "web" || width < 1000) && (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <StatusBar barStyle="light-content" backgroundColor="#fff" />
          <View style={styles.appContainer}>
            <View style={[styles.appheader, { height: "15%" }]}>
              <Header navigation={navigation} />
            </View>

            <View style={styles.searchBar}>
              <SearchBar />
            </View>
            <View style={styles.doctorTextBox}>
              <Text style={styles.doctorText}>Subscribe with Doctor</Text>
            </View>

            <View style={styles.consultBox}>
              <Text style={styles.consultBoxText}>Tell us your symptoms</Text>
              <TextInput
                style={styles.textArea}
                placeholder="eg: chest pain"
                placeholderTextColor="#999"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                backgroundColor="#fff"
                height="50%"
                width="90%"
                alignSelf="center"
              />
            </View>
            <View style={styles.selectSymptomTextBox}>
              <Text style={styles.selectSymptomText}>
                Quick select symptoms
              </Text>

              <View style={styles.symptomGrid}>
                {symptoms.map((item, index) => {
                  const isSelected = selectedCards.includes(item);
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.symptomCard,
                        isSelected && styles.selectedCard, // Apply selected style
                      ]}
                      onPress={() => toggleCardSelection(item)}
                    >
                      <Text
                        style={[
                          styles.symptomText,
                          isSelected && styles.selectedCardText, // Change text color if selected
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View style={styles.contactSection}>
              <Text style={styles.contactText}>Enter Number</Text>
              <View style={styles.contactContainer}>
                <View style={styles.countryCode}>
                  <TouchableOpacity
                    onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={styles.countryCodeButton}
                  >
                    <Text style={styles.countryCodeText}>
                      {selectedCountryCode}
                    </Text>
                    <Icon
                      name={isDropdownOpen ? "caret-up" : "caret-down"}
                      size={14}
                      color="black"
                      style={{ marginLeft: 5 }}
                    />
                  </TouchableOpacity>

                  {/* Dropdown List */}
                  {isDropdownOpen && (
                    <View style={styles.dropdown}>
                      {["+91", "+1", "+44", "+61", "+81"].map((code) => (
                        <TouchableOpacity
                          key={code}
                          style={styles.dropdownItem}
                          onPress={() => {
                            setSelectedCountryCode(code);
                            setIsDropdownOpen(false);
                          }}
                        >
                          <Text style={styles.dropdownText}>{code}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
                <TextInput
                  placeholder="Enter your number"
                  keyboardType="numeric"
                  style={styles.contactInput}
                />
              </View>
              <Text style={styles.verficationText}>
                A verification code will be sent to this number
              </Text>
            </View>
            <TouchableOpacity
              style={styles.buttonBox}
              onPress={handleContinueButtonApp}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  appContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  parent: {
    flex: 1,
    flexDirection: "row",
  },
  Left: {
    width: "15%",
  },
  Right: {
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
  appheader: {
    zIndex: 2,
    ...Platform.select({
      web: {
        width: "100%",
      },
    }),
  },
  doctorTextBox: {
    height: "5%",
    width: "54%",
    //borderWidth: 1,
    marginHorizontal: "5%",
    marginVertical: "1%",
  },
  doctorText: {
    fontSize: 16,
    fontWeight: 900,
    //fontFamily: "Poppins",
    paddingVertical: "5%",
    paddingHorizontal: "3%",
    letterSpacing: 0.7,
  },
  consultBox: {
    height: "20%",
    width: "90%",
    //borderWidth: 1,
    alignSelf: "center",
    backgroundColor: "#FF7072",
    flexDirection: "column",
    borderRadius: 5,
    shadowColor: "#000", // Optional: add slight shadow for elevation
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  consultBoxText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 400,
    marginVertical: "5%",
    marginHorizontal: "5%",
  },
  selectSymptomTextBox: {
    height: "22%",
    width: "91%",
    //borderWidth: 1,
    marginHorizontal: "5%",
    marginVertical: "3%",
    flexDirection: "column",
  },
  selectSymptomText: {
    fontSize: 14,
    fontWeight: 350,
    paddingHorizontal: "1.5%",
    letterSpacing: 0.5,
  },
  symptomGrid: {
    flexDirection: "row",
    flexWrap: "wrap", // Wrap items to next line
    gap: 8,
    height: "90%",
    width: "100%",
    //borderWidth: 1,
    paddingHorizontal: "0.2%",
    justifyContent: "space-between",
  },

  symptomCard: {
    borderWidth: 1,
    borderColor: "#FFB6C1",
    borderRadius: 10,
    paddingVertical: "3%",
    paddingHorizontal: "4.6%",
    marginTop: "2%",
    backgroundColor: "#fff",
    shadowColor: "#000", // Optional: add slight shadow for elevation
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  selectedCard: {
    backgroundColor: "#FFB6C1",
    borderColor: "#FF69B4",
  },

  symptomText: {
    fontSize: 12,
    color: "#333", // Dark text color
    textAlign: "center",
    fontWeight: "400",
  },
  selectedCardText: {
    color: "#fff",
    fontWeight: "600",
  },
  contactSection: {
    height: "10%",
    width: "88%",
    //borderWidth: 1,
    marginHorizontal: "6%",
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: "2.5%",
  },
  contactText: {
    fontSize: 14,
    fontWeight: 350,
    color: "#444444",
    letterSpacing: 1,
    marginHorizontal: "1%",
  },
  contactContainer: {
    height: "50%",
    width: "100%",
    //borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  countryCode: {
    height: "90%",
    width: "15%",
    borderWidth: 1,
    borderColor: "#FFB6C1",
    borderRadius: 8,
    alignSelf: "center",
  },
  countryCodeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "10%",
  },

  countryCodeText: {
    fontSize: 14,
    fontWeight: "400",
  },
  dropdown: {
    marginTop: "15%",
    marginLeft: "0%",
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    zIndex: 12,
  },
  dropdownItem: {
    paddingVertical: "5%",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: "18%",
    alignSelf: "center",
    zIndex: 11,
  },
  dropdownText: {
    fontSize: 14,
    color: "#444444",
  },
  contactInput: {
    height: "90%",
    width: "80%",
    borderWidth: 1,
    borderColor: "#FFB6C1",
    borderRadius: 8,
    paddingTop: "1%",
    alignSelf: "center",
    outlineStyle: "none",
  },
  verficationText: {
    fontSize: 10,
    fontWeight: 400,
    color: "#979699",
    marginHorizontal: "1%",
  },
  welcomeContainer: {
    flex: 1,
    flexDirection: "column",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  subText: {
    fontSize: 14,
    color: "#ddd",
    marginTop: "1%",
  },
  searchContainer: {
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: "50%",
    width: "30%",
    marginHorizontal: "10%",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.66)",
  },
  searchBar: {},
  searchIcon: {
    alignSelf: "center",
    width: 16,
    height: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "white",
    ...Platform.select({
      web: {
        outlineStyle: "none",
        borderWidth: 0,
      },
    }),
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationIcon: {
    marginRight: 20,
  },
  profileWrapper: {
    //position: "relative",
    height: "60%",
    width: "10%",
    //borderWidth: 1,
    borderColor: "#fff",
    alignSelf: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 8,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  caretIcon: {
    marginLeft: 1,
  },
  dropdownContainer: {
    zIndex: 10,
    width: "100%",
    alignItems: "center",
  },
  dropdownMenu: {
    marginBottom: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    paddingVertical: "2%",
    width: "100%",
    zIndex: 10,
    marginLeft: "100%",
  },
  // dropdownItem: {
  //   paddingVertical: ,
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#ddd",
  //   paddingHorizontal: 15,
  // },
  // dropdownText: {
  //   fontSize: 16,
  //   color: "#333",
  // },
  gradientBox: {
    width: "75%",
    height: "65%",
    borderRadius: 10,
    marginTop: "2%",
    //alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "5%",
    overflow: "hidden",
    //position: "relative",
    marginHorizontal: "5%",
    zIndex: 1,
  },
  formBox: {
    width: "88%",
    height: "84%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingHorizontal: "3%",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 1,
    //borderWidth: 1,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: "2%",
  },
  formContent: {
    flexDirection: "row",
    //borderWidth: 1,
    marginVertical: "1.5%",
    height: "95%",
    borderColor: "blue",
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  leftSection: {
    flex: 1,
    //borderWidth: 1,
  },
  rightSection: {
    flex: 1,
    flexDirection: "column",
    //marginRight:"6%",
    //borderWidth: 1,
  },
  MedicalImage: {
    marginLeft: "35%",
    height: 80,
    width: 80,
  },
  secureText: {
    marginVertical: "3%",
    fontWeight: 500,
    fontSize: 16,
    //marginLeft: "7%",
    alignSelf: "center",
  },
  medilockerTextBox: {
    height: "17%",
    width: "100%",
    //borderWidth: 1,
    alignSelf: "center",
  },
  medilockerText: {
    fontWeight: 500,
    fontSize: 13,
  },
  keyPointBox: {
    height: "25%",
    width: "80%",
    //borderWidth: 1,
    marginTop: "3%",
    flexDirection: "row",
  },
  iconBox: {
    height: "100%",
    width: "10%",
    //borderWidth: 1,
    borderColor: "red",
    flexDirection: "column",
    justifyContent:"space-around"
  },
  starIcon: {
    //alignSelf: "center",
  },
  keyPointTextBox: {
    height: "100%",
    width: "90%",
    //borderWidth: 1,
    borderColor: "green",
    justifyContent:"space-around"
  },
  keyPointText:{
    fontSize:12,
    fontWeight:400,
    color:"#444444"
  },
  tryMedilockerButton: {
    height: "8%",
    width: "45%",
    borderWidth: 1,
    alignSelf: "center",
    borderColor: "#FF7072",
    borderRadius: 5,
    marginVertical: "8%",
  },
  tryText: {
    fontSize: 14,
    fontWeight: 500,
    color: "#000000",
    alignSelf: "center",
    marginTop: "3%",
  },
  verticalLine: {
    width: 1,
    backgroundColor: "#ddd",
    marginHorizontal: "5%",
    height: "75%",
    alignSelf: "center",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginTop: "5%",
  },
  textArea: {
    backgroundColor: "#fff",
    borderRadius: 5,
    ...Platform.select({
      web: {
        borderRadius: 2,
        marginLeft: "1%",
        marginRight: "5%",
        padding: "1%",
        maxWidth: "100%",
        marginBottom: "5%",
        outlineStyle: "none",
        borderWidth: 1,
        borderColor: "#979699",
        marginTop: "7%",
        height: "20%",
      },
    }),
  },
  mobileInput: {
    width: "75%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 2,
    padding: "5%",
    fontSize: 14,
    marginTop: "0%",
    color: "#333",
  },
  additionalText: {
    fontSize: 12,
    color: "#666",
    marginTop: "1%",
  },
  button: {
    width: "55%",
    backgroundColor: "#FFB6C1",
    paddingVertical: "4%",
    borderRadius: 8,
    alignItems: "center",
    marginTop: "5%",
  },
  buttonBox: {
    height: "5%",
    width: "75%",
    //borderWidth:1,
    backgroundColor: "#FF7072",
    alignSelf: "center",
    marginVertical: "15%",
    paddingVertical: "2%",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default ConsultWithDoctors;
