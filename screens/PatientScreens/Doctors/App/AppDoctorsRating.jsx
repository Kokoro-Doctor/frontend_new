import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useWindowDimensions,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AppDoctorsRating = ({navigation}) => {
  // Sample doctor data
  const doctorData = {
    name: "Kislay Shrivasatva",
    specialization: "Cardiologist",
    rating: 4.9,
    reviewCount: 5000,
    profileImage: require('../../../../assets/Images/dr_kislay.jpg'),
    reviews: [
      {
        id: 1,
        reviewer: "User Name",
        rating: 5,
        text: "Very Good Doctor",
        userImage: require('../../../../assets/Images/user-icon.jpg')
      },
      {
        id: 2,
        reviewer: "User Name",
        rating: 4,
        text: "Very Good Doctor",
        userImage: require('../../../../assets/Images/user-icon.jpg')
      },
      {
        id: 3,
        reviewer: "User Name",
        rating: 5,
        text: "Very Good Doctor",
        userImage: require('../../../../assets/Images/user-icon.jpg')
      }
    ]
  };

  // Star rating component
  const RenderStars = ({ rating, starSize = 20 }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <View style={{ flexDirection: 'row' }}>
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <Ionicons name="star" size={starSize} color="#FFD700" key={i} />;
          } else if (i === fullStars && hasHalfStar) {
            return <Ionicons name="star-half" size={starSize} color="#FFD700" key={i} />;
          } else {
            return <Ionicons name="star-outline" size={starSize} color="#FFD700" key={i} />;
          }
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={styles.container.backgroundColor} />
      <ScrollView contentContainerStyle={{paddingHorizontal:16, marginTop: 35}}>
        {/* Doctor Profile Section */}
        <View style={styles.doctorProfileContainer}>
          <Image source={doctorData.profileImage} style={styles.doctorImage} />
          <Text style={styles.doctorName}>Dr {doctorData.name}</Text>
          <Text style={styles.doctorSpecialization}>({doctorData.specialization})</Text>
        </View>
        
        {/* Rating & Reviews Header */}
        <Text style={styles.reviewsHeader}>Rating & Reviews</Text>
        
        {/* Rating Row */}
        {/* Rating Row */}
      <View style={styles.ratingRow}>
        {/* Stars + Rating Details */}
        <View style={styles.ratingBlock}>
          <RenderStars rating={doctorData.rating} starSize={20} />
          <Text style={styles.ratingDetails}>
            {doctorData.rating} ({doctorData.reviewCount}) Reviews
          </Text>
        </View>

        {/* Add Review Button - This stays on the right */}
        <TouchableOpacity style={styles.addReviewButton} onPress={() => navigation.navigate("DoctorReviewScreen" , {doctor : doctorData})}>
          <Text style={styles.addReviewButtonText}>+ Add Review</Text>
        </TouchableOpacity>
      </View>

        {/* User Reviews List */}
        {doctorData.reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewContent}>
              <Image source={review.userImage} style={styles.userImage} />
              <View style={styles.reviewDetails}>
                <View style={styles.reviewRating}>
                  <RenderStars rating={review.rating} starSize={16} />
                </View>
                <Text style={styles.reviewerName}>{review.reviewer}</Text>
                <Text style={styles.reviewText}>{review.text}</Text>
              </View>
            </View>
          </View>
        ))}
        
        {/* Book Appointment Button */}
        <TouchableOpacity style={styles.bookButton} onPress={() => {navigation.navigate("DoctorsSubscriptionPaymentScreen")}}>
          <Text style={styles.bookButtonText}>Subscribe</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: 16,
  },
  doctorProfileContainer: {
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: 24,
    paddingHorizontal:16,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  doctorSpecialization: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  reviewsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  /* Rating Row Styles */
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:8,
  },
  ratingStars: {
    marginBottom: 4,
  },
  ratingTextContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  ratingNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingCount: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 2,
  },
  reviewsText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 2,
  },
  addReviewButton: {
    backgroundColor: '#FF7072',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight:25,
  },
  addReviewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  reviewCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom: 10,
    marginHorizontal:16,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',  // Ensures content aligns to the top
    width: "100%", 
  },
  userImage: {
    width:"25%",
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  reviewDetails: {
    width: "75%",
    justifyContent: 'center',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14,
    color: '#000000',
    flexWrap:'wrap'
  },
  bookButton: {
    backgroundColor: '#FF7072',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal:"auto",
    width: "70%",
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingBlock: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingDetails: {
    fontSize: 14,
    color: '#000000',
    marginTop: 4,
    fontWeight: '500',
  },
});

export default AppDoctorsRating;