import { useCallback, useState, useEffect, useContext } from "react";
import {
  Alert,
  Image,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  Dimensions,
  ScrollView,
  useWindowDimensions,
  Linking,
  StatusBar,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useChatbot } from "../../../../contexts/ChatbotContext";
import { useFocusEffect } from "@react-navigation/native";
import SideBarNavigation from "../../../../components/PatientScreenComponents/SideBarNavigation";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../../../../contexts/AuthContext";
import {payment_api} from "../../../../utils/PaymentService";

const HospitalPaymentApp = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [patientName, setPatientName] = useState("");
  const { setChatbotConfig } = useChatbot();
  const { width } = useWindowDimensions();
  const {user} = useContext(AuthContext)
  useFocusEffect(
    useCallback(() => {
      // Reset chatbot height when this screen is focused
      setChatbotConfig({ height: "32%" });
    }, [])
  );

  const handleSearch = () => {
    Alert.alert(`Search Results for: ${searchQuery}`);
  };

  const handleContinuePayment = async (amount) => {
    Alert.alert("Processing Payment", "Redirecting to payment gateway...");
    try {  
      const paymentLink = await payment_api(amount);
      if (paymentLink) {
        Linking.openURL(paymentLink).catch((err) => {
          console.error("Failed to open payment link", err);
          Alert.alert("Error", "Unable to open payment link. Please try again.");
        });
      }
    } catch (error) {
      Alert.alert("Payment Failed", error.message);
    }
  };
  return (
    <>
      {Platform.OS === "web" && width > 1000 && (
        <View style={styles.parent}>
          {/* Sidebar navigation */}
          <View style={styles.Left}>
            <SideBarNavigation navigation={navigation} />
          </View>
        </View>
      )}

      {(Platform.OS !== "web" || width < 1000) && (
        <View style={styles.mobileContainerWrapper}>
          <StatusBar barStyle="light-content" backgroundColor="#fff" />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={true}
          >
            <View style={styles.mobileContainer}>
              {/* Header with back button and title */}

              <View style={styles.hospitalInfoContainer}>
                <Text style={styles.verifiedText}>
                  Verified Cardiologist Available
                </Text>
                <View style={styles.hospitalProfileSection}>
                  <Image
                    source={require("../../../../assets/Images/hospitalImage.jpeg")}
                    style={styles.profileImage}
                  />
                  <View style={styles.hospitalTextInfo}>
                    <Text style={styles.hospitalName}>Apollo Hospital</Text>
                    <Text style={styles.hospitalSpecialty}>(MultiSpeciality)</Text>
                  </View>
                  <TouchableOpacity style={styles.callButton}>
                    {/* <View style={styles.callIconContainer}> */}
                      <Icon
                        style={styles.icondesign}
                        name="call-outline"
                        size={30}
                        color="#FF7072"
                      />

                    <Text style={styles.callText}>Call Doctor</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Patient Info Section */}
              <View style={styles.patientInfoCard}>
                <View style={styles.patientInfoHeader}>
                  <Text style={styles.sectionTitle}>Patient Info</Text>
                  <View style={styles.patientInfoActions}>
                    <TouchableOpacity>
                      <MaterialIcons name="add" size={20} color="#4285F4" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editButton}>
                      <Text style={styles.editButtonText}>Autofill</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.patientInfo}>
                  <View style={styles.patientInfoRow}>
                    <Image
                      source={user?.picture ? { uri: user.picture } : require("../../../../assets/Images/user-icon.jpg")} 
                      style={styles.patientImage}
                    />
                    <View style={styles.patientDetails}>
                      <Text style={styles.patientName}>{user?.name ? user?.name : "User"}</Text>
                      <Text style={styles.contactText}>
                        Contact no: 9876543210
                      </Text>
                      <Text style={styles.noteText}>
                        Note: Please Upload Patient Details in the Drop Link
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.uploadButton}>
                    <Image
                      source={require("../../../../assets/Images/Medilockerfile.jpg")}
                      style={{ width: 18, height: 18 }}
                    />
                    <Text style={styles.uploadButtonText}>
                      Upload from Medilocker
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Schedule Section */}
              <Text style={styles.sectionTitleOutside}>Schedule</Text>
              <View style={styles.scheduleContainer}>
                <View style={styles.scheduleHeader}>
                  <Text style={styles.scheduleHeaderText}>Time</Text>
                  <Text style={styles.scheduleHeaderText}>Date</Text>
                </View>
                <View style={styles.scheduleContent}>
                  <View style={styles.scheduleTimeContainer}>
                    <MaterialIcons name="access-time" size={18} color="#555" />
                    <Text style={styles.scheduleTimeText}>07:00</Text>
                  </View>
                  <View style={styles.scheduleDateContainer}>
                    <MaterialIcons name="event" size={18} color="#555" />
                    <Text style={styles.scheduleDateText}>17 Feb,2025</Text>
                  </View>
                </View>
              </View>

              {/* Payment Section */}
              <Text style={styles.sectionTitleOutside}>Payment</Text>
              <View style={styles.billDetails}>
                <Text style={styles.billTitle}>Bill Details</Text>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Consultation fees:</Text>
                  <Text style={styles.billValue}>₹800</Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Booking Fee</Text>
                  <Text style={styles.billValue}>₹50</Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Promo Applied:</Text>
                  <Text style={styles.billValue}>₹0</Text>
                </View>
                <View style={[styles.billRow, styles.totalRow]}>
                  <Text style={[styles.billLabel, styles.totalLabel]}>
                    Total Pay
                  </Text>
                  <Text style={[styles.billValue, styles.totalValue]}>
                    ₹850
                  </Text>
                </View>
              </View>

              {/* Continue Button */}
              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => {handleContinuePayment(850)}}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  // Mobile styles
  mobileContainerWrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  mobileContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingHorizontal: "5%",
    marginTop: 5,
    paddingTop: "1%",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },

  mobileHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "4%",
  },
  hospitalInfoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "5%",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 30,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  verifiedText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 15,
    alignSelf: "flex-start",
  },
  hospitalProfileSection: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hospitalTextInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  hospitalSpecialty: {
    fontSize: 14,
    color: "#555",
  },
  callButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  callText: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  callIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 8,
    borderColor: "#f0f0f0",
  },
  icondesign: {
    padding: 10,
    borderWidth: 5,
    borderColor: "#F4F3F3",
    borderRadius: 50,
    backgroundColor: "#FFFF",
  },
  patientInfoCard: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: "4%",
    marginBottom: "2.5%",
    width: "100%",
    shadowColor: "#000",
    overflow: "hidden",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: "3%",
    color: "#333",
  },
  sectionTitleOutside: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: "2%",
    marginTop: "2%",
    color: "#333",
  },
  patientInfoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  patientInfoActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#577CEF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    marginLeft: 10,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  patientInfoRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: "3%",
  },
  patientImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  patientDetails: {
    flex: 1,
    justifyContent: "center",
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  contactText: {
    fontSize: 14,
    fontWeight: 600,
    color: "#000000",
    marginTop: 2,
  },
  noteText: {
    fontSize: 14,
    color: "#ff7a7a",
    marginTop: "2%",
    width: "100%",
  },
  uploadButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: "2.5%",
    borderRadius: 25,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#DADADA",
    marginTop: "1.5%",
    width: "100%",
  },
  uploadButtonText: {
    color: "#333",
    marginLeft: 8,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scheduleContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: "2.5%",
    shadowColor: "#000",
    overflow: "hidden",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#fff",
  },
  scheduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    backgroundColor: "#fff",
  },
  scheduleHeaderText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  scheduleContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    backgroundColor: "#fff",
  },
  scheduleTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  scheduleTimeText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "500",
  },
  scheduleDateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  scheduleDateText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "500",
  },
  billDetails: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "2.5%",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 15,
    overflow: "hidden",
    width: "100%",
    shadowColor: "#000",
    overflow: "hidden",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#fff",
  },
  billTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: "3%",
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  billRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "3%",
    paddingVertical: "2.5%",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    width: "100%",
  },
  billLabel: {
    fontSize: 14,
    color: "#555",
    flex: 1,
  },
  billValue: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "right",
  },

  totalRow: {
    marginTop: 0,
    paddingTop: "2.5%",
    paddingBottom: "2.5%",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#f9f9f9",
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  totalValue: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  continueButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff7a7a",
    padding: "2%",
    borderRadius: 10,
    marginVertical: "6%",
    marginHorizontal: "5%",
    width: "90%",
    alignSelf: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HospitalPaymentApp;
