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
  
  loadRecipe(data: any) {
    return this.http.get<IRecipe>(`${API_URL}/recipes/${data.recipeId}`, {
      headers: new HttpHeaders({
        'x-authorization': data.user ? data.user.token : ''
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

  loadMyRecipes(user: IUser) {
    return this.http.get<IRecipe[]>(`${API_URL}/recipes/my-recipes`, {
      headers: new HttpHeaders({
        'x-authorization': user ? user.token : ''
      })
    });
  }

  loadMyFavorites(user: IUser) {
    return this.http.get<IRecipe[]>(`${API_URL}/recipes/my-favorites`, {
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

  updateRecipe(data: any) {
    return this.http.put<IRecipe>(`${API_URL}/recipes/${data.recipeId}`, data.recipeData, {
      headers: new HttpHeaders({
        'x-authorization': data.user ? data.user.token : ''
      })
    });
  }

  deleteRecipe(data: any) {
    console.log('deleting in content service', data.recipeId);
    return this.http.delete<IRecipe>(`${API_URL}/recipes/${data.recipeId}`, {
      headers: new HttpHeaders({
        'x-authorization': data.user ? data.user.token : ''
      })
    });
  }

  likeRecipe(data: any) {
    return this.http.put<IRecipe>(`${API_URL}/recipes/${data.recipeId}/like`, {}, {
      headers: new HttpHeaders({
        'x-authorization': data.user ? data.user.token : ''
      })
    });
  }

  unlikeRecipe(data: any) {
    return this.http.put<IRecipe>(`${API_URL}/recipes/${data.recipeId}/unlike`, {}, {
      headers: new HttpHeaders({
        'x-authorization': data.user ? data.user.token : ''
      })
    });
  }
}