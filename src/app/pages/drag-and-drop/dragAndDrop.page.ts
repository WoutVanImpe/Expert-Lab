import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DragGame } from './components/drag-game-container/drag-game-container.component';

type Difficulty = 'easy' | 'normal' | 'hard' | 'extreme';
@Component({
  selector: 'drag-and-drop-page',
  templateUrl: './dragAndDrop.page.html',
  styleUrls: ['./dragAndDrop.page.module.scss'],
  imports: [DragGame, ReactiveFormsModule],
})
export class DragAndDropPage {
  settingsState = true;

  difficultyForm = new FormGroup({
    image: new FormControl<Difficulty>('normal'),
    pieces: new FormControl<Difficulty>('normal'),
  });

  startGame = () => {
    this.settingsState = false;
  };

  stopGame = () => {
    this.settingsState = true;
  };
}
