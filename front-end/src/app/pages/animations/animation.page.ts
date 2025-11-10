import { AfterViewInit, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Gamefield } from './components/gamefield/gamefield.component';

type Difficulty = 'easy' | 'normal' | 'hard' | 'extreme';

@Component({
  selector: 'animation-page',
  templateUrl: './animation.page.html',
  styleUrls: ['animation.page.module.scss'],
  imports: [Gamefield, ReactiveFormsModule],
})
export class AnimationPage {
  pageState = signal<'settings' | 'game'>('settings');

  animationForm = new FormGroup({
    diff: new FormControl<Difficulty>('normal'),
  });

  startGame() {
    this.pageState.set('game');
  }

  resetGame() {
    this.pageState.set('settings');
  }
}
