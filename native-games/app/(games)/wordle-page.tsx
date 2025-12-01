import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ThemedView from "../../components/ThemedView";
import MineSweeper from "../../components/games/MineSweeper";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";
import ThemedText from "../../components/ThemedText";

const Wordle = () => {
	const [gameState, setGameState] = useState<boolean>(false);

	const startGame = () => {
		setGameState(true);
	};

	return (
		<ThemedView safe style={styles.container}>
			<ThemedText title style={styles.title}>
				Worlde
			</ThemedText>
			<Spacer />
			{!gameState ? (
				<ThemedButton onPress={startGame}>
					<Text style={{ color: "#f2f2f2" }}>Start Game</Text>
				</ThemedButton>
			) : (
				<MineSweeper />
			)}
		</ThemedView>
	);
};

export default Wordle;

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