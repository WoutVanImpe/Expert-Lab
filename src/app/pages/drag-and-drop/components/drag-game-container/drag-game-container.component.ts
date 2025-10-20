import { Component, input, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

interface Piece {
  item: string;
  x: number;
  y: number;
  img: string;
}

type Difficulty = 'easy' | 'normal' | 'hard' | 'extreme';

@Component({
  selector: 'drag-game-container',
  templateUrl: './drag-game-container.component.html',
  styleUrls: ['./drag-game-container.component.module.scss'],
  imports: [CdkDropList, CdkDrag],
})
export class DragGame implements OnInit {
  imgDiff = input<Difficulty>();
  pieceDiff = input<Difficulty>();

  difficulties = {
    img: {
      easy: ['easy1.jpeg', 'easy2.jpeg', 'easy3.jpeg', 'easy4.jpeg'],
      normal: ['normal1.jpeg', 'normal2.jpeg', 'normal3.jpeg', 'normal4.jpeg'],
      hard: ['hard1.jpeg', 'hard2.jpeg', 'hard3.jpeg', 'hard4.jpeg'],
      extreme: ['extreme1.jpeg', 'extreme2.jpeg', 'extreme3.jpeg', 'extreme4.jpeg'],
    },
    piece: {
      easy: [2, 3, 4],
      normal: [4, 5, 6],
      hard: [6, 7, 8],
      extreme: [8, 9, 10],
    },
  };

  rows = 0;
  columns = 0;

  imgWidth = 0;
  imgHeight = 0;

  pieces: Piece[] | [] = [];
  field: null[] = [];

  gridIds: string[] = [];
  gridData: Record<string, Piece[]> = {};

  randomImg: string = '';

  ngOnInit() {
    this.configureGame();
  }

  configureGame() {
    const imgs = this.difficulties.img[this.imgDiff()!];
    this.randomImg = `images/puzzle/${imgs[Math.floor(Math.random() * imgs.length)]}`;
    const pieces = this.difficulties.piece[this.pieceDiff()!];

    this.rows = pieces[Math.floor(Math.random() * pieces.length)];
    this.columns = pieces[Math.floor(Math.random() * pieces.length)];

    this.imgWidth = this.columns * 80;
    this.imgHeight = this.rows * 80;

    this.pieces = this.shuffle(
      Array.from({ length: this.rows }, (_, rowIndex) =>
        Array.from({ length: this.columns }, (_, colIndex) => ({
          item: `${colIndex + 1}/${rowIndex + 1}`,
          x: colIndex * -80,
          y: rowIndex * -80,
          img: this.randomImg,
        }))
      ).flat()
    );

    this.field = new Array(this.rows * this.columns).fill(null);

    this.gridIds = Array.from({ length: this.rows }, (_, rowIndex) =>
      Array.from({ length: this.columns }, (_, colIndex) => `${colIndex + 1}/${rowIndex + 1}`)
    ).flat();

    this.gridData = Object.fromEntries(this.gridIds.map((id) => [id, []]));
  }

  resetGame() {
    this.rows = 0;
    this.columns = 0;

    this.imgWidth = 0;
    this.imgHeight = 0;

    this.pieces = [];
    this.field = [];

    this.gridIds = [];
    this.gridData = {};
  }

  get connectedLists() {
    return ['puzzleBox', ...this.gridIds];
  }

  drop(event: CdkDragDrop<Piece[]>) {
    if (event.previousContainer === event.container) {
      if (event.previousContainer.id === 'puzzleBox') {
        moveItemInArray(event.previousContainer.data, event.previousIndex, event.currentIndex);
      } else return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    this.checkIfWon();
  }

  canEnter = (drag: CdkDrag<Piece>, drop: CdkDropList<Piece[]>) => {
    const id = drop.id;
    const slotData = this.gridData[id];

    return slotData.length === 0;
  };

  shuffle<T>(array: T[]): T[] {
    const result = [...array]; // kopie
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  checkIfWon() {
    const allSlotsFilled = Object.values(this.gridData).every((slot) => slot.length === 1);
    if (!allSlotsFilled) return;

    const hasWon = Object.entries(this.gridData).every(([id, pieces]) => pieces[0]?.item === id);

    if (hasWon) {
      alert('🎉 YOU WON!');
    }
  }
}
