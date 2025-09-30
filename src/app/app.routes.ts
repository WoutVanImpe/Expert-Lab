import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { TodoPage } from './pages/todo/todo';

export const routes: Routes = [
    {
        path: '',
        component: HomePage
    },
    {
        path: 'todo',
        component: TodoPage
    },
];
