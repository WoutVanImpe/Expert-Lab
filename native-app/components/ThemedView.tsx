import { View, useColorScheme, type ViewProps } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ThemedViewProps = ViewProps & {
	safe?: boolean;
};

const ThemedView = ({ style, children, safe = false, ...props }: ThemedViewProps) => {
	const colorScheme = useColorScheme();
	const theme = colorScheme != null ? Colors[colorScheme] : Colors.light;

	if (!safe) {
		return (
			<View style={[{ backgroundColor: theme.background }, style]} {...props}>
				{children}
			</View>
		);
	}

	const insets = useSafeAreaInsets();

	return (
		<View style={[{ backgroundColor: theme.background, paddingTop: insets.top, paddingBottom: insets.bottom }, style]} {...props}>
			{children}
		</View>
	);
};

export default ThemedView;
