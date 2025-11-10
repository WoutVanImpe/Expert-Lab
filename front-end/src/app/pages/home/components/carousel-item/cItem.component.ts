import { Component, input } from '@angular/core';

@Component({
  selector: 'carousel-item',
  templateUrl: './cItem.component.html',
  styleUrls: ['../carousel/carousel.component.module.scss'],
})
export class CarouselItem {
  title = input<string>();
  image = input<string>();
}
