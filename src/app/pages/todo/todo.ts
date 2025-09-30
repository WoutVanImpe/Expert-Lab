import { Component } from '@angular/core';
import { TodoItem } from './components/todo-item';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'todopage',
  template: `<h1>Todos</h1>
    @if(!addingTodoState){
    <div class="todo-container">
      @for (todo of todos; track todo.id){
      <todoItem
        [id]="todo.id"
        [title]="todo.title"
        [done]="todo.checked"
        (completionEvent)="completeTodo($event)"
        (deleteEvent)="deleteTodo($event)"
      />
      }
    </div>
    <p>{{ completedCount }} van de {{ todos.length }} todos gedaan!</p>
    } @else {
    <form [formGroup]="todoForm" (ngSubmit)="handleSubmit()">
      <label>Title: <input id="title" formControlName="title" type="text" /></label>
      <input id="submit" [disabled]="!todoForm.valid" type="submit" />
    </form>
    }
    <button (click)="changeState()" class="stateButton">
      @if (addingTodoState){
      <p>cancel</p>
      } @else {
      <p>add todo</p>
      }
    </button>`,
  imports: [TodoItem, ReactiveFormsModule],
  styleUrls: ['./todo.module.scss'],
})
export class TodoPage {
  todos = [
    { id: 1, title: 'afwassen', checked: false },
    { id: 2, title: 'stofzuigen', checked: false },
    { id: 3, title: 'koken', checked: false },
  ];

  idCount = this.todos.length + 1;

  addingTodoState = false;

  get completedCount() {
    return this.todos.filter((t) => t.checked).length;
  }

  todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  completeTodo(event: { id: number; checked: boolean }) {
    this.todos = this.todos.map((t) => (t.id === event.id ? { ...t, checked: event.checked } : t));
  }

  deleteTodo(event: { id: number }) {
    this.todos = this.todos.filter((t) => t.id != event.id);
  }

  handleSubmit() {
    const newTodo = { id: this.idCount, title: this.todoForm.value.title!, checked: false };
    this.todos.push(newTodo);
    this.idCount++;
    this.addingTodoState = false;
    this.todoForm.reset();
  }

  changeState() {
    this.addingTodoState = !this.addingTodoState;
  }
}
