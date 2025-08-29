import React, { useState, forwardRef, useImperativeHandle, ForwardRefRenderFunction } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Keyboard, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = (props, ref) => {
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  useImperativeHandle(ref, () => ({
    blur: handleBlur
  }));

  return (
    <TouchableOpacity 
      style={styles.searchContainer} 
      onPress={handleFocus}
      activeOpacity={1}
    >
      <Icon name="search" size={24} color="#1E1F2E" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#646669"
        value={searchText}
        onChangeText={text => setSearchText(text)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#d4d6d5",
    paddingHorizontal: 10,
    width: "90%",
    marginHorizontal:"auto",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    height: 40,
    color: '#000',
    flex: 1,  // Ensure the TextInput takes the remaining space
    ...Platform.select({
      web:{
          outlineStyle: 'none',
          borderWidth: 0,
      }
  }),
  },
});

export default forwardRef(SearchBar);
