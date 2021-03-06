import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

const API_URL = environment.apiURL;


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser | undefined = undefined;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post<IUser>(`${API_URL}/auth/login`, data)
      .pipe(
        tap(user => {
          document.cookie = `USER=${JSON.stringify(user)}`;
          this.user = user;
        }),
        catchError(error => {
          throw error;
        })
      );
  }

  register(data: any) {
    return this.http.post<IUser>(`${API_URL}/auth/register`, data, {
      headers: new HttpHeaders({
        'x-authorization': data.user ? data.user.token : ''
      })
    })
      .pipe(
        tap(user => {
          this.user = user;
          document.cookie = `USER=${JSON.stringify(user)}`;
        }),
        catchError(error => {
          throw error;
        })
      );
  }

  changePassword(data: any) {
    return this.http.put<IUser>(`${API_URL}/users/${data.user._id}/change-password`, data, {
      headers: new HttpHeaders({
        'x-authorization': data.user ? data.user.token : ''
      })
    })
      .pipe(
        tap(user => {
          this.user = user;
          document.cookie = `USER=${JSON.stringify(user)}`;
        }),
        catchError(error => {
          throw error;
        })
      );
  }

  logout() {
    document.cookie = 'USER=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';

    return this.http.get(`${API_URL}/auth/logout`).pipe(
      tap(() => this.user = undefined)
    );
  }

  updateAccount(data: any) {
    return this.http.put<IUser>(`${API_URL}/users/${data.user._id}`, data.accountData, {
      headers: new HttpHeaders({
        'x-authorization': data.user ? data.user.token : ''
      })
    })
      .pipe(
        tap((user) => {
          this.user = user;
          document.cookie = `USER=${JSON.stringify(user)}`;
        }),
        catchError(error => {
          throw error;
        })
      );
  }

  deleteAccount(user: IUser) {
    console.log('in delete userService', user);
    return this.http.delete<IUser>(`${API_URL}/users/${user._id}`, {
      headers: new HttpHeaders({
        'x-authorization': user ? user.token : ''
      })
    })
      .pipe(
        tap(() => {
          document.cookie = 'USER=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
          this.user = undefined;
        }),
        catchError(error => {
          throw error;
        })
      );
  }
}
