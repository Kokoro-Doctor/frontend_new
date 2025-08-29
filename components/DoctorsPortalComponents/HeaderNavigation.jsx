import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Platform,
	useWindowDimensions,
} from "react-native";

const HeaderNavigation = ({ navigation, activeTab, onTabChange }) => {
	const { width } = useWindowDimensions();
	const [selectedTab, setSelectedTab] = useState("Edit Personal Information");
	const [isReady, setIsReady] = useState(false);

	const navigationTabs = [
		{ name: "Edit Personal Information", route: "ProfileSetting" },
		{ name: "Medical proof", route: "MedicalProof" },
		{ name: "Establishment timmings", route: "EstablishmentTimings" },
		{ name: "Subscriber fees", route: "SubscriberFees" },
	];

	// Initialize selected tab based on current route
	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			const state = navigation.getState();
			if (state) {
				const currentRoute = state.routes[state.index].name;
				const tabItem = navigationTabs.find(
					(item) => item.route === currentRoute
				);
				if (tabItem) {
					setSelectedTab(tabItem.name);
					if (onTabChange) {
						onTabChange(tabItem.name);
					}
				}
			}
			setIsReady(true);
		});

		return unsubscribe;
	}, [navigation]);

	const handleTabPress = (tabName) => {
		const tabItem = navigationTabs.find((item) => item.name === tabName);
		if (tabItem) {
			setSelectedTab(tabName);
			if (onTabChange) {
				onTabChange(tabName);
			}
			navigation.navigate(tabItem.route);
		}
	};

	if (!isReady) {
		return null; // Or a loading indicator
	}

	return (
		<View style={styles.container}>
			<View style={styles.tabsContainer}>
				{navigationTabs.map((tab, index) => (
					<TouchableOpacity
						key={index}
						activeOpacity={0.7}
						style={[
							styles.tabItem,
							selectedTab === tab.name && styles.selectedTabItem,
							index === navigationTabs.length - 1 && styles.lastTabItem,
						]}
						onPress={() => handleTabPress(tab.name)}>
						<Text
							style={[
								styles.tabText,
								selectedTab === tab.name && styles.selectedTabText,
							]}>
							{tab.name}
						</Text>
						{selectedTab === tab.name && (
							<View style={styles.activeIndicator} />
						)}
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		backgroundColor: "#FFFFFF",
		marginBottom: 20,
	},
	tabsContainer: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "#E0E0E0",
	},
	tabItem: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		position: "relative",
	},
	lastTabItem: {
		borderRightWidth: 0,
	},
	selectedTabItem: {
		borderBottomWidth: 0,
	},
	tabText: {
		fontSize: 14,
		color: "#666666",
	},
	selectedTabText: {
		color: "#FF7072",
		fontWeight: "500",
	},
	activeIndicator: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 2,
		backgroundColor: "#FF7072",
	},
});

export default HeaderNavigation;
