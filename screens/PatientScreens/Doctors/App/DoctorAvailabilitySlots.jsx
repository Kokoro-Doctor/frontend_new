import React from "react";
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
import DoctorAvailabilitySlotsComponent from "../../../../components/PatientScreenComponents/DoctorComponents/DoctorAvailabilitySlotsComponent";
const DoctorAvailabilitySlots = ({ navigation, route }) => {
  const { width } = useWindowDimensions();
  const doctors = route.params?.doctors || {};
  return (
    <>
      {(Platform.OS !== "web" || width < 1000) && (
        <View style={styles.appContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#fff" />
          <View style={{ flex: 1 }}>
            <View style={styles.imageContainer}>
              <Image source={{uri:doctors.profilePhoto}} style={styles.doctorImage} />
              <Text style={styles.doctorName}>{doctors.doctorname}</Text>
              <Text style={styles.doctorCredentials}>
                ({doctors.specialization})
              </Text>
            </View>
            <View style={styles.availabilityContainer}>
              <Text style={styles.availabilityTimeText}>Available Time</Text>
              <View style={styles.availabilitySlotContainer}>
                <DoctorAvailabilitySlotsComponent navigation={navigation} route={route} doctors={doctors} />
              </View>
            </View>
            <TouchableOpacity
              style={styles.bookAppointmentButton}
              onPress={() => {navigation.navigate("AppDoctorsRating")}}
            >
              <Text style={styles.bookAppointmentText}>Subscribe</Text>
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
    backgroundColor: "#fff",
  },
  imageContainer: {
    height: "17%",
    width: "75%",
    //borderWidth: 1,
    marginVertical: "10%",
    marginBottom: "5%",
    alignSelf: "center",
  },
  doctorImage: {
    height: 90,
    width: 90,
    alignSelf: "center",
    borderRadius: 50,
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
    //borderWidth:1,
    borderColor: "green",
    borderRadius: 15,
    boxShadow: " 0px 0px 4px 2px rgba(0, 0, 0, 0.25)",
    flexDirection:"column",
    justifyContent:"space-between",
    marginTop:"2%"
  },
  bookAppointmentButton: {
    height: "5%",
    width: "70%",
    //borderWidth: 1,
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: "rgb(237, 109, 111)",
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
export default DoctorAvailabilitySlots;
