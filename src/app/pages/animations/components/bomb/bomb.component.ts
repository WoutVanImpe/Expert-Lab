import { Component, input } from '@angular/core';

@Component({
  selector: 'bomb',
  templateUrl: './bomb.component.html',
  styleUrls: ['./bomb.component.module.scss'],
})
export class Bomb {
  bombPosX = input.required<number>();
  bombPosY = input.required<number>();
  bombWidth = input.required<number>();
  bombBlastRadius = input.required<number>();
}
