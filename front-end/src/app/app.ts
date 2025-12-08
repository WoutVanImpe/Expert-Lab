import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<div class="app">
    <nav>
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a> | 
      <a routerLink="/todo" routerLinkActive="active">Todo</a> |
      <a routerLink="/drag-and-drop" routerLinkActive="active">Drag & Drop</a> | 
      <a routerLink="/animation" routerLinkActive="active">Animations</a> |
      <a routerLink="/controller" routerLinkActive="active">Controller</a>
    </nav>
    <div class="router-container">
      <router-outlet />
    </div>
  </div>`,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-minigames');
}
