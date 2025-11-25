import { StyleSheet } from "react-native";
import React from "react";
import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import ThemedLink from "../components/ThemedLink";

const About = () => {
	return (
		<ThemedView style={styles.container}>
			<ThemedText title style={styles.title}>
				About
			</ThemedText>
			<ThemedLink href="/">Home</ThemedLink>
		</ThemedView>
	);
};

export default About;

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
