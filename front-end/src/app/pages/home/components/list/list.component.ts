import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

interface MockData {
  id: number;
  title: string;
  image: string;
  description: string;
  route?: string;
}

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.module.scss'],
  standalone: true,
})
export class List {
  private readonly router = inject(Router);
  
  mockData = input<MockData[]>();

  navigateToPage(route: string | undefined) {
    if (route) {
      this.router.navigate([route]);
    }
  }
}
