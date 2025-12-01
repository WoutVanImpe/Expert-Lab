import { StyleSheet, Text, View, Dimensions, DimensionValue, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import ThemedView from "../ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import ThemedButton from "../ThemedButton";

const CONFIG = {
	size: 10,
	boardSize: 800,
	bombAmount: 20,
};

interface BombProps {
	id: number;
	flipped: boolean;
	exploded: boolean;
	flagged: boolean;
	bombsAdjecent: number;
	bomb: boolean;
	isLeftEdge: boolean;
	isRightEdge: boolean;
}

interface GameProps {
	setGameState: React.Dispatch<React.SetStateAction<boolean>>;
}

const COLOR_CODES: Record<number, string> = {
	1: "blue",
	2: "green",
	3: "orange",
	4: "darkblue",
	5: "darkred",
	6: "lightblue",
	7: "pink",
	8: "gray",
};

const MineSweeper = ({ setGameState }: GameProps) => {
	const totalCells = CONFIG.size * CONFIG.size;
	const [clickState, setClickState] = useState<"click" | "flag">("click");
	const [gameOver, setGameOver] = useState<boolean>(false);
	const [gridData, setGridData] = useState(() => {
		const bombs: number[] = [];
		while (bombs.length < CONFIG.bombAmount) {
			const r = Math.floor(Math.random() * totalCells);
			if (!bombs.includes(r)) bombs.push(r);
		}

		const data = Array.from({ length: totalCells }, (_, index) => {
			return {
				id: index,
				flipped: false,
				exploded: false,
				flagged: false,
				bombsAdjecent: 0,
				bomb: bombs.includes(index),
				isLeftEdge: index % CONFIG.size === 0,
				isRightEdge: index % CONFIG.size === CONFIG.size - 1,
			};
		});

		data.forEach((cell) => {
			if (!cell.bomb) return;

			const incrementNeighbor = (neighborIndex: number) => {
				if (data[neighborIndex] && !data[neighborIndex].bomb) {
					data[neighborIndex].bombsAdjecent++;
				}
			};

			const { id, isLeftEdge, isRightEdge } = cell;
			const size = CONFIG.size;

			// --- Boven ---
			incrementNeighbor(id - size);

			// --- Boven Links ---
			if (!isLeftEdge) incrementNeighbor(id - size - 1);

			// --- Boven Rechts ---
			if (!isRightEdge) incrementNeighbor(id - size + 1);

			// --- Links ---
			if (!isLeftEdge) incrementNeighbor(id - 1);

			// --- Rechts ---
			if (!isRightEdge) incrementNeighbor(id + 1);

			// --- Onder ---
			incrementNeighbor(id + size);

			// --- Onder Links ---
			if (!isLeftEdge) incrementNeighbor(id + size - 1);

			// --- Onder Rechts ---
			if (!isRightEdge) incrementNeighbor(id + size + 1);
		});

		return data;
	});

	const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

	const maxWidth = screenWidth * 0.95;
	const maxHeight = screenHeight * 0.8;

	const scaleX = maxWidth / CONFIG.boardSize;
	const scaleY = maxHeight / CONFIG.boardSize;

	const scale = Math.min(scaleX, scaleY, 1);

	const cellWidth = CONFIG.boardSize / CONFIG.size - 1;

	const visualBoardSize = CONFIG.boardSize * scale;
	const scaleAdjustment = (CONFIG.boardSize - visualBoardSize) / 2;

	const handleClick = (clickedIndex: number) => {
		if (gameOver) return;
		let newGridData = [...gridData];
		const cell = newGridData[clickedIndex];

		if (cell.flipped) return;

		if (clickState === "flag") {
			cell.flagged = !cell.flagged;
			setGridData(newGridData);
			return;
		}
		checkWin();

		if (cell.flagged) return;

		if (cell.bomb) {
			alert("BOOOOM!");
			gridData[clickedIndex].exploded = true;
			flipAll();

			return;
		}

		revealCell(clickedIndex, newGridData);

		setGridData(newGridData);
	};

	const revealCell = (index: number, grid: BombProps[]) => {
		const width = CONFIG.size;
		const cell = grid[index];

		if (!cell || cell.flipped || cell.flagged) return;

		cell.flipped = true;

		if (cell.bombsAdjecent > 0) return;

		if (index - width >= 0) revealCell(index - width, grid);
		if (index + width < grid.length) revealCell(index + width, grid);
		if (!cell.isLeftEdge) revealCell(index - 1, grid);
		if (!cell.isRightEdge) revealCell(index + 1, grid);
		if (index - width >= 0 && !cell.isLeftEdge) revealCell(index - width - 1, grid);
		if (index - width >= 0 && !cell.isRightEdge) revealCell(index - width + 1, grid);
		if (index + width < grid.length && !cell.isLeftEdge) revealCell(index + width - 1, grid);
		if (index + width < grid.length && !cell.isRightEdge) revealCell(index + width + 1, grid);
	};

	const flipAll = () => {
		let newGridData = [...gridData];
		newGridData.forEach((mineField) => {
			if (mineField.flipped) return;
			mineField.flipped = true;
		});
		setGridData(newGridData);
	};

	const checkWin = () => {
		let bombsFlagged = 0;
		gridData.forEach((mineField) => {
			if (!mineField.bomb) return;
			if (mineField.flagged) bombsFlagged++;
		});
		if (bombsFlagged === CONFIG.bombAmount) {
			alert("YOU WON!");
			flipAll();
			setGameOver(true);
		}
	};

	return (
		<ThemedView safe style={styles.wrapper}>
			<View style={styles.controlsContainer}>
				<Pressable onPress={() => !gameOver && setClickState("click")} style={[styles.controlBtn, clickState === "click" && styles.activeBtn]}>
					<Ionicons name="construct" size={24} color={clickState === "click" ? "white" : "black"} />
					<Text style={[styles.btnText, clickState === "click" && styles.activeBtnText]}>Dig</Text>
				</Pressable>

				<Pressable onPress={() => !gameOver && setClickState("flag")} style={[styles.controlBtn, clickState === "flag" && styles.activeBtn]}>
					<Ionicons name="flag" size={24} color={clickState === "flag" ? "white" : "black"} />
					<Text style={[styles.btnText, clickState === "flag" && styles.activeBtnText]}>Flag</Text>
				</Pressable>
			</View>

			<ThemedView
				style={[
					styles.gridContainer,
					{
						width: CONFIG.boardSize,
						transform: [{ scale }],
						marginVertical: -scaleAdjustment,
					},
				]}
			>
				{gridData.map((cellData, index) => {
					const cellStyle = cellData.exploded ? styles.cellExploded : cellData.flipped ? styles.cellOpen : styles.cellClosed;

					return (
						<Pressable onPressIn={() => handleClick(cellData.id)} id={`${index}`} key={index} style={[styles.cellBase, { width: cellWidth, height: cellWidth }, cellStyle]}>
							{cellData.flipped && !cellData.flagged && (
								<>
									{cellData.bombsAdjecent !== 0 && !cellData.bomb && <Text style={[styles.cellText, { color: COLOR_CODES[cellData.bombsAdjecent] }]}>{cellData.bombsAdjecent}</Text>}
									{cellData.bomb && <Ionicons name="stop-circle" size={cellWidth * 0.7} color="black" />}
								</>
							)}
							{cellData.flagged && <Ionicons name="flag" size={cellWidth * 0.7} color="red" />}
						</Pressable>
					);
				})}
			</ThemedView>

			<ThemedButton onPress={() => setGameState(false)} style={{ marginTop: 10 }}>
				<Text style={{ color: "#f2f2f2" }}>Close</Text>
			</ThemedButton>
		</ThemedView>
	);
};

export default MineSweeper;

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	controlsContainer: {
		flexDirection: "row",
		marginBottom: 20,
		gap: 20,
		zIndex: 10,
	},
	controlBtn: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 25,
		backgroundColor: "#ddd",
		borderWidth: 2,
		borderColor: "#bbb",
	},
	activeBtn: {
		backgroundColor: Colors.primary,
		borderColor: Colors.primary,
	},
	btnText: {
		color: "black",
		fontWeight: "bold",
	},
	activeBtnText: {
		color: "white",
	},
	gridContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignContent: "center",
		justifyContent: "center",
		aspectRatio: 1,
		borderWidth: 2,
		borderColor: "#333",
		backgroundColor: "#ccc",
	},
	cellBase: {
		alignItems: "center",
		justifyContent: "center",
	},
	cellClosed: {
		backgroundColor: "#c6c6c6",
		borderTopWidth: 4,
		borderLeftWidth: 4,
		borderRightWidth: 4,
		borderBottomWidth: 4,
		borderTopColor: "#ffffff",
		borderLeftColor: "#ffffff",
		borderRightColor: "#7b7b7b",
		borderBottomColor: "#7b7b7b",
	},
	cellOpen: {
		backgroundColor: "#bbb",
		borderWidth: 0.5,
		borderColor: "#777",
	},
	cellExploded: {
		backgroundColor: "red",
		borderWidth: 0.5,
		borderColor: "#777",
	},
	cellText: {
		fontSize: 30,
		fontWeight: "700",
	},
});
