import { StyleSheet, Text } from "react-native";
import React from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedLink from "../../components/ThemedLink";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";

const Login = () => {
	const handleSubmit = () => {
		console.log("Login form Submitted");
	};

	return (
		<ThemedView safe style={styles.container}>
			<ThemedText title style={styles.title}>
				Login to an account
			</ThemedText>
			<Spacer />
			<ThemedButton onPress={handleSubmit}>
				<Text style={{ color: "#f2f2f2" }}>Login</Text>
			</ThemedButton>

			<Spacer />
			<ThemedLink href="/register">Register instead</ThemedLink>
		</ThemedView>
	);
};

export default Login;

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
