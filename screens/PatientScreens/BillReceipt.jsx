import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import SideBarNavigation from "../../components/PatientScreenComponents/SideBarNavigation";
import Icon from "react-native-vector-icons/FontAwesome";
import MyLinearGradient1 from "../../components/PatientScreenComponents/MyLinearGradient1";

const BillReceipt = ({ navigation }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sample bill receipt data (Replace with dynamic backend data)
  const billItems = [
    {
      service: "Logo Design Concept",
      qty: "5 hrs",
      price: 80,
      gst: 80,
      amount: 400,
    },
    {
      service: "Website Layout Design",
      qty: "10 hrs",
      price: 80,
      gst: 80,
      amount: 800,
    },
    {
      service: "Business Card Design",
      qty: "100 units",
      price: 5,
      gst: 5,
      amount: 500,
    },
  ];

  // Calculating total price dynamically
  const subTotal = billItems.reduce((sum, item) => sum + item.amount, 0);
  const totalGST = subTotal * 0.1; // Assuming 10% GST
  const totalPrice = subTotal + totalGST;

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require("../../assets/Images/background.jpg")}
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
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Welcome Alex!</Text>
                <Text style={styles.subText}>
                  Here is your sales Medical BillReceipt
                </Text>
              </View>

              {/* Search Bar */}
              <View style={styles.searchContainer}>
                <Image
                  source={require("../../assets/Icons/search.png")}
                  style={styles.searchIcon}
                  resizeMode="contain"
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search your query"
                  placeholderTextColor="rgba(255, 255, 255, 1)"
                />
              </View>

              {/* Notification and Profile Section */}
              <View style={styles.iconsContainer}>
                <Image
                  source={require("../../assets/Icons/notification1.png")}
                  style={styles.notificationIcon}
                  resizeMode="contain"
                />
              </View>
              {/* Profile Dropdown */}
              <View style={styles.profileWrapper}>
                <TouchableOpacity
                  onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                  style={styles.profileContainer}
                >
                  <Image
                    source={require("../../assets/Icons/profile1.png")}
                    style={styles.profileIcon}
                    resizeMode="contain"
                  />
                  <Icon
                    name={isDropdownOpen ? "caret-up" : "caret-down"}
                    size={14}
                    color="white"
                    style={styles.caretIcon}
                  />
                </TouchableOpacity>

                {/* Dropdown Content */}
                {isDropdownOpen && (
                  <View style={styles.dropdownContainer}>
                    <View style={styles.dropdownMenu}>
                      <TouchableOpacity style={styles.dropdownItem}>
                        <Text style={styles.dropdownText}>Profile</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.dropdownItem}>
                        <Text style={styles.dropdownText}>Settings</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.dropdownItem}>
                        <Text style={styles.dropdownText}>Logout</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>

            {/* 🔹 Bill Receipt Section */}
            <MyLinearGradient1 style={styles.gradientBox}>
              <View style={styles.formBox}>
                <View style={styles.formTitle}>Bill receipt</View>

                <View style={styles.tableContainer}>
                  {/* Table Header */}
                  <View style={styles.tableHeader}>
                    <Text style={[styles.tableText, styles.tableHeaderText]}>
                      Service
                    </Text>
                    <Text style={[styles.tableText, styles.tableHeaderText]}>
                      Hours/Qty
                    </Text>
                    <Text style={[styles.tableText, styles.tableHeaderText]}>
                      Price
                    </Text>
                    <Text style={[styles.tableText, styles.tableHeaderText]}>
                      GST
                    </Text>
                    <Text style={[styles.tableText, styles.tableHeaderText]}>
                      Amount
                    </Text>
                  </View>

                  {/* Bill Items */}
                  <FlatList
                    data={billItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.tableRow}>
                        <Text style={styles.tableText}>{item.service}</Text>
                        <Text style={styles.tableText}>{item.qty}</Text>
                        <Text style={styles.tableText}>
                          ${item.price.toFixed(2)}/hr
                        </Text>
                        <Text style={styles.tableText}>
                          ${item.gst.toFixed(2)}/hr
                        </Text>
                        <Text style={styles.tableText}>
                          ${item.amount.toFixed(2)}
                        </Text>
                      </View>
                    )}
                  />
                </View>

                {/* Total Calculation */}
                <View style={styles.totalSection}>
                  <Text style={styles.totalText}>
                    Sub total (excl. GST): ${subTotal.toFixed(2)}
                  </Text>
                  <Text style={styles.totalText}>
                    Total GST: ${totalGST.toFixed(2)}
                  </Text>
                  <Text style={styles.totalPrice}>
                    Total Price: ${totalPrice.toFixed(2)}
                  </Text>
                </View>

                {/* Terms & Conditions */}
                <View style={styles.termContainer}>
                  <Text style={styles.termsTitle}>*Terms & Conditions*</Text>
                  <Text style={styles.termsText}>
                    Payment Terms: 50% upfront, 50% upon project completion.
                    Revisions: Up to 2 revisions included for each deliverable.
                    Additional revisions may incur extra fees. Validity: This
                    quote is valid until 12/03/2024. After this date, prices and
                    availability may be subject to change. Timeline: Estimated
                    project duration is 4-6 weeks upon acceptance of quote and
                    deposit payment.
                  </Text>

                  {/* Footer Message */}
                  <Text style={styles.footerMessage}>
                    *Thank you! Please take care of your health*
                  </Text>
                </View>
              </View>
            </MyLinearGradient1>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
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
  },
  header: {
    height: "10%",
    width: "70%",
    borderColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "3%",
    marginHorizontal: "5%",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  subText: {
    fontSize: 14,
    color: "#ddd",
    marginTop: 5,
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
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationIcon: {
    marginRight: 20,
  },
  profileWrapper: {
    height: "60%",
    width: "10%",
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
    zIndex: 1,
    marginLeft: "100%",
  },
  dropdownItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  gradientBox: {
    width: "85%",
    height: "70%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "5%",
    overflow: "hidden",
    marginHorizontal: "5%",
    marginBottom: "5%",
  },

  formBox: {
    width: "100%",
    height: "100%",
  },

  formTitle: {
    fontFamily: "Montserrat_400Regular",
    fontWeight: "400",
    fontSize: 40,
    lineHeight: 40,
    letterSpacing: 0,
    color: "rgba(0, 0, 0, 1)",
    textAlign: "left",
    marginTop: "2%",
    marginRight: "70%",
  },

  tableContainer: {
    marginRight: "2%",
    width: "65%",
    height: "50%",
    marginLeft: "25%",
  },

  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: "1%",
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: "1%",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },

  tableText: {
    flex: 1,
    textAlign: "left",
    fontSize: 12,
    fontFamily: "Satoshi",
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: 0,
    color: "rgba(39, 39, 39, 1)",
  },

  tableHeaderText: {
    fontSize: 12,
    fontWeight: "400",
  },
  totalSection: {
    width: "30%",
    height: "10%",
    marginRight: "2%",
    marginLeft: "75%",
    marginTop: "0%",
  },
  totalText: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(39, 39, 39, 1)",
    fontFamily: "Satoshi",
  },
  totalPrice: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(39, 39, 39, 1)",
    fontFamily: "Satoshi",
    marginTop: "10%",
  },
  termContainer: {
    width: "50%",
    height: "40%",
    marginTop: "1%",
    marginLeft: "24%",
  },
  termsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "rgba(39, 39, 39, 1)",
  },
  termsText: {
    fontSize: 10,
    textAlign: "center",
  },
  footerMessage: {
    fontSize: 16,
    marginBottom: "5%",
    color: "rgba(0, 0, 0, 1)",
  },
});

export default BillReceipt;
