import { IUser } from './user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  currentUser: IUser;

  loginUser(userName: string, password: string) {
    this.currentUser = {
      id: 1,
      userName: userName,
      firstName: 'Dan',
      lastName: 'B'
    };
  }

  isAuthenticated(): boolean {
    return this.currentUser !== undefined && this.currentUser !== null;
  }

  updateCurrentUser(firstName: string, lastName: string): void {
    this.currentUser = { ...this.currentUser, firstName: firstName, lastName: lastName };
  }
}
