import { Component, input } from '@angular/core';
import {
  CdkDragDrop,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

interface Piece {
  item: string;
  x: number;
  y: number;
  img: string;
}

type Difficulty = 'easy' | 'normal' | 'hard' | 'extreme';

@Component({
  selector: 'drag-game-container',
  templateUrl: './drag-game-container.component.html',
  styleUrls: ['./drag-game-container.component.module.scss'],
  imports: [CdkDropList, CdkDrag],
})
export class DragGame {
  imgDiff = input<Difficulty>();
  pieceDiff = input<Difficulty>();

  difficulties = {
    img: {
      easy: ['./easy1.jpeg', './easy2.jpeg', './easy3.jpeg', './easy4.jpeg'],
      normal: ['./normal1.jpeg', './normal2.jpeg', './normal3.jpeg', './normal4.jpeg'],
      hard: ['./hard1.jpeg', './hard2.jpeg', './hard3.jpeg', './hard4.jpeg'],
      extreme: ['./extreme1.jpeg', './extreme2.jpeg', './extreme3.jpeg', './extreme4.jpeg'],
    },
    piece: {
      easy: [2, 3, 4],
      normal: [4, 5, 6],
      hard: [6, 7, 8],
      extreme: [8, 9, 10],
    },
  };
  rows = 6;
  columns = 4;
  imgWidth = (this.rows + 1) * 80;
  imgHeight = (this.columns + 1) * 80;

  pieces = this.shuffle(
    Array.from({ length: this.rows }, (_, rowIndex) =>
      Array.from({ length: this.columns }, (_, colIndex) => ({
        item: `${colIndex + 1}/${rowIndex + 1}`,
        x: (colIndex + 1) * -80,
        y: (rowIndex + 1) * -80,
        img: 'test.jpeg',
      }))
    ).flat()
  );

  field = Array(this.rows * this.columns).fill(null);

  gridIds = this.field.map((_, i) => `slot${i}`);

  gridData: Record<string, Piece[]> = Object.fromEntries(
    this.field.map((_, i) => [`slot${i}`, []])
  );

  get connectedLists() {
    return ['puzzleBox', ...this.gridIds];
  }

  drop(event: CdkDragDrop<Piece[]>) {
    if (event.previousContainer === event.container) {
      if (event.previousContainer.id === 'puzzleBox') {
        moveItemInArray(event.previousContainer.data, event.previousIndex, event.currentIndex);
      } else return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  canEnter = (drag: CdkDrag<Piece>, drop: CdkDropList<Piece[]>) => {
    const id = drop.id;
    const slotData = this.gridData[id];

    return slotData.length === 0;
  };

  shuffle<T>(array: T[]): T[] {
    const result = [...array]; // kopie
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}
