import { Component, input, output, EventEmitter } from '@angular/core';

@Component({
  selector: 'carousel-item',
  templateUrl: './cItem.component.html',
  styleUrls: ['../carousel/carousel.component.module.scss'],
  standalone: true,
})
export class CarouselItem {
  title = input<string>();
  image = input<string>();
  click = output<void>();

  onClick() {
    this.click.emit();
  }
}
