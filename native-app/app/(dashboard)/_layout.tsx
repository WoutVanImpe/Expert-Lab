import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const DashboardLayout = () => {
	const colorScheme = useColorScheme();
	const theme = colorScheme != null ? Colors[colorScheme] : Colors.light;

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: theme.navBackground,
				},
				tabBarActiveTintColor: theme.iconColorFocused,
				tabBarInactiveTintColor: theme.iconColor,
			}}
		>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ focused }) => {
						return <Ionicons size={24} name={focused ? "person" : "person-outline"} color={focused ? theme.iconColorFocused : theme.iconColor} />;
					},
				}}
			/>
			<Tabs.Screen
				name="create"
				options={{
					title: "Create",
					tabBarIcon: ({ focused }) => {
						return <Ionicons size={24} name={focused ? "create" : "create-outline"} color={focused ? theme.iconColorFocused : theme.iconColor} />;
					},
				}}
			/>
			<Tabs.Screen
				name="books"
				options={{
					title: "Books",
					tabBarIcon: ({ focused }) => {
						return <Ionicons size={24} name={focused ? "book" : "book-outline"} color={focused ? theme.iconColorFocused : theme.iconColor} />;
					},
				}}
			/>
		</Tabs>
	);
};

export default DashboardLayout;
