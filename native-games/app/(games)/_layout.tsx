import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const GamesLayout = () => {
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
				name="minesweeper-page"
				options={{
					title: "Mine Sweeper",
					tabBarIcon: ({ focused }) => {
						return <Ionicons size={24} name={focused ? "stop-circle" : "stop-circle-outline"} color={focused ? theme.iconColorFocused : theme.iconColor} />;
					},
				}}
			/>
			<Tabs.Screen
				name="wordle-page"
				options={{
					title: "Wordle",
					tabBarIcon: ({ focused }) => {
						return <Ionicons size={24} name={focused ? "at-circle" : "at-circle-outline"} color={focused ? theme.iconColorFocused : theme.iconColor} />;
					},
				}}
			/>
		</Tabs>
	);
};

export default GamesLayout;
