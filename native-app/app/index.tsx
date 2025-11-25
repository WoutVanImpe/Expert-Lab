import { StyleSheet } from "react-native";
import React from "react";
import ThemedView from "../components/ThemedView";
import ThemedLink from "../components/ThemedLink";
import ThemedText from "../components/ThemedText";

const Home = () => {
	return (
		<ThemedView style={styles.container}>
			<ThemedText title style={styles.title}>Home</ThemedText>
			<ThemedLink href="/about">About</ThemedLink>
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
});
