import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ThemedView from "../../components/ThemedView";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";

const Books = () => {
	return (
		<ThemedView safe style={styles.container}>
			<ThemedText title style={styles.title}>
				Your reading list
			</ThemedText>
			<Spacer />
		</ThemedView>
	);
};

export default Books;

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
