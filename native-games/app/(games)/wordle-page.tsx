import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ThemedView from "../../components/ThemedView";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";
import ThemedText from "../../components/ThemedText";
import Worlde from "../../components/games/Worlde";

const WordlePage = () => {
	const [gameState, setGameState] = useState<boolean>(false);

	const startGame = () => {
		setGameState(true);
	};

	return (
		<ThemedView safe style={styles.container}>
			<ThemedText title style={styles.title}>
				Worlde
			</ThemedText>

			{!gameState ? (
				<>
					<Spacer />
					<ThemedButton onPress={startGame}>
						<Text style={{ color: "#f2f2f2" }}>Start Game</Text>
					</ThemedButton>
				</>
			) : (
				<Worlde setGameState={setGameState} />
			)}
		</ThemedView>
	);
};

export default WordlePage;

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
