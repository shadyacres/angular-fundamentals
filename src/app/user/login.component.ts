import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: `
<h1>Login</h1>
<hr>
<div class="col-md-4">
  <form #loginForm="ngForm" (ngSubmit)="login(loginForm.value)" autocomplete="off" noValidate>
    <div class="form-group">
      <label for="userName">User Name:</label>
      <input (ngModel)="userName" name="userName" type="text" class="form-control" placeholder="User Name..." required />
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input (ngModel)="password" name="password" id="password" type="password" class="form-control"placeholder="Password..." required />
    </div>

    <button type="submit" class="btn btn-primary">Login</button>
    <button type="button" class="btn btn-default" (click)="cancel()">Cancel</button>
  </form>
</div>`
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }

  userName;
  password;

  login(formValues) {
    this.authService.loginUser(formValues.userName, formValues.password);

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/events']);
    } else {
      this.router.navigate(['/events']);
    }
  }

  cancel() {
    this.router.navigate(['/events']);
  }
}
