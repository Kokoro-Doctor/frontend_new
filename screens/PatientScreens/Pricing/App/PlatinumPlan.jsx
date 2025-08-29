import { useState } from "react";
import {
  Alert,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  useWindowDimensions,
  StatusBar,
  Linking,
} from "react-native";
import Header from "../../../../components/PatientScreenComponents/Header";
import {payment_api} from "../../../../utils/PaymentService";

const PlatinumPlan = ({ navigation, route }) => {
  const { width } = useWindowDimensions();

  const handleBuyNow = async (amount) => {
    Alert.alert("Redirecting to Payment Gateway...");
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
    <View style={styles.mobileContainer}>
      <View style={[styles.header, { height: "15%" }]}>
        <Header navigation={navigation} />
      </View>

      <View style={styles.ContentContainer}>
        {/* Heart Logo */}
        <View style={styles.heartLogoContainer}>
          <Image
            source={require("../../../../assets/Icons/PricingHeart.png")}
            style={styles.heartLogo}
            resizeMode="contain"
          />
        </View>

        {/* Plan Title */}
        <View style={styles.planTitleContainer}>
          <Text style={styles.planTitle}>Platinum Annual Plan</Text>
        </View>

        {/* Pricing */}
        <View style={styles.pricingContainer}>
          <Text style={styles.originalPrice}>₹19,999</Text>
          <Text style={styles.currentPrice}>
            ₹9,999<Text style={styles.perMonth}>/month</Text>
          </Text>
        </View>

        {/* Discount Banner */}
        <View style={styles.discountBanner}>
          <Text style={styles.discountText}>Save 50% ~ Limited Time Offer</Text>
        </View>

        {/* Plan Features */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>This Plan includes:</Text>

          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>▶</Text>
            <Text style={styles.featureText}>
              Unlimited general cardiologist appointments
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>▶</Text>
            <Text style={styles.featureText}>
              VIP Senior Cardiologist Consultations: 12 per year (Book Anytime,
              No Monthly Restriction)
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>▶</Text>
            <Text style={styles.featureText}>
              Unlimited Emergency Hospital Bookings (Direct Coordination for
              Urgent Cases)
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>▶</Text>
            <Text style={styles.featureText}>
              AI-driven preventive health risk analysis (Proactive Heart Health
              Management)
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>▶</Text>
            <Text style={styles.featureText}>
              VIP concierge service (Seamless Doctor & Hospital Coordination)
            </Text>
          </View>
        </View>

        {/* Buy Now Button */}
        <TouchableOpacity style={styles.buyNowButton} onPress={() => {handleBuyNow(9999)}}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>

        {/* Star decorations */}
        <View style={[styles.starDecoration, styles.starTopRight]}>
          <Image
            source={require("../../../../assets/Icons/Yellow_Star.png")}
            style={styles.starImage}
            resizeMode="contain"
          />
        </View>
        <View style={[styles.starDecoration, styles.starLeft]}>
          <Image
            source={require("../../../../assets/Icons/Yellow_Star.png")}
            style={styles.starImage}
            resizeMode="contain"
          />
        </View>
        <View style={[styles.starDecoration, styles.starMediLocker]}>
          <Image
            source={require("../../../../assets/Icons/Yellow_Star.png")}
            style={styles.starImage}
            resizeMode="contain"
          />
        </View>
        <View style={[styles.starDecoration, styles.starButton]}>
          <Image
            source={require("../../../../assets/Icons/Yellow_Star.png")}
            style={styles.starImage}
            resizeMode="contain"
          />
        </View>
        <View style={[styles.starDecoration, styles.starBottom]}>
          <Image
            source={require("../../../../assets/Icons/Yellow_Star.png")}
            style={styles.starImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mobileContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    position: "relative",
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
  ContentContainer: {
    paddingHorizontal: "5%",
  },
  heartLogoContainer: {
    alignItems: "center",
    marginVertical: "4%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  heartLogo: {
    width: "20%",
    aspectRatio: 1,
    tintColor: "#E53935",
  },
  starDecoration: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "8%",
    aspectRatio: 1,
  },
  starTopRight: {
    top: "5%",
    right: "4%",
  },
  starLeft: {
    top: "16%",
    left: "2%",
  },
  starMediLocker: {
    top: "80%",
    right: "8%",
  },
  starButton: {
    bottom: "6%",
    left: "8%",
  },
  starBottom: {
    bottom: "2%",
    right: "8%",
  },
  starImage: {
    width: "100%",
    height: "100%",
  },
  planTitleContainer: {
    alignItems: "flex-start",
    marginBottom: "2%",
    paddingLeft: "5%",
  },
  planTitle: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "left",
  },
  pricingContainer: {
    alignItems: "flex-start",
    marginBottom: "2%",
    paddingLeft: "5%",
  },
  originalPrice: {
    fontSize: 18,
    color: "#757575",
    textDecorationLine: "line-through",
    marginBottom: "1%",
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: "bold",
  },
  perMonth: {
    fontSize: 18,
    fontWeight: "bold",
  },
  discountBanner: {
    backgroundColor: "#25BA58",
    borderRadius: 8,
    paddingVertical: "2%",
    paddingHorizontal: "5%",
    alignItems: "center",
    marginBottom: "4%",
    marginHorizontal: "5%",
    width: "90%",
    alignSelf: "center",
  },
  discountText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
  },
  featuresContainer: {
    marginBottom: "6%",
    marginTop: "1%",
    width: "100%",
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: "3%",
  },
  featureItem: {
    flexDirection: "row",
    marginBottom: "3%",
    alignItems: "flex-start",
    width: "100%",
  },
  featureBullet: {
    fontSize: 14,
    marginRight: "2%",
    color: "#000",
  },
  featureText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
    color: "#444444",
    fontWeight: "bold",
    fontFamily:"Roboto",
  },
  buyNowButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 8,
    paddingVertical: "3%",
    alignItems: "center",
    marginHorizontal: "5%",
    marginBottom: "5%",
    width: "90%",
    alignSelf: "center",
  },
  buyNowText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PlatinumPlan;