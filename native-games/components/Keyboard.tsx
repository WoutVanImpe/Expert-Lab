import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

interface KeyboardProps {
	onKeyPressed: (key: string) => void;
	green: string[];
	yellow: string[];
	dark: string[];
}

const keys = [
	["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
	["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
	["ENTER", "W", "X", "C", "V", "B", "N", "⌫"],
];

const Keyboard = ({ onKeyPressed, green, yellow, dark }: KeyboardProps) => {
	const [greenLetters, setGreenLetters] = useState<string[]>([]);
	const [yellowLetters, setYellowLetters] = useState<string[]>([]);
	const [darkLetters, setDarkLetters] = useState<string[]>([]);

	useEffect(() => {
		setGreenLetters(green);
		setYellowLetters(yellow);
		setDarkLetters(dark);
	}, [green, yellow, dark]);

	return (
		<View style={styles.keyboardContainer}>
			{keys.map((row, rowIndex) => (
				<View key={rowIndex} style={styles.row}>
					{row.map((key) => {
						const isSpecialKey = key.length > 1;

						return (
							<TouchableOpacity
								key={key}
								onPress={() => onKeyPressed(key)}
								style={[styles.key, isSpecialKey && styles.specialKey, darkLetters.includes(key) && styles.dark, yellowLetters.includes(key) && styles.yellow, greenLetters.includes(key) && styles.green]}
							>
								<Text style={[styles.keyText, isSpecialKey && { color: "#f2f2f2" }]}>{key}</Text>
							</TouchableOpacity>
						);
					})}
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	keyboardContainer: {
		alignItems: "center",
		marginTop: "auto",
		paddingBottom: 10,
		paddingHorizontal: 5,
	},
	row: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: 8,
		width: "100%",
	},
	key: {
		backgroundColor: "#d3d6da",
		marginHorizontal: 3,
		height: 55,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
		flex: 1,
		maxWidth: 45,
	},
	specialKey: {
		flex: 1.5,
		minWidth: 50,
		maxWidth: 70,
		backgroundColor: Colors.primary,
	},
	keyText: {
		fontWeight: "bold",
		fontSize: 14,
		color: "black",
	},
	green: {
		backgroundColor: "#6aaa64",
	},
	yellow: {
		backgroundColor: "#c9b458",
	},
	dark: {
		backgroundColor: "#787c7e",
	},
});

export default Keyboard;
