import { Component, input } from '@angular/core';

@Component({
  selector: 'car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.module.scss'],
})
export class Car {
  xPos = input<number>();
  yPos = input<number>();
}
