import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";

const Profile = () => {
	return (
		<ThemedView safe style={styles.container}>
			<ThemedText title style={styles.title}>
				Your email
			</ThemedText>
			<Spacer />
			<ThemedText>Time to start reading some books...</ThemedText>
		</ThemedView>
	);
};

export default Profile;

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
