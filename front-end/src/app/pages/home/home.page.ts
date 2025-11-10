import { Component } from '@angular/core';
import { Carousel } from './components/carousel/carousel.component';
import { List } from './components/list/list.component';

@Component({
  selector: 'homepage',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.module.scss'],
  imports: [Carousel, List],
})
export class HomePage {
  title = 'Spelletjes website';

  mockData = [
    {
      id: 1,
      title: 'Mountain Escape',
      image: 'images/test.jpeg',
      description: 'A peaceful getaway in the snowy mountains.',
    },
    {
      id: 2,
      title: 'Ocean Breeze',
      image: 'images/test.jpeg',
      description: 'Feel the refreshing air of the seaside cliffs.',
    },
    {
      id: 3,
      title: 'City Lights',
      image: 'images/test.jpeg',
      description: 'The vibrant nightlife and glowing skyline await you.',
    },
    {
      id: 4,
      title: 'Forest Trail',
      image: 'images/test.jpeg',
      description: 'Wander through tall trees and discover hidden paths.',
    },
    {
      id: 5,
      title: 'Golden Desert',
      image: 'images/test.jpeg',
      description: 'Experience the calm of endless golden dunes.',
    },
    {
      id: 6,
      title: 'Winter Cabin',
      image: 'images/test.jpeg',
      description: 'A cozy cabin with a warm fireplace and snow outside.',
    },
    {
      id: 7,
      title: 'Tropical Paradise',
      image: 'images/test.jpeg',
      description: 'Palm trees, blue waters, and endless sunshine.',
    },
  ];
}
