import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { Bomb } from '../bomb/bomb.component';

interface BombType {
  id: number;
  x: number;
  y: number;
  width: number;
  blastRadius: number;
}
type Difficulty = 'easy' | 'normal' | 'hard' | 'extreme';

@Component({
  selector: 'gamefield',
  templateUrl: './gamefield.component.html',
  styleUrls: ['./gamefield.component.module.scss'],
  imports: [Bomb],
})
export class Gamefield implements AfterViewInit {
  @ViewChild('gameField') gameFieldRef!: ElementRef<HTMLDivElement>;
  private readonly cdRef = inject(ChangeDetectorRef);

  difficulty = input.required<Difficulty>();
  resetGameEvent = output<void>();
  playing: boolean = true;

  playerPosX = signal<number>(0);
  playerPosY = signal<number>(0);
  playerSize = 20;
  playfield: {
    rect: DOMRect | null;
    width: number;
    height: number;
  } = {
    rect: null,
    width: 0,
    height: 0,
  };

  bombList: BombType[] = [];
  bombId = signal<number>(1);
  spawnRate = 0;

  ngAfterViewInit() {
    const rect = this.gameFieldRef.nativeElement.getBoundingClientRect();
    this.playfield.rect = rect;
    this.playfield.width = rect.width;
    this.playfield.height = rect.height;

    if (this.difficulty() === 'easy') {
      this.spawnRate = 1000;
    } else if (this.difficulty() === 'normal') {
      this.spawnRate = 600;
    } else if (this.difficulty() === 'hard') {
      this.spawnRate = 400;
    } else {
      this.spawnRate = 200;
    }

    this.startGame();
  }

  onMouseMove(event: MouseEvent) {
    if (!this.gameFieldRef) return;
    if (this.playfield.rect == null) return;

    const rect = this.playfield.rect;

    const mouseX = Math.floor(event.clientX - rect.left);
    const mouseY = Math.floor(event.clientY - rect.top);

    this.playerPosX.set(
      Math.max(Math.min(mouseX, rect.width - this.playerSize / 2), 0 + this.playerSize / 2)
    );
    this.playerPosY.set(
      Math.max(Math.min(mouseY, rect.height - this.playerSize / 2), 0 + this.playerSize / 2)
    );

    this.bombList.forEach((bomb) => {
      this.checkDeath(bomb.x, bomb.y, bomb.blastRadius);
    });
  }

  async startGame() {
    await this.sleep(2000);
    this.spawnBomb();
  }

  async spawnBomb() {
    this.createBomb();
    this.cdRef.detectChanges();
    await this.sleep(this.spawnRate);
    this.spawnBomb();
  }

  async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  createBomb() {
    const bomb: BombType = {
      id: this.bombId(),
      x: Math.floor(Math.random() * this.playfield.width),
      y: Math.floor(Math.random() * this.playfield.height),
      width: 10,
      blastRadius: Math.floor(Math.random() * 50) + 20,
    };
    this.bombId.update((v) => v + 1);
    this.bombList.push(bomb);
  }

  checkDeath(bombX: number, bombY: number, bombBlastRadius: number) {
    const distance =
      Math.sqrt(Math.pow(this.playerPosX() - bombX, 2) + Math.pow(this.playerPosY() - bombY, 2)) -
      this.playerSize / 2;
    if (distance < bombBlastRadius) {
      // this.playing = false;
    }
  }

  resetGame() {
    this.resetGameEvent.emit();
  }
}
