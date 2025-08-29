import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView,
  ImageBackground, 
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutUsWhat = ({ navigation }) => {
  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
      <ImageBackground
        source={require("../../../assets/Images/HeartImage.jpg")}
        style={styles.imageBackground}
      >
        <SafeAreaView style={styles.container}>
          
          {/* Header with back button */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Title */}
            <Text style={styles.title}>What is{'\n'}Kokoro.Doctor?</Text>
            
            {/* Description */}
            <Text style={styles.description}>
              Kokoro.Doctor is an AI-powered heart health assistant designed to make cardiac care accessible, efficient, and affordable for everyone.
            </Text>
            
            {/* Feature Grid */}
            <View style={styles.featureGrid}>
              {/* Left Column */}
              <View style={styles.featureColumn}>
                <View style={[styles.featureBoxLarge, { backgroundColor: '#FDA2A4' }]}>
                  <Text style={styles.featureText}>Instant AI heart risk assessment</Text>
                </View>
                <View style={[styles.featureBoxSmall, { backgroundColor: '#AABFFF' }]}>
                  <Text style={styles.featureText}>A secure digital health locker (MediLocker)</Text>
                </View>
              </View>

              {/* Right Column */}
              <View style={styles.featureColumn}>
                <View style={[styles.featureBoxSmall, { backgroundColor: '#CBABEA' }]}>
                  <Text style={styles.featureText}>Seamless access to senior cardiologists near you</Text>
                </View>
                <View style={[styles.featureBoxLarge, { backgroundColor: '#8BC9A0' }]}>
                  <Text style={styles.featureText}>Emergency alerts for high-risk cases</Text>
                </View>
              </View>
            </View>
            
            {/* Footer Text */}
            <View style={styles.footer}>
            <Text style={styles.footerText}>
              Built on innovation from Harvard Innovation Labs I-Member, Kokoro.Doctor combines advanced AI and expert medical insights to provide fast, reliable, and personalized heart health guidance.
            </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1, // Ensure it takes up the full screen
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
  },
  imageBackground: {
    flex: 1,  // Ensures it expands
    width: "100%",
    height: "100%",
    justifyContent: "center",
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    //backgroundColor: 'transparent', 
    backgroundColor: 'white',
  },
  
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 0,
    marginLeft:"2%",
    marginRight:"2%",
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: "1%",
    marginBottom: "1%",
    lineHeight: 44,
    //fontWeight: '600',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: "1%",
    marginTop:"1%",
  },
  featureGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 24,
  },
  featureColumn: {
    width: '48%',
  },
  featureBoxLarge: {
    minHeight: "30%",  // Let the content decide height
    padding: 16,
    borderRadius: 16,
    justifyContent: 'center',
    marginBottom: 10, // Reduce spacing
  },
  featureBoxSmall: {
    minHeight: "40%",  // Let the content decide height
    padding: 16,
    borderRadius: 16,
    justifyContent: 'center',
    marginBottom: 10, // Reduce spacing
  },
  footer: {
    alignItems:"flex-start",
   // width:"100%",
    //marginTop: 10, // Adjust footer spacing
    //marginBottom: 20, // Ensure proper bottom padding
  },
  featureText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  footerText: {
    fontSize: 16,
    //lineHeight: 24,
    color: '#333',
   // marginTop:"1%",
  },
});

export default AboutUsWhat;