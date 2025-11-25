import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";

const Create = () => {
	return (
		<ThemedView safe style={styles.container}>
			<ThemedText title style={styles.title}>
				Add a new book
			</ThemedText>
			<Spacer />
		</ThemedView>
	);
};

export default Create;

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
