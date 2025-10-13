import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { TodoPage } from './pages/todo/todo';
import { DragAndDropPage } from './pages/drag-and-drop/dragAndDrop.page';

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
];
