import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Alert, View } from "react-native";
import { faker } from "@faker-js/faker";
import Keyboard from "../Keyboard";
import Spacer from "../Spacer";
import { fiveLetterWords } from "../../constants/FiveLetterWords";
import ThemedButton from "../ThemedButton";

const CONFIG = {
	rows: 6,
	cols: 5,
	cellSize: 50,
	gap: 5,
};

type CellData = {
	id: number;
	row: number;
	col: number;
	letter: string;
	status: CellStatus;
};
interface GameProps {
	setGameState: React.Dispatch<React.SetStateAction<boolean>>;
}

type CellStatus = "idle" | "correct" | "present" | "absent";

const Worlde = ({ setGameState }: GameProps) => {
	const [secretWord, setSecretWord] = useState<string[]>([]);

	const [gameOver, setGameOver] = useState<boolean>(false);

	const [greenLetters, setGreenLetters] = useState<string[]>([]);
	const [yellowLetters, setYellowLetters] = useState<string[]>([]);
	const [darkLetters, setDarkLetters] = useState<string[]>([]);

	const [gridData, setGridData] = useState(() => {
		const totalCells = CONFIG.rows * CONFIG.cols;

		const data = Array.from({ length: totalCells }, (_, index) => {
			return {
				id: index,
				row: Math.floor(index / CONFIG.cols),
				col: index % CONFIG.cols,
				letter: "",
				status: "idle",
			};
		});

		return data;
	});

	const [currentRow, setCurrentRow] = useState(0);
	const [currentCol, setCurrentCol] = useState(0);

	const boardWidth = CONFIG.cols * (CONFIG.cellSize + CONFIG.gap);

	useEffect(() => {
		const word = createRandomWord();
		setSecretWord(word.toUpperCase().split(""));
	}, []);

	const createRandomWord = () => {
		const wordAmount = fiveLetterWords.length;
		let word = fiveLetterWords[Math.floor(Math.random() * wordAmount)];
		return word;
	};

	const handleTyping = (key: string) => {
		if (currentRow >= CONFIG.rows) return;

		if (key === "⌫") {
			if (currentCol > 0) {
				const prevCol = currentCol - 1;
				const index = currentRow * CONFIG.cols + prevCol;

				const newGrid = [...gridData];
				newGrid[index].letter = "";
				setGridData(newGrid);

				setCurrentCol(prevCol);
			}
			return;
		}

		if (key === "ENTER") {
			if (currentCol === 5) {
				const startIdx = currentRow * CONFIG.cols;
				const guessedWord = [0, 1, 2, 3, 4]
					.map((i) => gridData[startIdx + i].letter)
					.join("")
					.toLowerCase();

				if (fiveLetterWords.includes(guessedWord)) {
					checkGuess();
				} else {
					Alert.alert("Niet gevonden", "Dit woord staat niet in de lijst!");
				}
			} else {
				Alert.alert("Te kort", "Vul 5 letters in.");
			}
			return;
		}

		if (currentCol < 5) {
			const index = currentRow * CONFIG.cols + currentCol;

			const newGrid = [...gridData];
			newGrid[index].letter = key;
			setGridData(newGrid);

			setCurrentCol(currentCol + 1);
		}
	};

	const checkGuess = () => {
		const newGrid = [...gridData];
		const startIdx = currentRow * CONFIG.cols;
		const currentGuessIndices = [0, 1, 2, 3, 4].map((i) => startIdx + i);

		const secretCopy = [...secretWord];
		const guessLetters = currentGuessIndices.map((i) => newGrid[i].letter);

		guessLetters.forEach((letter, i) => {
			const gridIndex = currentGuessIndices[i];

			if (letter === secretCopy[i]) {
				newGrid[gridIndex].status = "correct";
				secretCopy[i] = "";
				guessLetters[i] = "";
				setGreenLetters((prev) => [...prev, letter]);
				setYellowLetters((prev) => {
					return prev.filter((item) => item != letter);
				});
			}
		});

		guessLetters.forEach((letter, i) => {
			if (letter === "") return;

			const gridIndex = currentGuessIndices[i];
			const foundIndex = secretCopy.indexOf(letter);

			if (foundIndex !== -1) {
				newGrid[gridIndex].status = "present";
				secretCopy[foundIndex] = "";
				setYellowLetters((prev) => [...prev, letter]);
			} else {
				newGrid[gridIndex].status = "absent";
				setDarkLetters((prev) => [...prev, letter]);
			}
		});

		setGridData(newGrid);

		const isWin = currentGuessIndices.every((i) => newGrid[i].status === "correct");
		if (isWin) {
			setTimeout(() => Alert.alert("Gewonnen!", "Gefeliciteerd"), 100);
		}

		if (currentRow + 1 === CONFIG.rows) {
			endGame();
		}
		setCurrentRow(currentRow + 1);

		setCurrentCol(0);
	};

	const endGame = () => {
		setTimeout(() => Alert.alert("Volgende keer beter!", `Het woord was "${secretWord.join("").toLowerCase()}"`), 100);
		setGameOver(true);
	};

	return (
		<View style={styles.container}>
			{gameOver && <Text>{secretWord}</Text>}
			<View style={[styles.gridContainer, { width: boardWidth }]}>
				{gridData.map((cell) => {
					const statusStyle = cell.status === "correct" ? styles.cellCorrect : cell.status === "present" ? styles.cellPresent : cell.status === "absent" ? styles.cellAbsent : styles.cellIdle;

					const textColor = cell.status === "idle" ? "black" : "white";

					return (
						<View
							key={cell.id}
							style={[
								styles.cell,
								statusStyle,
								{
									width: CONFIG.cellSize,
									height: CONFIG.cellSize,
									margin: CONFIG.gap / 2,
								},
							]}
						>
							<Text style={[styles.cellText, { color: textColor }]}>{cell.letter}</Text>
						</View>
					);
				})}
			</View>
			<Spacer height={20} />
			<Keyboard onKeyPressed={handleTyping} green={greenLetters} yellow={yellowLetters} dark={darkLetters} />
			<ThemedButton onPress={() => setGameState(false)} style={{ marginTop: 10, backgroundColor: "#d3d6da" }}>
				<Text style={{ color: "black" }}>Close</Text>
			</ThemedButton>
		</View>
	);
};

export default Worlde;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 50,
	},
	gridContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
	},
	cell: {
		borderWidth: 2,
		justifyContent: "center",
		alignItems: "center",
	},
	cellIdle: {
		borderColor: "#d3d6da",
		backgroundColor: "transparent",
	},
	cellCorrect: {
		borderColor: "#6aaa64",
		backgroundColor: "#6aaa64",
	},
	cellPresent: {
		borderColor: "#c9b458",
		backgroundColor: "#c9b458",
	},
	cellAbsent: {
		borderColor: "#787c7e",
		backgroundColor: "#787c7e",
	},
	cellText: {
		fontSize: 30,
		fontWeight: "bold",
		textTransform: "uppercase",
	},
	debugText: {
		marginBottom: 20,
		color: "gray",
	},
	guessText: {
		fontSize: 32,
		fontWeight: "bold",
		letterSpacing: 5,
		marginBottom: 50,
		height: 50,
	},
});
