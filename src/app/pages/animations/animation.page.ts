import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { Bomb } from './components/bomb/bomb.component';

@Component({
  selector: 'animation-page',
  templateUrl: './animation.page.html',
  styleUrls: ['animation.page.module.scss'],
  imports: [Bomb],
})
export class AnimationPage {
  @ViewChild('gameField') gameFieldRef!: ElementRef<HTMLDivElement>;

  playerPosX = signal<number>(0);
  playerPosY = signal<number>(0);
  playerSize = 20;

  bombX = 500;
  bombY = 500;
  bombWidth = 10;
  bombBlastRadius = 50;

  onMouseMove(event: MouseEvent) {
    if (!this.gameFieldRef) return;
    const rect = this.gameFieldRef.nativeElement.getBoundingClientRect();

    const mouseX = Math.floor(event.clientX - rect.left);
    const mouseY = Math.floor(event.clientY - rect.top);

    this.playerPosX.set(
      Math.max(Math.min(mouseX, rect.width - this.playerSize / 2), 0 + this.playerSize / 2)
    );
    this.playerPosY.set(
      Math.max(Math.min(mouseY, rect.height - this.playerSize / 2), 0 + this.playerSize / 2)
    );
    this.checkDeath(this.bombX, this.bombY, this.bombBlastRadius);
  }

  checkDeath(bombX: number, bombY: number, bombBlastRadius: number) {
    const distance = Math.sqrt(
      Math.pow(this.playerPosX() - bombX, 2) + Math.pow(this.playerPosY() - bombY, 2)
    );
    if (distance < bombBlastRadius) {
      alert('BOOM!');
    }
  }
}
