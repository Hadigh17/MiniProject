import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary" class="nav">
      <span class="nav__title" (click)="go('/home')">
        Hello, {{ auth.user?.userName }}
      </span>

      <span class="nav__spacer"></span>

      <ng-container *ngIf="auth.user; else guest">
        <button mat-button (click)="go('/customers')">View Customers</button>
        <button mat-button (click)="go('/customers/manage')">Manage Customers</button>
        <button mat-button (click)="onLogout()">Logout</button>
      </ng-container>

      <ng-template #guest>
        <button mat-button (click)="go('/login')">Login</button>
        <button mat-button (click)="go('/register')">Register</button>
      </ng-template>
    </mat-toolbar>
  `,
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  constructor(public auth: AuthService, private router: Router) {}

  go(path: string) {
    this.router.navigateByUrl(path);
  }

  onLogout() {
    this.auth.logout();
    this.go('/login');
  }
}
