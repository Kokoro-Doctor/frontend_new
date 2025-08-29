import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import HospitalAvailabilitySlotsComponent from "../../../../components/PatientScreenComponents/HospitalComponents/HospitalAvailabilitySlotsComponent";
const HospitalAvailabilitySlots = ({ navigation, route }) => {
  const { width } = useWindowDimensions();
  const hospitals = route.params?.hospitals || {};

  const handleBookAppointment = () => {
    navigation.navigate("HospitalPaymentApp");
  }

  return (
    <>
      {(Platform.OS !== "web" || width < 1000) && (
        <View style={styles.appContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#fff" />
          <View style={{ flex: 1 }}>
            <View style={styles.HeadingContainer}>
              <View style={styles.hospitaldetail}>
                <Text style={styles.doctorName}>{hospitals.name}</Text>
                <Text style={styles.doctorCredentials}>
                  ({hospitals.credential})
                </Text>
              </View>

              <View style={styles.iconContainer}>
                <TouchableOpacity>
                  <Icon
                    style={styles.app_icondesign}
                    name="call-outline"
                    size={30}
                    color="#FF7072"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.availabilityContainer}>
              <Text style={styles.availabilityTimeText}>Available Time</Text>
              <View style={styles.availabilitySlotContainer}>
                <HospitalAvailabilitySlotsComponent route={route} hospitals={hospitals}/>
              </View>
            </View>
            <TouchableOpacity
              style={styles.bookAppointmentButton}
              onPress={handleBookAppointment}
            >
              <Text style={styles.bookAppointmentText}>Book Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    flexDirection: "column",
    backgroundColor: "#FFF",
  },
  HeadingContainer: {
    marginTop: "10%",
    height: "13%",
    width: "100%",
    //borderWidth: 1,
    marginBottom: "5%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  hospitaldetail: {
    maxWidth: "80%",
    width: "80%",
    justifyContent: "flex-start",
    paddingTop: "10%",
    ...Platform.select({
      web: {
        paddingTop: "5%",
      },
    }),

    paddingRight: "25%",
  },
  iconContainer: {
    width: "20%",
    paddingTop: "10%",
    ...Platform.select({
      web: {
        paddingTop: "5%",
      },
    }),
  },

  app_icondesign: {
    maxWidth: "80%",
    padding: 10,
    borderWidth: 8,
    borderColor: "#F4F3F3",
    borderRadius: 50,
    backgroundColor: "#FFFF",
  },

  doctorName: {
    fontSize: 22,
    fontWeight: 600,
    color: "#000000",
    alignSelf: "center",
  },
  doctorCredentials: {
    fontSize: 14,
    alignSelf: "center",
    fontWeight: 600,
  },
  availabilityContainer: {
    height: "62%",
    width: "90%",
    maxWidth: "90%",
    maxHeight: "62%",
    //borderWidth: 1,
    alignSelf: "center",
  },
  availabilityTimeText: {
    fontSize: 13,
    fontWeight: 600,
    color: "#444444",
    paddingHorizontal: "2%",
  },
  availabilitySlotContainer: {
    height: "94%",
    width: "100%",
    maxWidth: "1000%",
    maxHeight: "94%",
    //borderWidth:1,
    borderColor: "green",
    borderRadius: 15,
    boxShadow: " 0px 0px 4px 2px rgba(0, 0, 0, 0.25)",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: "2%",
  },
  bookAppointmentButton: {
    height: "5%",
    width: "70%",
    maxHeight: "5%",
    maxWidth: "70%",
    //borderWidth: 1,
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: "rgb(243, 119, 119)",
    marginVertical: "6%",
  },
  bookAppointmentText: {
    alignSelf: "center",
    paddingVertical: "3.5%",
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 600,
  },
});
export default HospitalAvailabilitySlots;
