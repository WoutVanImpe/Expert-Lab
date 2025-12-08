import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TodoItem } from './components/todo-item';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodosService } from '../../services/todo/todos.service';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
@Component({
  selector: 'todopage',
  template: `<div class="todo-page">
    <h1>Todos</h1>
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
    <p class="todo-counter">{{ completedCount }} van de {{ todos.length }} todos gedaan!</p>
    } @else {
    <form [formGroup]="todoForm" (ngSubmit)="handleSubmit()">
      <label>Title: <input id="title" formControlName="title" type="text" /></label>
      <input id="submit" [disabled]="!todoForm.valid" type="submit" value="verzenden" />
    </form>
    }
    <button (click)="changeState()" [class]="addingTodoState ? 'cancelButton' : 'stateButton'">
      @if (addingTodoState){
      <p>cancel</p>
      } @else {
      <p>add todo</p>
      }
    </button>
  </div>`,
  imports: [TodoItem, ReactiveFormsModule],
  styleUrls: ['./todo.module.scss'],
})
export class TodoPage implements OnInit {
  private readonly todoService = inject(TodosService);
  private readonly cdRef = inject(ChangeDetectorRef);

  todos: Todo[] = [];
  idCount = 1;
  addingTodoState = false;

  ngOnInit() {
    this.todoService.TodoList().subscribe((data: any) => {
      this.todos = data.slice(0, 10);
      this.cdRef.detectChanges();
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
