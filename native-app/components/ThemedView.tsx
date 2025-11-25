import { View, Text, useColorScheme, type ViewProps } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

const ThemedView = ({ style, children, ...props }: ViewProps) => {
	const colorScheme = useColorScheme();
	const theme = colorScheme != null ? Colors[colorScheme] : Colors.light;

	return (
		<View style={[{ backgroundColor: theme.background }, style]} {...props}>
			{children}
		</View>
	);
};

export default ThemedView;
