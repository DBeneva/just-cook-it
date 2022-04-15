import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

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

  login(user: { username: string; password: string }) {
    return this.http.post<IUser>(`${API_URL}/auth/login`, user).pipe(
      tap((user) => this.user = user)
    );
  }

  register(user: { username: string; email: string; password: string; repass: string }) {
    return this.http.post<IUser>(`${API_URL}/auth/register`, user).pipe(
      tap((user) => this.user = user)
    );
  }

  getProfileInfo() {
    return this.http.get<IUser>('/api/users/profile').pipe(
      tap((user) => this.user = user)
    );
  }

  logout() {
    return this.http.post<IUser>('/api/logout', {}).pipe(
      tap(() => this.user = null)
    );
  }

  updateProfile(user: { username: string; email: string; tel: string }) {
    return this.http.put<IUser>('/api/users/profile', user).pipe(
      tap((user) => this.user = user)
    );
  }
}
