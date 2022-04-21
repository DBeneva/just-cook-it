import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IRecipe, IUser } from 'src/app/shared/interfaces';

const API_URL = environment.apiURL;


@Injectable({
  providedIn: 'root'
})

export class ContentService {

  constructor(private http: HttpClient) { }
  
  loadRecipe(id: string, user) {
    return this.http.get<IRecipe>(`${API_URL}/recipes/${id}`, {
      headers: new HttpHeaders({
        'x-authorization': user ? user.token : ''
      })
    });
  }

  loadRecipes(user: IUser) {
    return this.http.get<IRecipe[]>(`${API_URL}/recipes`, {
      headers: new HttpHeaders({
        'x-authorization': user ? user.token : ''
      })
    });
  }
  
  saveRecipe(data: any) {
    return this.http.post<IRecipe>(`${API_URL}/recipes`, data, {
      headers: new HttpHeaders({
        'x-authorization': data.user ? data.user.token : ''
      })
    });
  }

  likeRecipe(recipeId: string) {
    return this.http.put<IRecipe>(`${API_URL}/recipes/${recipeId}`, {});
  }

  unlikeRecipe(recipeId: string) {
    return this.http.put<IRecipe>(`${API_URL}/recipes/${recipeId}/unlike`, {});
  }
}