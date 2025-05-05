import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../models/auth/login-request';
import { LoginResponse } from '../../../models/auth/login-response';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router:Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', { validators: [Validators.required] })
  });

  get emailIsInvalid() {
    return this.loginForm.controls.email.touched &&
      this.loginForm.controls.email.invalid;
  }

  get passwordIsInvalid() {
    return this.loginForm.controls.password.touched &&
      this.loginForm.controls.password.invalid;
  }

  login() {
    if (this.loginForm.invalid) return;
    const loginRequest: LoginRequest = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
      clientId: 'Client1'
    };
    this.authService.login(loginRequest).subscribe({
      next: (response: LoginResponse) => {
        console.log(response);
        this.authService.setAuthStatus(response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error(error);
        alert('error: ' + error.error.message);
      }
    });
  }

  onSubmit() {
    console.log(this.loginForm);
  }
}
