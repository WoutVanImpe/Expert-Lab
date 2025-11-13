import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { TodoPage } from './pages/todo/todo';
import { DragAndDropPage } from './pages/drag-and-drop/dragAndDrop.page';
import { AnimationPage } from './pages/animations/animation.page';
import { ControllerPage } from './pages/controller/controller.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'todo',
    component: TodoPage,
  },
  {
    path: 'drag-and-drop',
    component: DragAndDropPage,
  },
  {
    path: 'animation',
    component: AnimationPage,
  },
  {
    path: 'controller',
    component: ControllerPage,
  },
];
