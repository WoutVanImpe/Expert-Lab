import { Text, useColorScheme } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import { Link, type LinkProps } from "expo-router";

const ThemedLink = ({ style, href, children, ...props }: LinkProps) => {
    const colorScheme = useColorScheme();
    const theme = colorScheme != null ? Colors[colorScheme] : Colors.light;

    return (
        <Link href={href} style={[{ color: theme.text }, style]} {...props}>
            {children}
        </Link>
    );
};

export default ThemedLink;