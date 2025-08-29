import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const StarRatingComponent = ({ rating, size = 24}) => {
  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;

  return (
    <View style={styles.starContainer}>
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          // Full Star
          return (
            <FontAwesome key={i} name="star" size={size} color="#FFD700" style={styles.star} />
          );
        } else if (i === fullStars && decimal > 0) {
          // Partially filled star with % width
          return (
            <View key={i} style={{ position: 'relative', width: size, height: size }}>
              <FontAwesome name="star-o" size={size} color="#ccc" />
              <View
                style={{
                  position: 'absolute',
                  width: size * decimal,
                  height: size,
                  overflow: 'hidden',
                }}
              >
                <FontAwesome name="star" size={size} color="#FFD700" />
              </View>
            </View>
          );
        } else {
          // Empty Star
          return (
            <FontAwesome key={i} name="star-o" size={size} color="#ccc" style={styles.star} />
          );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7
  },
  star: {
    marginHorizontal: 2,
  },
});

export default StarRatingComponent;
