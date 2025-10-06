import { Component, inject, OnInit } from '@angular/core';
import { TodoItem } from './components/todo-item';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from './components/todo.service';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
@Component({
  selector: 'todopage',
  template: `<h1>Todos</h1>
    @if(!addingTodoState){
    <div class="todo-container">
      @for (todo of todos; track todo.id){
      <todoItem
        [id]="todo.id"
        [title]="todo.title"
        [done]="todo.completed"
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
export class TodoPage implements OnInit {
  private readonly todoService = inject(TodoService);

  todos: Todo[] = [];
  idCount = 1;
  addingTodoState = false;

  ngOnInit() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data.slice(0, 10);
      this.idCount = this.todos.length + 1;
    });
  }

  get completedCount() {
    return this.todos.filter((t) => t.completed).length;
  }

  todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  completeTodo(event: { id: number; completed: boolean }) {
    this.todos = this.todos.map((t) =>
      t.id === event.id ? { ...t, completed: event.completed } : t
    );
  }

  deleteTodo(event: { id: number }) {
    this.todos = this.todos.filter((t) => t.id != event.id);
  }

  handleSubmit() {
    const newTodo: Todo = { id: this.idCount, title: this.todoForm.value.title!, completed: false };
    this.todos.push(newTodo);
    this.idCount++;
    this.addingTodoState = false;
    this.todoForm.reset();
  }

  changeState() {
    this.addingTodoState = !this.addingTodoState;
  }
}
