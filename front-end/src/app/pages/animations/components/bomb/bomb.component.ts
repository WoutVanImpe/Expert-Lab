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

  explosionStartEvent = output<BombExplosionVars>();
  explosionEndEvent = output<BombExplosionVars>();

  explosion1rotate = Math.floor(Math.random() * 360);
  explosion2rotate = Math.floor(Math.random() * 360);
  explosion3rotate = Math.floor(Math.random() * 360);

  loading: boolean = true;

  startExplosion() {
    this.explosionStartEvent.emit({
      id: this.bombId(),
      x: this.bombPosX(),
      y: this.bombPosY(),
      blastRadius: this.bombBlastRadius(),
    });
  }

  onAnimationEnd() {
    this.explosionEndEvent.emit({
      id: this.bombId(),
      x: this.bombPosX(),
      y: this.bombPosY(),
      blastRadius: this.bombBlastRadius(),
    });
  }

  loadingDoneEvent() {
    this.loading = false;
  }
}
