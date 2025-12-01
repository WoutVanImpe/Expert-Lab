import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

type ThemedButtonProps = PressableProps & {
	style?: StyleProp<ViewStyle>;
};

const ThemedButton = ({ style, ...props }: ThemedButtonProps) => {
	return <Pressable style={({ pressed }) => [styles.btn, pressed && styles.pressed, style]} {...props} />;
};

export default ThemedButton;

const styles = StyleSheet.create({
	btn: {
		backgroundColor: Colors.primary,
		padding: 10,
		borderRadius: 5,
	},
	pressed: {
		opacity: 0.8,
	},
});
