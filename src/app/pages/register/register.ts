import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatCardModule, MatInputModule, MatButtonModule
  ],
    templateUrl: './register.html',
  styleUrl: './register.css',
})

export class RegisterComponent {
  err = '';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    // 🔥 FIX — create the form inside constructor
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    this.err = '';

    if (this.form.invalid) return;

    this.auth.register(this.form.value).subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: (e) => {
        console.log("REGISTER ERROR:", e);
        this.err = e?.error ?? "Register failed";
      }

    });
  }
}

