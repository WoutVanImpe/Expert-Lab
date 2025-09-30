import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: ` <nav><a routerLink="">Home</a> | <a routerLink="/todo">Todo</a></nav>
    <router-outlet />`,
  imports: [RouterOutlet, RouterLink],
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-minigames');
}
