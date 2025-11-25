import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedLink from "../../components/ThemedLink";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";

const Register = () => {
	const handleSubmit = () => {
		console.log("Register form Submitted");
	};

	return (
		<ThemedView style={styles.container}>
			<ThemedText title style={styles.title}>
				Register an account
			</ThemedText>
			<Spacer />
			<ThemedButton onPress={handleSubmit}>
				<Text style={{ color: "#f2f2f2" }}>Register</Text>
			</ThemedButton>

			<Spacer />
			<ThemedLink href="/login">Login instead</ThemedLink>
		</ThemedView>
	);
};

export default Register;

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
