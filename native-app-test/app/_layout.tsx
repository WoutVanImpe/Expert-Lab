import { StyleSheet, Text, useColorScheme, View } from "react-native";
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
				}}
			>
				<Stack.Screen name="index" options={{ title: "Home" }} />
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				<Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
			</Stack>
		</>
	);
};

export default RootLayout;

const styles = StyleSheet.create({});
