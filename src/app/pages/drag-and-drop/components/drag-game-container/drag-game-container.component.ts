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

  field: any[] = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];

  rows = 6;
  columns = 4;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (event.previousContainer.id === 'puzzleBox') {
      const piece = event.previousContainer.data[event.previousIndex];

      this.field[event.currentIndex] = piece;

      event.previousContainer.data.splice(event.previousIndex, 1);
    }
  }
}
