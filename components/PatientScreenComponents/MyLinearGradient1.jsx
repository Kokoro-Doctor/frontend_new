import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
const MyLinearGradient = ({ children, style }) => {
  return (
    
    <LinearGradient
      colors={['rgba(255, 255, 255, 1)', 'rgba(138, 112, 255, 1)']} 
      start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 0 }}   
      style={style}
    >
      {children}
    </LinearGradient>
    
  );
};

export default MyLinearGradient;