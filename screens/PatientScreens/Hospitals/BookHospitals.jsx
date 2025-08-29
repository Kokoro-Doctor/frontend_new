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
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import Header from "../../../components/PatientScreenComponents/Header";
//import SearchBar from "../../components/PatientScreenComponents/SearchBar";
import SideBarNavigation from "../../../components/PatientScreenComponents/SideBarNavigation";
import Icon from "react-native-vector-icons/FontAwesome";
import MyLinearGradient1 from "../../../components/PatientScreenComponents/MyLinearGradient1";
//import HospitalAvailability from "./App/HospitalAvailability";
// import DoctorNearYou from "./DoctorNearYou";
// import DoctorResultShow from "./DoctorResultShow";

const BookHospitals = ({ navigation, route }) => {
  const [selectedCards, setSelectedCards] = useState([]); // for selecting symptoms cards
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91"); //for selecting country code
  const { width } = useWindowDimensions();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const hospitals = route.params?.hospitals || {};

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

  const handleContinueButton = () => {
    navigation.navigate("HospitalBookingNext", {hospitals:hospitals});
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

              {/* Right Section - Main Content */}
              <View style={styles.Right}>
                {/* Header */}
                <View style={styles.header}>
                  <Header navigation={navigation} />
                </View>

                {/* 🔹 Gradient Section (Using MyLinearGradient) */}
                <MyLinearGradient1 style={styles.gradientBox}>
                  {/* Consultation Form */}
                  <View style={styles.formBox}>
                    <Text style={styles.formTitle}>Book Hospital</Text>

                    <View style={styles.formContent}>
                      {/* Left Section */}
                      <View style={styles.leftSection}>
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
                          onPress={()=>{}}
                        >
                          <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                      </View>

                      {/* Vertical Line */}
                      <View style={styles.verticalLine} />

                      {/* Right Section */}
                      <View style={styles.rightSection}></View>
                    </View>
                  </View>
                </MyLinearGradient1>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}

      {(Platform.OS !== "web" || width < 1000) && (
        // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <StatusBar barStyle="light-content" backgroundColor="#fff" />
            <View style={styles.appContainer}>
              <View style={[styles.appheader, { height: "15%" }]}>
                <Header navigation={navigation} />
              </View>
              <View style={styles.app_doctorTextBox}>
                <Text style={styles.app_doctorText}>Book Hospital</Text>
              </View>

              <View style={styles.app_consultBox}>
                <Text style={styles.app_consultBoxText}>Tell us your symptoms</Text>
                <TextInput
                  style={styles.app_textArea}
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
              <View style={styles.app_selectSymptomTextBox}>
                <Text style={styles.app_selectSymptomText}>Quick select symptoms</Text>

                <View style={styles.app_symptomGrid}>
                  {symptoms.map((item, index) => {
                    const isSelected = selectedCards.includes(item);
                    return (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.app_symptomCard,
                          isSelected && styles.app_selectedCard, // Apply selected style
                        ]}
                        onPress={() => toggleCardSelection(item)}
                      >
                        <Text
                          style={[
                            styles.app_symptomText,
                            isSelected && styles.app_selectedCardText, // Change text color if selected
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              <View style={styles.app_contactSection}>
                <Text style={styles.app_contactText}>Enter Number</Text>
                <View style={styles.app_contactContainer}>
                  <View style={styles.app_countryCode}>
                    <TouchableOpacity
                      onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                      style={styles.app_countryCodeButton}
                    >
                      <Text style={styles.app_countryCodeText}>
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
                      <View style={styles.app_dropdown}>
                        {["+91", "+1", "+44", "+61", "+81"].map((code) => (
                          <TouchableOpacity
                            key={code}
                            style={styles.app_dropdownItem}
                            onPress={() => {
                              setSelectedCountryCode(code);
                              setIsDropdownOpen(false);
                            }}
                          >
                            <Text style={styles.app_dropdownText}>{code}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                
                  <TextInput
                    placeholder="Enter your number"
                    keyboardType="numeric"
                    style={styles.app_contactInput}
                    maxLength={10}
                  />
                
                </View>
                <Text style={styles.app_verficationText}>
                  A verification code will be sent to this number
                </Text>
              </View>
              <TouchableOpacity style={styles.app_buttonBox} onPress={handleContinueButton}>
                <Text style={styles.app_buttonText}>Continue</Text>
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
    backgroundColor: "#f0f0f0",
  },
  Right: {
    flex: 1,
    //alignItems: "center",
  },
  header: {
    // borderWidth: 5,
    // borderColor: "black",
    zIndex: 2,
    ...Platform.select({
      web:{
        width:"100%",
      }
    })
  },
  appheader: {
    zIndex: 2,
    ...Platform.select({
      web: {
        width:"100%",
      },
    }),
  },
  app_doctorTextBox:{ 
    height: "5%",
    width: "50%",
    //borderWidth: 1,
    marginHorizontal: "5%",
    marginVertical: "1%",  
  },
  app_doctorText: {
    fontSize: 16,
    fontWeight: 900,
    //fontFamily: "Poppins",
    paddingVertical: "5%",
    paddingHorizontal: "3%",
    letterSpacing: 0.7,
  },
  app_consultBox: {
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
  app_consultBoxText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 400,
    marginVertical: "5%",
    marginHorizontal: "5%",
  },
  app_textArea: {
    //flexShrink:1
    backgroundColor:"#fff",
    borderRadius: 5,
    ...Platform.select({
      web:{
        borderRadius:2,
        marginLeft:"5%",
        marginRight:"5%",
        padding:"1%",
        maxWidth: "100%",
        marginBottom:"5%",
        outlineStyle: "none",
        borderWidth: 0,
      },
    }),  
  },
  app_selectSymptomTextBox: {
    height: "22%",
    width: "91%",
  
    //borderWidth: 1,
    marginHorizontal: "5%",
    marginVertical: "3%",
    flexDirection: "column",
  },
  app_selectSymptomText: {
    fontSize: 14,
    fontWeight: 350,
    paddingHorizontal: "1.5%",
    letterSpacing: 0.5,
  },
  app_symptomGrid: {
    flexDirection: "row",
    flexWrap: "wrap", // Wrap items to next line
    gap: 8,
    height: "90%",
    width: "100%",
    ...Platform.select({
      web:{
         flexWrap:"wrap",
         maxWidth: "100%"

      },
    }),
    
    //borderWidth: 1,
    paddingHorizontal: "0.2%",
    justifyContent: "space-between",
  },

  app_symptomCard: {
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
  app_selectedCard: {
    backgroundColor: "#FFB6C1",
    borderColor: "#FF69B4",
  },

  app_symptomText: {
    fontSize: 12,
    color: "#333", // Dark text color
    textAlign: "center",
    fontWeight: "400",
  },
  app_selectedCardText: {
    color: "#fff",
    fontWeight: "600",
  },
  app_contactSection: {
    height: "10%",
    width: "88%",

    ...Platform.select({
      web:{
         marginTop:"10%",

      },
    }),
    
    //borderWidth: 1,
    marginHorizontal: "6%",
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: "2.5%",
  },
  app_contactText: {
    fontSize: 14,
    fontWeight: 350,
    color: "#444444",
    letterSpacing: 1,
    marginHorizontal: "1%",
  },
  app_contactContainer: {
    height: "50%",
    width: "100%",
    //borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  app_countryCode: {
    height: "90%",
    width: "15%",
    borderWidth: 1,
    borderColor: "#FFB6C1",
    borderRadius: 8,
    alignSelf: "center",
  },
  app_countryCodeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "10%",
  },

  app_countryCodeText: {
    fontSize: 14,
    fontWeight: "400",
  },
  app_dropdown: {
    marginTop: "15%",
    marginLeft: "0%",
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    zIndex: 12,
  },
  app_dropdownItem: {
    paddingVertical: "5%",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: "18%",
    alignSelf: "center",
    zIndex: 11,
  },
  app_dropdownText: {
    fontSize: 14,
    color: "#444444",
  },
  app_contactInput: {
    height: "90%",
    width: "80%",
    borderWidth: 1,
    borderColor: "#FFB6C1",
    borderRadius: 8,
    paddingTop: "1%",
    alignSelf: "center",
    outlineStyle: "none",
  },
  app_verficationText: {
    fontSize: 10,
    fontWeight: 400,
    color: "#979699",
    marginHorizontal: "1%",
  },
  app_welcomeContainer: {
    flex: 1,
    flexDirection: "column",
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
    height: "90%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingHorizontal: "3%",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
    zIndex: 1,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: "2%",
  },
  formContent: {
    flexDirection: "row",
  },
  leftSection: {
    flex: 1,
    paddingRight: "10%",
  },
  rightSection: {
    flex: 1,
    paddingLeft: "10%",
  },
  verticalLine: {
    width: 1,
    backgroundColor: "#ddd",
    marginHorizontal: "1%",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginTop: "5%",
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 2,
    padding: "10",
    fontSize: 14,
    marginTop: "5%",
    color: "#333",
    height: "15%",
  },
  textArea: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 2,
    padding: "5%",
    fontSize: 14,
    marginTop: "1%",
    color: "#333",
    height: "50%",
    textAlignVertical: "top",
    outlineStyle: "none",
  },
  mobileInput: {
    width: "75%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 2,
    padding: "5%",
    fontSize: 14,
    marginTop: "1%",
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
    marginTop: "12%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  //..........APP design   
  app_buttonBox:{
    height:"5%",
    width:"75%",
    //borderWidth:1,
    backgroundColor: "#FF7072",
    alignSelf:"center",
    marginVertical:"15%",
    paddingVertical:"2%",
    borderRadius:10
  },
  app_buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf:"center"
  },


});

export default BookHospitals;
