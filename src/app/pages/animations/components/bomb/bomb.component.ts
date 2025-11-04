import { Component, input, output } from '@angular/core';

type BombExplosionVars = {
  id: number;
  x: number;
  y: number;
  blastRadius: number;
};

@Component({
  selector: 'bomb',
  templateUrl: './bomb.component.html',
  styleUrls: ['./bomb.component.module.scss'],
})
export class Bomb {
  bombId = input.required<number>();
  bombPosX = input.required<number>();
  bombPosY = input.required<number>();
  bombWidth = input.required<number>();
  bombBlastRadius = input.required<number>();
  animationEndEvent = output<BombExplosionVars>();

  onAnimationEnd() {
    this.animationEndEvent.emit({
      id: this.bombId(),
      x: this.bombPosX(),
      y: this.bombPosY(),
      blastRadius: this.bombBlastRadius(),
    });
  }
}
