import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm = new FormGroup({
    firstName: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        validatePassword
      ]
    }),
    confirmPassword: new FormControl('', {
      validators: []
    })
  },
  {validators: validateConfirmPassword}
  );

  get firstnameIsRequired() {
    return this.signupForm.controls.firstName.touched &&
      this.signupForm.controls.firstName.invalid;
  }

  get emailIsInvalid() {
    return this.signupForm.controls.email.touched &&
      this.signupForm.controls.email.invalid;
  }

  get emailErrorMessage(): string | null {
    const errors = this.signupForm.get('email')?.errors;
    if (errors) {
      if (errors['required']) return 'Email is required.';
      if (errors['email']) return 'Invalid email format.';
      if (errors['maxlength']) return 'Email must be at most 100 characters long.';
    }
    return null;
  }

  get passwordIsInvalid() {
    return this.signupForm.controls.password.touched &&
      this.signupForm.controls.password.invalid;
  }

  get passwordErrorMessage(): string | null {
    const errors = this.signupForm.get('password')?.errors;
    if (errors) {
      if (errors['required']) return 'Password is required.';
      if (errors['minlength']) return 'Password must be at least 6 characters long.';
      if (errors['noUpperCase']) return 'Password must contain at least one uppercase letter.';
      if (errors['noNumber']) return 'Password must contain at least one number.';
      if (errors['noSpecialChar']) return 'Password must contain at least one special character.';
      if (errors['maxlength']) return 'Password must be at most 100 characters long.';
    }
    return null;
  }

  get confirmPasswordIsInvalid() {
    return this.signupForm.controls.confirmPassword.touched &&
      (this.signupForm.errors?.['passwordMismatch'] || this.signupForm.errors?.['confirmPasswordrequired']);
  }

  get confirmPasswordErrorMessage(): string | null {
    const errors = this.signupForm.errors;
    if (errors) {
      if (errors['confirmPasswordrequired']) return 'Confirm Password is required.';
      if (errors['passwordMismatch']) return 'Passwords do not match.';
    }
    return null;
  }
  onsubmit() {
    console.log(this.signupForm);
  }

  blockNonLetters(event: KeyboardEvent) {
    const key = event.key;

    // Allow control keys like Backspace, Tab, Arrow keys, etc.
    if (
      key === 'Backspace' ||
      key === 'Tab' ||
      key === 'ArrowLeft' ||
      key === 'ArrowRight' ||
      key === 'Delete' ||
      key === 'End' ||
      key === 'Home'
    ) {
      return;
    }

    // Allow only letters a-z and A-Z
    const isLetter = /^[a-zA-Z]$/.test(key);
    if (!isLetter) {
      event.preventDefault();
    }
  }

}

function validatePassword(control: AbstractControl): ValidationErrors | null {
  const password = control.value;
  if (!password) return null;

  const errors: any = {};
  if (!/[A-Z]/.test(password)) errors.noUpperCase = true;
  if (!/\d/.test(password)) errors.noNumber = true;
  if (!/[!@#$%^&*(),.?{}|<>]/.test(password)) errors.noSpecialChar = true;

  return Object.keys(errors).length ? errors : null;
}

function validateConfirmPassword(control: AbstractControl): ValidationErrors | null {
  const password: string | null = control.get('password')?.value;
  const confirmPassword: string | null = control.get('confirmPassword')?.value;
  if (password === null && confirmPassword === null) return null;
  else if (password !== null && confirmPassword === null)
    return { confirmPasswordrequired: true };
  else if (password !== confirmPassword)
    return { passwordMismatch: true };
  else
    return null;
}