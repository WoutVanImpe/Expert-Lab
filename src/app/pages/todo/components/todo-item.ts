import { Component, input, output } from '@angular/core';

@Component({
  selector: 'todoItem',
  template: `<div class="todo-card">
    <input id="done" type="checkbox" [checked]="done()" (change)="completeTodo($event)" />
    <p>{{ title() }}</p>
  </div>`,
  styleUrls: ['../todo.module.scss'],
})
export class TodoItem {
  readonly title = input.required<string>();
  readonly done = input.required<boolean>();
  readonly id = input.required<number>();

  completionEvent = output<{ id: number; checked: boolean }>();

  completeTodo(event: Event) {
    const target = event.target as HTMLInputElement;
    this.completionEvent.emit({ id: this.id(), checked: target.checked });
  }
}
