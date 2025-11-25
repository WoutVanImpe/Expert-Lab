import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const AuthLayout = () => {
	return (
		<>
			<StatusBar style="auto" />
			<Stack screenOptions={{ headerShown: false, animation: "none" }} />
		</>
	);
};

export default AuthLayout;
