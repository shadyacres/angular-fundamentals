import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: `
<h1>Login</h1>
<hr>
<div class="col-md-4">
  <form #loginForm="ngForm" (ngSubmit)="login(loginForm.value)" autocomplete="off" noValidate>
    <div class="form-group">
      <label for="userName">User Name:</label>
      <em *ngIf="loginForm.controls['userName']?.invalid && (loginForm.controls['userName']?.touched || mouseoverLogin)">Required</em>
      <input (ngModel)="userName" name="userName" type="text" class="form-control" placeholder="User Name..." required />
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
       <em *ngIf="loginForm.controls['password']?.invalid  && (loginForm.controls['password']?.touched || mouseoverLogin)">Required</em>
      <input (ngModel)="password" name="password" id="password" type="password" class="form-control"placeholder="Password..." required />
    </div>
    <span (mouseenter)="mouseoverLogin=true" (mouseleave)="mouseoverLogin=false">
      <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid">Login</button>
    </span>
    <button type="button" class="btn btn-default" (click)="cancel()">Cancel</button>
  </form>
  <br />
  <div *ngIf="loginInvalid" class="alert alert-danger">Invalid login</div>
</div>`,
styles: [`
  em { float:right; color:#E05C65; padding-left: 10px;}
`]
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  mouseoverLogin: boolean;
  userName;
  password;
  loginInvalid = false;

  ngOnInit(): void {
    if (this.authService.currentUser !== null && this.authService.currentUser !== undefined) {
      this.router.navigate(['/events']);
    }
  }

  login(formValues) {
    this.authService.loginUser(formValues.userName, formValues.password)
    .subscribe(resp => {
      if (!resp) {
        this.loginInvalid = true;
      } else {
        this.router.navigate(['/events']);
      }
    });
  }

  cancel() {
    this.router.navigate(['/events']);
  }
}
