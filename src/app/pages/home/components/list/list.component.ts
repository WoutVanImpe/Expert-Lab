import { Component, input } from '@angular/core';

interface MockData {
  id: number;
  title: string;
  image: string;
  description: string;
}

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.module.scss'],
})
export class List {
  mockData = input<MockData[]>();
}
