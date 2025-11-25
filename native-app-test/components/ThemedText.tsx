import { Text, type TextProps, useColorScheme } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

type ThemedTextProps = TextProps & {
	title?: boolean;
};

const ThemedText = ({ style, title = false, children, ...props }: ThemedTextProps) => {
	const colorScheme = useColorScheme();
	const theme = colorScheme != null ? Colors[colorScheme] : Colors.light;

	return (
		<Text style={[{ color: title ? theme.title : theme.text }, style]} {...props}>
			{children}
		</Text>
	);
};

export default ThemedText;
