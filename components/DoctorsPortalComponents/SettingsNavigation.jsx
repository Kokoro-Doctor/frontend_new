import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Platform, Pressable, useWindowDimensions } from "react-native";

const SettingsNavigation = ({ navigation, closeSettings }) => {
  const { width } = useWindowDimensions();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const settingsMenuItems = [
    { name: "Profile Setting", icon: require("../../assets/DoctorsPortal/Icons/user.png"), route: "ProfileSetting" },
    { name: "Language preference", icon: require("../../assets/DoctorsPortal/Icons/language.png"), route: "LanguagePreference" },
    { name: "Theme", icon: require("../../assets/DoctorsPortal/Icons/paint-brush.png"), route: "ThemeSettings" },
    { name: "Account", icon: require("../../assets/DoctorsPortal/Icons/account.png"), route: "AccountSettings" },
    { name: "Notification", icon: require("../../assets/DoctorsPortal/Icons/bell.png"), route: "NotificationSettings" },
  ];

  // Initialize selected item based on current route
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const state = navigation.getState();
      if (state) {
        const currentRoute = state.routes[state.index].name;
        const menuItem = settingsMenuItems.find(item => item.route === currentRoute);
        setSelectedItem(menuItem ? menuItem.name : "Profile Setting");
      }
      setIsReady(true);
    });

    return unsubscribe;
  }, [navigation]);

  const handleSettingsClick = (menu) => {
    const menuItem = settingsMenuItems.find(item => item.name === menu);
    if (menuItem) {
      setSelectedItem(menu);
      navigation.navigate(menuItem.route);
    }
  };

  if (!isReady) {
    return null; // Or a loading indicator
  }

  return (
    <View style={styles.settings_content}>
      <View style={styles.top_settings}>
        <Text style={styles.settingsTitle}>Settings</Text>
        {(Platform.OS !== 'web' || width < 900) && (
          <Pressable onPress={closeSettings}>
            <MaterialIcons name="arrow-back" size={24} color="grey" />
          </Pressable>
        )}
      </View>
      
      <View style={styles.settings_menu}>
        {settingsMenuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.6}
            style={[
              styles.menuItemContainer,
              selectedItem === item.name && styles.selectedMenuItem,
            ]}
            onPress={() => handleSettingsClick(item.name)}
          >
            <Image 
              source={item.icon} 
              style={[
                styles.menuIcon,
                selectedItem === item.name && { tintColor: "#ffffff" }
              ]} 
            />
            <Text style={[
              styles.menuText,
              selectedItem === item.name && styles.selectedMenuText,
            ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settings_content: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingVertical: 20,
  },
  top_settings: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    marginBottom: 30,
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "000000",
  },
  settings_menu: {
    flex: 1,
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 8,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
    resizeMode: "contain",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  selectedMenuItem: {
    backgroundColor: "#FF7072",
  },
  selectedMenuText: {
    color: "#ffffff",
  },
});

export default SettingsNavigation;