import { Component } from '@angular/core';
import { TodoItem } from './components/todo-item';

@Component({
  selector: 'todopage',
  template: `<h1>Todos</h1>
    <div class="todo-container">
      @for (todo of todos; track todo.id){
      <todoItem
        [id]="todo.id"
        [title]="todo.title"
        [done]="todo.checked"
        (completionEvent)="completeTodo($event)"
      />
      }
    </div>
    <p>{{ completedCount }} van de {{ todos.length }} todos gedaan!</p>`,
  imports: [TodoItem],
  styleUrls: ['./todo.module.scss'],
})
export class TodoPage {
  todos = [
    { id: 1, title: 'afwassen', checked: false },
    { id: 2, title: 'stofzuigen', checked: false },
    { id: 3, title: 'koken', checked: false },
  ];

  get completedCount() {
    return this.todos.filter((t) => t.checked).length;
  }

  completeTodo(event: { id: number; checked: boolean }) {
    this.todos = this.todos.map((t) => (t.id === event.id ? { ...t, checked: event.checked } : t));
  }
}
