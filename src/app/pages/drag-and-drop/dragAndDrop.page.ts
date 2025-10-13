import { Component } from '@angular/core';
import { ExampleContainer } from './components/example-container/example-container.component';

@Component({
  selector: 'drag-and-drop-page',
  templateUrl: './dragAndDrop.page.html',
  styleUrls: ['./dragAndDrop.page.module.scss'],
  imports: [ExampleContainer],
})
export class DragAndDropPage {}
