import { Component } from '@angular/core';
import { DragGame } from './components/drag-game-container/drag-game-container.component';

@Component({
  selector: 'drag-and-drop-page',
  templateUrl: './dragAndDrop.page.html',
  styleUrls: ['./dragAndDrop.page.module.scss'],
  imports: [DragGame],
})
export class DragAndDropPage {}
