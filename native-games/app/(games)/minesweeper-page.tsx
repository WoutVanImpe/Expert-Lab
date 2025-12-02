import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";
import MineSweeper from "../../components/games/MineSweeper";

const MinesweeperPage = () => {
	const [gameState, setGameState] = useState<boolean>(false);

	const startGame = () => {
		setGameState(true);
	};

	return (
		<ThemedView safe style={styles.container}>
			<ThemedText title style={styles.title}>
				Minesweeper
			</ThemedText>
			<Spacer />
			{!gameState ? (
				<ThemedButton onPress={startGame}>
					<Text style={{ color: "#f2f2f2" }}>Start Game</Text>
				</ThemedButton>
			) : (
				<MineSweeper setGameState={setGameState} />
			)}
		</ThemedView>
	);
};

export default MinesweeperPage;

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
