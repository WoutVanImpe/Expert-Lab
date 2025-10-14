import { Component } from '@angular/core';
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

@Component({
  selector: 'drag-game-container',
  templateUrl: './drag-game-container.component.html',
  styleUrls: ['./drag-game-container.component.module.scss'],
  imports: [CdkDropList, CdkDrag],
})
export class DragGame {
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
