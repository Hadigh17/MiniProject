import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <div class="home">
      <mat-card class="home__card">
        <h1>Home</h1>

        <button mat-raised-button color="primary" (click)="go('/customers')">
          View All Customers
        </button>

        <button mat-raised-button color="accent" (click)="go('/customers/manage')">
          Manage Customers
        </button>
      </mat-card>
    </div>
  `,
  styleUrls: ['./home.css']
})
export class HomeComponent {
  constructor(private router: Router) {}
  go(p: string) { this.router.navigateByUrl(p); }
}
