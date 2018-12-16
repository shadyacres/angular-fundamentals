import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  template: `
  <div>
  <h1>Edit Your Profile </h1>
  <hr>
  <div class="col-md-4">
    <form [formGroup]="profileForm" autocomplete="off" novalidate (ngSubmit)="saveProfile(profileForm.value)">
      <div class="form-group" [ngClass]="{'error' : !validateFirstName() }">
      <em *ngIf="!validateFirstName() && profileForm.controls.firstName.errors.required">Required</em>
      <em *ngIf="!validateFirstName() &&  profileForm.controls.firstName.errors.pattern">Must start with a letter</em>
        <label for="firstName">First Name:</label>
        <input formControlName="firstName" id="firstName" type="text" class="form-control" placeholder="First Name..." />
      </div>
      <div class="form-group" [ngClass]="{'error' : !validateLastName }">
      <em *ngIf="!validateLastName()">Required</em>
        <label for="lastName">Last Name:</label>
        <input formControlName="lastName" id="lastName" type="text" class="form-control" placeholder="Last Name..." />
      </div>

      <button type="submit" class="btn btn-primary">Save</button>
      <button type="button" class="btn btn-default" (onclick)="cancel()">Cancel</button>
    </form>
  </div>
</div>
  `,
  styles: [`
    em { float:right; color:#E05C65; padding-left: 10px; }
    .error input {background-color: #E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error :-ms-input-placeholder { color: #999; }
  `]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    const currentUser = this.authService.currentUser;

    this.firstName = new FormControl(currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);

    this.lastName = new FormControl(currentUser.lastName, [Validators.required]);

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  cancel() {
    this.router.navigate(['/events']);
  }

  saveProfile() {
    if (this.profileForm.valid) {
    this.authService.updateCurrentUser(this.firstName.value, this.lastName.value);
    this.router.navigate(['/events']);
    }
  }

  validateFirstName(): boolean {
    return this.firstName.valid ||
           this.firstName.untouched;
  }

  validateLastName(): boolean {
    return this.lastName.valid ||
           this.lastName.touched;
  }
}
