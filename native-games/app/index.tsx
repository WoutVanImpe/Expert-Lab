import { StyleSheet, Text } from "react-native";
import React from "react";
import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import Spacer from "../components/Spacer";
import { Link } from "expo-router";
import { Colors } from "../constants/Colors";

const Home = () => {
	return (
		<ThemedView safe style={styles.container}>
			<ThemedText title style={styles.title}>
				Welcome to Native Games
			</ThemedText>
			<Spacer height={20} />
			<Link href="/minesweeper-page" style={[styles.btn, { color: "#f2f2f2" }]}>
				Play Games
			</Link>
		</ThemedView>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontWeight: "bold",
		fontSize: 20,
	},
	btn: {
		backgroundColor: Colors.primary,
		padding: 10,
		borderRadius: 5,
	},
});
