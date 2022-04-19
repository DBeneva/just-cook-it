import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

const API_URL = environment.apiURL;


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser | null | undefined = undefined;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    console.log(username, 'is logging in with password', password, '(user service)');

    return this.http.post<IUser>(`${API_URL}/auth/login`, { username, password })
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

  register(user: { username: string; email: string; password: string }) {
        return this.http.post<IUser>(`${API_URL}/auth/register`, user)
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

  getProfileInfo() {
        return this.http.get<IUser>(`${API_URL}/auth/profile`)
          .pipe(tap((user) => this.user = user));
      }

  logout() {
        document.cookie = `USER=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        return this.http.get(`${API_URL}/auth/logout`).pipe(
          tap(() => this.user = null)
        );
      }

  updateProfile(user: { username: string; email: string; tel: string }) {
        return this.http.put<IUser>(`${API_URL}/auth/login`, user).pipe(
          tap((user) => this.user = user)
        );
      }
}
