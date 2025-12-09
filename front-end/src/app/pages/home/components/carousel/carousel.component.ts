import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselItem } from '../carousel-item/cItem.component';

interface MockData {
  id: number;
  title: string;
  image: string;
  description: string;
  route?: string;
}

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.module.scss'],
  standalone: true,
  imports: [CarouselItem],
})
export class Carousel {
  private readonly router = inject(Router);
  
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

  navigateToPage(route: string | undefined) {
    if (route) {
      this.router.navigate([route]);
    }
  }
}
