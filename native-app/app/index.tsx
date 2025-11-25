import { StyleSheet } from "react-native";
import React from "react";
import ThemedView from "../components/ThemedView";
import ThemedLink from "../components/ThemedLink";
import ThemedText from "../components/ThemedText";
import Spacer from "../components/Spacer";

const Home = () => {
	return (
		<ThemedView style={styles.container}>
			<ThemedText title style={styles.title}>
				Home
			</ThemedText>
			<Spacer />
			<ThemedLink href="/login">Login page</ThemedLink>
			<Spacer height={5} />
			<ThemedLink href="/register">Register page</ThemedLink>
			<Spacer height={5} />
			<ThemedLink href="/profile">Profile page</ThemedLink>
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
