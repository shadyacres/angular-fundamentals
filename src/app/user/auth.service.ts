import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from './user.model';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthService {
  currentUser: IUser;

  constructor(private http: HttpClient) { }

  loginUser(userName: string, password: string) {

    const loginInfo = { username: userName, password: password};
    const options = { headers: new HttpHeaders({'content-type': 'application/json'})};
    return this.http.post('/api/login', loginInfo, options)
    .pipe(tap(data => {
      this.currentUser = <IUser>data['user'];
    }))
    .pipe(catchError(_ => {
      return of(false);
    }));

  }

  checkAuthenticationStatus(): any {
    this.http.get('/api/currentIdentity')
    .pipe(tap(data => {
      if (data instanceof Object) {
      this.currentUser = <IUser>data;
      }
    })).subscribe();
  }

  isAuthenticated(): boolean {
    return this.currentUser !== undefined && this.currentUser !== null;
  }

  updateCurrentUser(firstName: string, lastName: string) {
    const options = { headers: new HttpHeaders({'content-type': 'application/json'})};
    this.currentUser = { ...this.currentUser, firstName: firstName, lastName: lastName };
    return this.http.put(`api/users/${this.currentUser.id}`, this.currentUser, options);
  }

  logout() {
    this.currentUser = undefined;
    const options = { headers: new HttpHeaders({'content-type': 'application/json'})};

    return this.http.post('/api/logout', {}, options);
  }

  // private handleError<T>(operation = 'operation', result: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     return of(result as T);
  //   };
  // }
}
