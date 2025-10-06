import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private readonly http: HttpClient) {}

  TodoList() {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    return this.http.get(url);
  }
}
