import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  FlatList,
  StatusBar,
  ScrollView,
} from "react-native";
import SideBarNavigation from "../../../components/PatientScreenComponents/SideBarNavigation";
import HealthCarePlan from "../../../components/PatientScreenComponents/HealthCarePlan";
import Header from "../../../components/PatientScreenComponents/Header";

const plans = [
  {
    id: "1",
    title: "Elite Monthly Plan",
    price: "₹1,999/month",
    oldPrice: "₹2,499",
    discount: "Save 62%",
  },
  {
    id: "2",
    title: "Executive Quarterly Plan",
    price: "₹4,499/month",
    oldPrice: "₹5,999",
    discount: "Save 67%",
  },
  {
    id: "3",
    title: "Platinum Annual Plan",
    price: "₹9,999/month",
    oldPrice: "₹19,999",
    discount: "Save 50%",
  },
];

const MainPricing = ({ navigation, route }) => {
  const { width } = useWindowDimensions();

  const handleBuyPlan = (id) => {
    if(id==='1'){
      navigation.navigate("ElitePlan");
    }else if(id==='2'){
      navigation.navigate("ExecutivePlan");
    }else if(id==='3'){
      navigation.navigate("PlatinumPlan");
    }
  }

  const [selectedPlan, setSelectedPlan] = useState(null);
  return (
    <>
      {(Platform.OS === "web" && width > 1000) && (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require("../../../assets/Images/MedicineBackground.png")}
              style={styles.imageBackground}
            >
              <View style={[styles.overlay]} />

              <View style={styles.parent}>
                <View style={styles.Left}>
                  <SideBarNavigation navigation={navigation} />
                </View>
                <View style={styles.Right}>
                  <View style={styles.header}>
                    <Header navigation={navigation} />
                  </View>
                  <View style={styles.titleBox}>
                    <Text style={styles.titleText}>
                      Kokoro.Doctor Premium Healthcare Plans
                    </Text>
                  </View>
                  <View style={styles.middlepart}>
                    <HealthCarePlan />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      )}

      {(Platform.OS !== "web" || width < 1000) && (
        <ScrollView style={styles.appContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#fff" />
          <View style={[styles.header, { height: "15%" }]}>
            <Header navigation={navigation} />
          </View>

          <Image
            source={require("../../../assets/Icons/PricingHeart.png")}
            style={styles.appheartIcon}
          />
          <Text style={styles.appHeadtext}>Kokoro.Doctor Premium </Text>
          <Text style={styles.appHeadtext2}>Healthcare Plans </Text>

          <View style={styles.appcontain}>
            <FlatList
              data={plans}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.appcard,
                    selectedPlan === item.id && styles.appcardSelected, // Change background if selected
                  ]}
                  onPress={() => setSelectedPlan(item.id)}
                >
                  <View style={styles.appdiscountTag}>
                    <Text style={styles.appdiscountText}>{item.discount}</Text>
                  </View>
                  <Text style={styles.appplanTitle}>{item.title}</Text>
                  <View style={styles.apppriceRow}>
                    <Text style={styles.appplanPrice}>{item.price}</Text>
                    <Text style={styles.appoldPrice}>{item.oldPrice}</Text>
                  </View>
                  <TouchableOpacity style={styles.appdetailsButton}
                  onPress={() => {handleBuyPlan(item.id)}}>
                    <Text style={styles.appdetailsText}>Plan Details</Text>
                  </TouchableOpacity>
                  <View style={styles.appradioButton}>
                    {selectedPlan === item.id ? (
                      <View style={styles.appradioSelected} />
                    ) : null}
                  </View>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={[styles.appbuyNowButton, selectedPlan && styles.appbuyNowButtonActive,]}
              onPress={() => {handleBuyPlan(selectedPlan)}}
            >
              <Text style={styles.appbuyNowText}>Buy Now</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sparkleContainer}>
            <Image
              source={require("../../../assets/Icons/Yellow_Star.png")}
              style={styles.sparkle}
            />
          </View>
          <View style={styles.sparkleContainer1}>
            <Image
              source={require("../../../assets/Icons/Yellow_Star.png")}
              style={styles.sparkle}
            />
          </View>
          <View style={styles.sparkleContainer2}>
            <Image
              source={require("../../../assets/Icons/Yellow_Star.png")}
              style={styles.sparkle}
            />
          </View>
          <View style={styles.sparkleContainer3}>
            <Image
              source={require("../../../assets/Icons/Yellow_Star.png")}
              style={styles.sparkle}
            />
          </View>
          <View style={styles.sparkleContainer4}>
            <Image
              source={require("../../../assets/Icons/Yellow_Star.png")}
              style={styles.sparkle}
            />
          </View>
        </ScrollView>
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
  appContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    // backgroundColor: "pink",
  },
  imageContainer: {
    height: "100%",
    width: "100%",
    // borderWidth: 1,
    // borderColor: "#ff0000",
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
    //borderWidth: 1,
  },
  Right: {
    height: "100%",
    width: "85%",
    flexDirection: "column",
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
  titleBox: {
    marginLeft: "5%",
    marginVertical: 5,
  },
  titleText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 30,
  },
  middlepart: {
    height: "72%",
    width: "90%",
    //borderWidth: 3,
    // borderRadius: 2,
    // borderColor: "#d3d3d3",
    marginLeft: "5%",
    overflow: "hidden",
    marginVertical: "0.5%",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 1,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject, // Cover the entire `middlepart`
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent black
  },
  appheartIcon: {
    marginLeft: "42%",
  },
  appHeadtext: {
    fontSize: 22,
    marginLeft: "20%",
    fontWeight: "bold",
    // marginRight:"5"
  },
  appHeadtext2: {
    fontSize: 22,
    marginLeft: "28%",
    marginRight: "5",
    fontWeight: "bold",
  },
  appcontain: {
    padding: 15,
  },
  appcard: {
    backgroundColor: "#fff",
    padding: 1,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    position: "relative",
  },
  appcardSelected: {
    backgroundColor: "#ffe5e5", // Light red background when selected
  },

  appdiscountTag: {
    backgroundColor: "green",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  appdiscountText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  appplanTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  apppriceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  appplanPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  appoldPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: "gray",
    marginLeft: 10,
  },
  appdetailsButton: {
    marginTop: 10,
    backgroundColor: "#EFEFEF",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  appdetailsText: {
    fontSize: 14,
    color: "#333",
  },
  appradioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "red",
    position: "absolute",
    right: 15,
    top: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  appradioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
  },
  appbuyNowButton: {
    backgroundColor: "pink",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    marginLeft: "15%",
    marginRight: "15%",
  },
  appbuyNowButtonActive: {
    backgroundColor: "#ff4d4d", // Dark red when a plan is selected
  },
  appbuyNowText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  sparkleContainer: {
    position: "absolute",
    top: 80,
    right: 1,
  },
  sparkle: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    opacity: 0.5,
  },
  sparkleContainer1: {
    position: "absolute",
    top: 350,
    right: 20,
  },
  sparkleContainer2: {
    position: "absolute",
    top: 650,
    right: 60,
  },
  sparkleContainer3: {
    position: "absolute",
    top: 700,
    right: 300,
  },
  sparkleContainer4: {
    position: "absolute",
    top: 750,
    right: 100,
  }
});

export default MainPricing;
