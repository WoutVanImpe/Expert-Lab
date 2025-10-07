import { Component, computed, input } from '@angular/core';
import { CarouselItem } from '../carousel-item/cItem.component';

interface MockData {
  id: number;
  title: string;
  image: string;
  description: string;
}

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.module.scss'],
  imports: [CarouselItem],
})
export class Carousel {
  mockData = input<MockData[]>();

  gameList = computed(() => [...(this.mockData() ?? [])]);

  buttonContent = ['<', '>'];

  previous() {
    const lastItem = this.gameList().pop()!;
    this.gameList().unshift(lastItem);
  }

  next() {
    const firstItem = this.gameList().shift()!;
    this.gameList().push(firstItem);
  }
}
