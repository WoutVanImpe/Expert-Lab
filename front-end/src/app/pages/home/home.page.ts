import { Component } from '@angular/core';
import { Carousel } from './components/carousel/carousel.component';
import { List } from './components/list/list.component';

@Component({
  selector: 'homepage',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.module.scss'],
  standalone: true,
  imports: [Carousel, List],
})
export class HomePage {
  title = 'Spelletjes website';

  mockData = [
    {
      id: 1,
      title: 'Todo List',
      image: 'images/todo.jpg',
      description: 'Manage your daily tasks with our interactive todo application.',
      route: '/todo',
    },
    {
      id: 2,
      title: 'Drag & Drop',
      image: 'images/drag.jpg',
      description: 'Challenge yourself with our fun drag and drop puzzle game.',
      route: '/drag-and-drop',
    },
    {
      id: 3,
      title: 'Animations',
      image: 'images/animation.jpg',
      description: 'Test your reflexes in our exciting animation game.',
      route: '/animation',
    },
    {
      id: 4,
      title: 'Controller',
      image: 'images/controller.jpg',
      description: 'Take control with our interactive controller game.',
      route: '/controller',
    },
  ];
}
