import { View, Text, useColorScheme } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../constants/Colors";

const RootLayout = () => {
	const colorSheme = useColorScheme();
	const theme = Colors[colorSheme!] ?? Colors.light;

	return (
		<>
			<StatusBar style="auto" />
			<Stack
				screenOptions={{
					headerStyle: { backgroundColor: theme.navBackground },
					headerTintColor: theme.title,
					headerShown: false,
				}}
			/>
		</>
	);
};

export default RootLayout;
