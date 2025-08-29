import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  useWindowDimensions,
  Linking,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
// import MyLinearGradient1 from "../components/MyLinearGradient1";
import { payment_api } from "../../utils/PaymentService";

const plans = [
  {
    name: "Elite Monthly Plan",
    oldPrice: "₹2,499",
    newPrice: "₹1,999/month",
    discount: "Save 62% – Limited Time Offer",
    features: [
      "Unlimited general cardiologist appointments",
      "VIP Access: 1 Senior Cardiologist Consultation per month (Priority Booking)",
      "24/7 AI-Powered Cardiologist Chatbot (Instant Heart Health Insights)",
      "Emergency Hospital Booking (Direct Coordination for Urgent Cases)",
      "MediLocker: Secure digital storage for medical records",
    ],
  },
  {
    name: "Executive Quarterly Plan",
    oldPrice: "₹5,999",
    newPrice: "₹4,499/3 months",
    discount: "Save 67% – Limited Time Offer",
    features: [
      "Unlimited general cardiologist appointments",
      "Comprehensive Heart Check-in with a Senior Cardiologist – 2 times per quarter (More flexibility than monthly restrictions)",
      "Complimentary second-opinion consultation (One-time per quarter)",
      "VIP Hospital Coordination Support (Faster Emergency Assistance)",
    ],
  },
  {
    name: "Platinum Annual Plan",
    oldPrice: "₹19,999",
    newPrice: "₹9,999/year",
    discount: "Save 50% – Limited Time Offer",
    features: [
      "Unlimited general cardiologist appointments",
      "VIP Senior Cardiologist Consultations: 12 per year (Book Anytime, No Monthly Restriction)",
      "Unlimited Emergency Hospital Bookings (Direct Coordination for Urgent Cases)",
      "AI-driven preventive health risk analysis (Proactive Heart Health Management)",
      "VIP concierge service (Seamless Doctor & \n Hospital Coordination)",
    ],
  },
];

const PricingPlans = () => {
  const handleBuyNow = async (plan) => {
    try {
      const pricePart = plan.newPrice.split("/")[0];
      const amount = parseInt(pricePart.replace(/[^\d.]/g, ""), 10);

      const paymentLink = await payment_api(amount);
      console.log("Received payment link:", paymentLink);
      if (paymentLink) {
        Linking.openURL(paymentLink).catch((err) => {
          console.error("Failed to open payment link", err);
          Alert.alert(
            "Error",
            "Unable to open payment link. Please try again."
          );
        });
      }
    } catch (error) {
      console.error("Buy Now Error:", error);
      Alert.alert("Payment Failed", error.message);
    }
  };

  const { width, height } = useWindowDimensions();

  const renderItem = ({ item }) => (
    <View style={[styles.card, { width: width * 0.23 }]}>
      <View style={styles.cardContent}>
        <Text style={styles.planTitle}>{item.name}</Text>
        <Text style={styles.oldPrice}>{item.oldPrice}</Text>
        <Text style={styles.newPrice}>{item.newPrice}</Text>
        <Text style={styles.discount}>{item.discount}</Text>
        <Text style={styles.planDetails}>This Plan includes:</Text>
        <View style={styles.featuresContainer}>
          {item.features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <Image
                source={require("../../assets/Icons/forwardarrow.png")}
                style={styles.arrowIcon}
              />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>
      <Pressable style={styles.button} onPress={() => handleBuyNow(item)}>
        <Text style={styles.buttonText}>Buy Now</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.cardContainer}>
      <BlurView intensity={40} tint="light" style={styles.blurContainer}>
        <LinearGradient
          colors={[
            "#FFFFFF",
            "#E5DFFF",
            "#CCC1FF",
            "#C1B3FF",
            "#AE9DFF",
            "#8A70FF",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCard}
        >
          <FlatList
            data={plans}
            keyExtractor={(item) => item.name}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            renderItem={renderItem}
          />
        </LinearGradient>
      </BlurView>
    </View>
  );
};

export default PricingPlans;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: "3%",
    borderRadius: 5,
    marginBottom: 90,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    margin: 10,
    marginTop: 40,
    height: "90%",
  },
  cardContent: {
    // flexGrow: 1,
    padding: "5%",
  },
  blurContainer: {
    overflow: "hidden",
    height: "100%",
  },
  gradientCard: {
    height: "100%",
  },

  listContainer: {
    paddingHorizontal: "4%",
    // gap: 15,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#000000",
    marginBottom: 5,
  },
  oldPrice: {
    textDecorationLine: "line-through",
    color: "gray",
    fontSize: 24,
    fontFamily: "Annapurna SIL",
    fontWeight: 700,
  },
  newPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "Annapurna SIL",
    fontWeight: 700,
  },
  discount: {
    backgroundColor: "#25BA58",
    color: "#000000",
    fontSize: 14,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    marginVertical: "3%",
    alignSelf: "flex-start",
  },
  planDetails: {
    //fontFamily:"Roboto",
    fontWeight: 600,
    fontSize: 14,
  },
  featuresContainer: {
    borderColor: "#000000",
    height: "65%",
    width: "100%",
  },
  featureRow: {
    flexDirection: "row",
    marginVertical: "2%",
    gap: 5,
    // borderWidth: 1,
    borderColor: "#000000",
  },
  arrowIcon: {
    height: 12,
    width: 12,
  },
  featureText: {
    fontSize: 12,
    fontWeight: 400,
  },
  button: {
    width: "50%",
    backgroundColor: "#FF7072",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    // marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    // marginBottom: "5%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
