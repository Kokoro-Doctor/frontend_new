import React, { useCallback, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Alert,
  Image,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  FlatList,
  StatusBar,
} from "react-native";

const HospitalAvailability = ({ navigation, route }) => {
  //const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const hospitals = route.params?.hospitals || {}; // Get doctor data from navigation
  //const [expanded, setExpanded] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSearch = () => {
    Alert.alert(`Search Results for: ${searchQuery}`);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTimeSlot(time);
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot((prevSlot) => (prevSlot === slot ? null : slot));
  };
  const selectedSlots =
    selectedDay && hospitals.availability[selectedDay]?.slots
      ? hospitals.availability[selectedDay].slots
      : { morning: [], afternoon: [] };

  const chunkSize = 3;
  // const availabilityArray = Object.keys(hospitals?.availability).map((day) => ({
  //   day,
  //   slotsAvailable: hospitals?.availability[day]?.slotsAvailable || 0,
  //   slots: hospitals?.availability?.[day]?.slots || [0],
  // }));
  const availabilityArray = hospitals?.availability
    ? Object.keys(hospitals.availability).map((day) => ({
        day,
        slotsAvailable: hospitals.availability[day]?.slotsAvailable || 0,
        slots: hospitals.availability[day]?.slots || [0],
      }))
    : [];

  const chunkedAvailability = [];
  for (let i = 0; i < availabilityArray.length; i += chunkSize) {
    chunkedAvailability.push(availabilityArray.slice(i, i + chunkSize));
  }

  const [visibleChunks, setVisibleChunks] = useState(1); // Show first 3 days initially
  const loadMoreDays = () => {
    if (visibleChunks < chunkedAvailability.length) {
      setVisibleChunks(visibleChunks + 1);
    }
  };

  const clinicData = {
    name: "Wisdom Clinics",
    fee: "₹800 fee",
    waitTime: "Max 15 min wait",
    layout: "Hsr Layout",
  };

  const availableDates = [
    { id: "today", label: "Today", slotsAvailable: 0 },
    { id: "tomorrow", label: "Tomorrow", slotsAvailable: 2 },
    { id: "dayAfter", label: "Mon, 2 feb", slotsAvailable: 2 },
  ];

  const timeSlots = {
    morning: { label: "Morning (1 slot)", slots: ["10:30 AM"] },
    afternoon: { label: "Afternoon (1 slot)", slots: ["12:30 PM"] },
  };
  const morningSlotArray = [
    "9:45",
    "10:00",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
  ];
  const afternoonSlotArray = [
    "12:00",
    "12:30",
    "12:45",
    "1:15",
    "1:00",
    "1:45",
  ];

  const toggleSlotSelection = (slot) => {
    setSelectedSlot(selectedSlot === slot ? null : slot);
  };
  return (
    <View style={styles.parent}>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
      <View style={styles.hospitalImage}>
        <Image
          source={require("../../../../assets/Images/hospitalImage.jpeg")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.hospitalDetails}>
        <View style={styles.hospitalDetailsContainer1}>
          <View style={styles.hospitalDetailsContainer1Bottom}>
            <Text style={styles.hospitalname}>Apollo Hospital</Text>
            <Text style={styles.hospitaltype}>Multispecialty</Text>
          </View>
          <View style={styles.hospitalDetailsContainer1Bottom}>
            <View style={styles.distanceconatiner}>
              <Text style={styles.distanceHeading}>Distance</Text>
              <Text style={styles.distanceAway}>2.3 km away</Text>
            </View>
            <View style={styles.arrivalContainer}>
              <Text style={styles.arrivalHeading}>Arrival time</Text>
              <Text style={styles.arrivingIn}>Reaches in 10 min</Text>
            </View>
          </View>
        </View>
        <View style={styles.hospitalDetailsContainer2}>
          <TouchableOpacity>
            <Icon
              style={styles.icondesign}
              name="call-outline"
              size={30}
              color="#FF7072"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bedReviewContainer}>
        <View style={styles.emergencyBed}>
          <Image source={require("../../../../assets/Icons/hospital-bed.png")} />
          <View style={styles.emergencyBedBody}>
            <Text style={styles.bedHeading}>Emergency Beds </Text>
            <Text style={styles.bedAvailability}>
              Emergenecy Beds Avialable{" "}
            </Text>
          </View>
        </View>
        <View style={styles.review}>
          <Icon style={styles.starIcon} name="star" size={30} color="#FFD500" />
          <View style={styles.emergencyBedBody}>
            <Text style={styles.bedHeading}>Rating & Reviews </Text>
            <Text style={styles.bedAvailability}>4.9 (5000)</Text>
          </View>
        </View>
      </View>
      <View style={styles.slotsHeadingContainer}>
        <Text style={styles.BookSlotsText}>Book Slots</Text>
      </View>
      <View style={styles.footerBox}>
        <Text style={styles.availabilityTimeText}>Available Time</Text>
        <View style={styles.availabilityShowBox}>
          <View style={styles.availabilityBox}>
            <FlatList
              //   data={availabilityList}
              data={chunkedAvailability.slice(0, visibleChunks).flat()}
              horizontal
              keyExtractor={(item) => item.day}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dayColumn,
                    selectedDay === item.day && styles.selectedDay,
                  ]}
                  onPress={() => setSelectedDay(item.day)}
                >
                  <Text style={styles.dayTitle}>
                    {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                  </Text>
                  <Text style={styles.slotsAvailable}>
                    {item.slotsAvailable > 0
                      ? `${item.slotsAvailable} slots Available`
                      : "No slot today"}
                  </Text>
                </TouchableOpacity>
              )}
              onEndReached={loadMoreDays}
              onEndReachedThreshold={0.5}
            />
          </View>

          {selectedDay && (
            <View style={styles.timeSlotContainer}>
              {/* Check if all slots are empty */}
              {selectedSlots.morning.length === 0 &&
              selectedSlots.afternoon.length === 0 ? (
                <View style={styles.noSlotsContainer}>
                  <Text style={styles.noSlots}>No slots available</Text>
                </View>
              ) : (
                <>
                  {/* Morning Slots */}
                  <Text style={styles.slotCategory}>Morning</Text>
                  <View style={styles.slotGrid}>
                    {selectedSlots.morning.length > 0 ? (
                      selectedSlots.morning.slice(0, 2).map((slot, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.slotButton,
                            selectedSlot === slot && styles.selectedSlot, // Apply selected style
                          ]}
                          onPress={() => handleSlotSelection(slot)}
                        >
                          <Text
                            style={[
                              styles.slotText,
                              selectedSlot === slot && styles.selectedSlotText, // Change text color
                            ]}
                          >
                            {slot}
                          </Text>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <Text style={styles.noSlots}>
                        No morning slots available
                      </Text>
                    )}
                  </View>

                  {/* Afternoon Slots */}
                  <Text style={styles.slotCategory}>Afternoon</Text>
                  <View style={styles.slotGrid}>
                    {selectedSlots.afternoon.length > 0 ? (
                      selectedSlots.afternoon.slice(0, 2).map((slot, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.slotButton,
                            selectedSlot === slot && styles.selectedSlot, // Apply selected style
                          ]}
                          onPress={() => handleSlotSelection(slot)}
                        >
                          <Text
                            style={[
                              styles.slotText,
                              selectedSlot === slot && styles.selectedSlotText, // Change text color
                            ]}
                          >
                            {slot}
                          </Text>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <Text style={styles.noSlots}>
                        No afternoon slots available
                      </Text>
                    )}
                  </View>
                </>
              )}
            </View>
          )}

          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() =>
              navigation.navigate("HospitalAvailabilitySlots", {
                hospitals: hospitals,
              })
            }
          >
            <Text style={styles.viewAllText}>View All Availability →</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bookhospitalButtoncontainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("HospitalPaymentApp")}
        >
          <View style={styles.bookhospitalButton}>
            <Text style={styles.bookHospitalText}>Book Hospital</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  hospitalImage: {
    height: "25%",
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  hospitalDetails: {
    height: "13%",
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "2%",

    flexDirection: "row",
  },
  hospitalDetailsContainer1: {
    width: "65%",
    height: "100%",
    // backgroundColor:"blue",
  },
  hospitalDetailsContainer1Top: {
    width: "100%",
    height: "50%",
  },
  hospitalname: {
    fontSize: 24,
    fontStyle: "Poppins",
    fontWeight: "bold",
  },
  hospitaltype: {
    fontSize: 14,
    fontStyle: "Poppins",
    fontWeight: "bold",
  },
  hospitalDetailsContainer1Bottom: {
    width: "100%",
    height: "50%",
    ...Platform.select({
      web: {
        marginTop: "2%",
        gap: 1,
      },
    }),

    // backgroundColor:"red",
  },
  distanceconatiner: {
    height: "50%",
    width: "55%",
    paddingTop: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  distanceHeading: {
    fontStyle: "Sunflower",
    fontSize: 14,
    fontWeight: 400,
    color: "#9B9A9A",
  },
  distanceAway: {
    fontStyle: "Poppins",
    fontSize: 10,
    fontWeight: 500,
    color: "#FF0000",
  },
  arrivalContainer: {
    height: "50%",
    width: "90%",
    flexDirection: "row",
    paddingRight: "15%",
    alignItems: "center",
    // gap: 10,
    ...Platform.select({
      web: {
        // paddingRight: "15%",
      },
    }),
    justifyContent: "space-between",
  },
  arrivalHeading: {
    fontStyle: "Sunflower",
    fontSize: 14,
    fontWeight: 400,
    color: "#9B9A9A",
  },
  arrivingIn: {
    fontStyle: "Poppins",
    fontSize: 10,
    fontWeight: 500,
    color: "#2CBE5E",
  },
  hospitalDetailsContainer2: {
    width: "35%",
    height: "100%",
    // backgroundColor:"yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  icondesign: {
    padding: 10,
    borderWidth: 5,
    borderColor: "#F4F3F3",
    borderRadius: 50,
    backgroundColor: "#FFFF",
  },
  bedReviewContainer: {
    width: "85%",
    height: "8%",
    marginLeft: "7.5%",
    flexDirection: "row",
    backgroundColor: "#FFFCFC",
    borderRadius: 5,
    elevation: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    ...Platform.select({
      web: {
        marginTop: 10,
      },
    }),
  },
  emergencyBed: {
    width: "50%",
    height: "100%",
    paddingLeft: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRightWidth: 1,
  },
  emergencyBedBody: {
    width: "80%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
	padding:"2%",
  },
  bedHeading: {
    fontStyle: "Poppins",
    fontSize: 14,
    fontWeight: "bold",
    padding: "1%",
    color: "#444444",
  },
  bedAvailability: {
    fontStyle: "Poppins",
    fontSize: 10,
    padding: "1%",
    color: "#444444",
  },
  review: {
    width: "50%",
    height: "100%",
    paddingLeft: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slotsHeadingContainer: {
    width: "85%",
    height: "4%",
    justifyContent: "center",
    marginLeft: "7.5%",
    // backgroundColor: "red",
  },
  BookSlotsText: {
    fontSize: 12,
    fontWeight: 600,
  },
  footerBox: {
    width: "85%",
    height: "42%",
    marginLeft: "7.5%",
    padding: "2%",
    backgroundColor: "#FFFCFC",
    borderRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  availabilityTimeText: {
    fontSize: 13,
    fontWeight: 600,
    color: "#444444",
    paddingHorizontal: "2%",
  },
  availabilityShowBox: {
    height: "91%",
    width: "98%",
    //borderWidth:1,
    alignSelf: "center",
    borderRadius: 15,
    marginVertical: "2%",
    paddingTop: "3%",
    flexDirection: "column",
  },
  availabilityBox: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    //borderWidth: 1,
  },
  dayColumn: {
    alignItems: "center",
    //borderWidth: 1,
    width: 108,
  },
  selectedDay: {
    backgroundColor: " rgb(254, 248, 248)",
    borderWidth: 1,
    borderColor: "rgba(255, 112, 114, 1)",
    paddingHorizontal: "0%",
  },

  dayTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },

  noSlots: {
    color: "gray",
    fontSize: 15,
  },

  slotsAvailable: {
    color: "green",
    fontSize: 12,
  },
  noSlot: {
    color: "gray",
    fontSize: 15,
    fontWeight: 400,
    alignSelf: "center",
    marginTop: "20%",
  },
  noSlotsContainer: {
    alignSelf: "center",
    //borderWidth:1,
    marginVertical: "15%",
  },

  timeSlotContainer: {
    marginTop: "2%",
    flexDirection: "column",
    //borderWidth: 1,
    height: "57%",
    //justifyContent: "space-around",
  },

  slotHeading: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: "2",
  },

  slotButton: {
    //backgroundColor: "#E0EBFF",
    paddingVertical: "3%",
    paddingHorizontal: "4%",
    borderRadius: 5,
    alignSelf: "flex-start",
    // marginTop: "2%",
    borderColor: "rgba(22, 128, 236, 0.75)",
    borderWidth: 1,
  },

  slotText: {
    color: "#3366CC",
    fontSize: 13,
    fontWeight: 400,
    //   // alignSelf:"center"
  },
  slotCategory: {
    fontSize: 15,
    fontWeight: 500,
    marginBottom: "2%",
    color: "#000000",
    marginTop: "2%",
  },
  slotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: "1%",
  },
  selectedSlot: {
    backgroundColor: "#007BFF", // Highlighted color when selected
  },
  selectedSlotText: {
    color: "#FFFFFF", // Text color when selected
  },
  viewAllButton: {
    backgroundColor: "#FF7373",
    paddingVertical: "2%",
    alignItems: "center",
    borderRadius: 8,
    width: "85%",
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "5%",
    ...Platform.select({
      web: {
        paddingVertical: "2%",
      },
    }),
  },

  viewAllText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bookhospitalButtoncontainer: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignContent: "center",
    //  backgroundColor:"red",
  },
  bookhospitalButton: {
    width: "70%",
    height: "65%",
    ...Platform.select({
      web: {
        padding: "4%",
      },
    }),
    marginLeft: "16.5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    backgroundColor: "#FF7373",
  },
  bookHospitalText: {
    fontSize: 14,
    fontWeight: 600,
    color: "#fff",
  },
  // selectedCardText: {
  //   color: "#fff",
  //   fontWeight: "600",
  // },
  // selectedBed: {
  //   backgroundColor: "#FFB6C1",
  //   borderColor: "#FF69B4",
  // },
});
export default HospitalAvailability;
