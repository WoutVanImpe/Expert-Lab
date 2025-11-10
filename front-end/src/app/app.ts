import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<div class="app">
    <nav>
      <a routerLink="">Home</a> | <a routerLink="/todo">Todo</a> |
      <a routerLink="/drag-and-drop">Drag & Drop</a> |
      <a routerLink="/animation">Animations</a>
    </nav>
    <div class="router-container">
      <router-outlet />
    </div>
  </div>`,
  imports: [RouterOutlet, RouterLink],
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-minigames');
}
