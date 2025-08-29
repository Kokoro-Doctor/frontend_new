import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import StarRatingComponent from "../../../../components/PatientScreenComponents/DoctorComponents/StarRatingComponent";

import DoctorReviewThankYou from "../../../../components/PatientScreenComponents/DoctorComponents/DoctorReviewThankYou"


const DoctorReviewScreen = ({navigation}) => {
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showThank , setShowThanks] = useState(false)
  
  const { width , height } = useWindowDimensions(); 

  //Doctor can be fetched from backend or the previous screen using route.params
  const doctor =  {
    name: "Dr. Kislay Shrivasatva",
    specialization: "Cardiologist",
    rating: 4.2,
    reviewCount: 5000,
    profileImage: require('../../../../assets/Images/dr_kislay.jpg'),
  }

  const handleRating = (value) => {
    setUserRating(value);
  };

  const handleSubmit = () => {
    if (userRating == 0) {
      Alert.alert("Error", "Please provide rating.");
      return;
    }
    if (comment.trim() === "") {
      Alert.alert("Error", "Please provide comment.");
      return;
    }

    const reviewData = {
      doctorName: doctor.name,
      userRating,
      comment,
    };

    //Integrate backend API function here for submitting review

    console.log("Submitting Review:", reviewData);
    setShowThanks(true);

    setUserRating(0);
    setComment("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Image source={doctor.profileImage} style={styles.profileImage} />
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.specialty}>({doctor.specialization})</Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{doctor.rating}</Text>
          <View>
          <StarRatingComponent rating={doctor.rating} size={12}/>
          <Text style={styles.reviewText}>({doctor.reviewCount}) Reviews</Text>
          </View>
        </View>

        <Text style={styles.ratePrompt}>Rate this Doctor</Text>

        <View style={styles.starRow}>
          {[...Array(5)].map(( _ , i) => (
            <TouchableOpacity key={i} onPress={() => handleRating(i+1)}>
              <FontAwesome
                name={i < userRating ? "star" : "star-o"}
                size={52}
                color={i < userRating ? "#FFD700" : "#ccc"}
                style={styles.starIcon}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          placeholder="Please Live your Comment here"
          value={comment}
          onChangeText={setComment}
          multiline
          style={[styles.commentBox , { width:320 , marginBottom : 0.2 * height}]}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>

        <DoctorReviewThankYou visible={showThank} onClose={() => setShowThanks(false)}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorReviewScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    marginTop: 20,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  specialty: {
    fontSize: 16,
    color: "#444",
    fontWeight: "bold",
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    height : 100,
    gap : 10,
    alignItems: "stretch",

  },
  ratingText: {
    fontSize: 28,
    fontWeight: "bold",
    marginRight: 5,
  },
  stars: {
    flexDirection: "row",
    marginRight: 5,
  },
  reviewText: {
    fontSize: 14,
    color: "#555",
  },
  ratePrompt: {
    fontSize: 25,
    fontWeight: "500",
    marginBottom: 50,
  },
  starRow: {
    flexDirection: "row",
    marginBottom: 30,
    gap : 5
  },
  starIcon: {
    marginHorizontal: 4,
  },
  commentBox: {
   
    minHeight: 100,
    backgroundColor: "#f6f6f6",
    borderRadius: 6,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 16,
    //marginBottom: 180,
  },
  submitButton: {
    width : 300,
    height : 50,
    backgroundColor: "#ff6f6f",
    flexDirection : "row",
    justifyContent : "center",
    alignItems : "center",
    borderRadius: 10,
  },
  submitText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});
