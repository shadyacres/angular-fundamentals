import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { userRoutes } from './user.routes';

@NgModule ({
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild(userRoutes)
  ],
  declarations: [
    ProfileComponent,
    LoginComponent
  ],
  providers: [
  ]
})
export class UserModule { }
