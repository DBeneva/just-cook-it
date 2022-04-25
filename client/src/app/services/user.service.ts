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
    return this.http.post<IUser>(`${API_URL}/auth/login`, data, {
      headers: new HttpHeaders({
        'x-authorization': data.user ? data.user.token : ''
      })
    })
      .pipe(
        tap(user => {
          document.cookie = `USER=${JSON.stringify(user)}`;
          console.log('cookie in user service login', document.cookie);
          this.user = user;
          console.log('user in user service login', this.user);
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
          document.cookie = 'USER=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
          document.cookie = `USER=${JSON.stringify(user)}`;
        }),
        catchError(error => {
          throw error;
        })
      );
  }
}
