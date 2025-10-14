import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'drag-game-container',
  templateUrl: './drag-game-container.component.html',
  styleUrls: ['./drag-game-container.component.module.scss'],
  imports: [CdkDropList, CdkDrag],
})
export class DragGame {
  rows = 6;
  columns = 4;

  pieces = [
    'A1',
    'A2',
    'A3',
    'A4',
    'A5',
    'A6',
    'B1',
    'B2',
    'B3',
    'B4',
    'B5',
    'B6',
    'C1',
    'C2',
    'C3',
    'C4',
    'C5',
    'C6',
    'D1',
    'D2',
    'D3',
    'D4',
    'D5',
    'D6',
  ];

  field = Array(this.rows * this.columns).fill(null);

  gridIds = this.field.map((_, i) => `slot${i}`);

  gridData: Record<string, string[]> = Object.fromEntries(
    this.field.map((_, i) => [`slot${i}`, []])
  );

  get connectedLists() {
    return ['puzzleBox', ...this.gridIds];
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) return;

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  canEnter = (drag: CdkDrag<string>, drop: CdkDropList<string[]>) => {
    const id = drop.id;
    const slotData = this.gridData[id];

    return slotData.length === 0;
  };
}
