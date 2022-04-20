import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IRecipe } from 'src/app/shared/interfaces';

const API_URL = environment.apiURL;


@Injectable({
  providedIn: 'root'
})

export class ContentService {

  constructor(private http: HttpClient) { }
  
  loadRecipe(id: string) {
    return this.http.get<IRecipe>(`${API_URL}/recipes/${id}`);
  }

  loadRecipes() {
    return this.http.get<IRecipe[]>(`${API_URL}/recipes`);
  }
  
  saveRecipe(data: any) {
    return this.http.post<IRecipe>(`${API_URL}/recipes`, data);
  }

  likeRecipe(recipeId: string) {
    return this.http.put<IRecipe>(`${API_URL}/recipes/${recipeId}`, {});
  }

  unlikeRecipe(recipeId: string) {
    return this.http.put<IRecipe>(`${API_URL}/recipes/${recipeId}/unlike`, {});
  }
}