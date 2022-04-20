import { Component } from '@angular/core';
import { ContentService } from 'src/app/core/services/content.service';
import { UserService } from 'src/app/core/services/user.service';
import { IRecipe } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  recipes: IRecipe[] | undefined;
  user = this.userService.user;

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  constructor(
    private contentService: ContentService,
    private userService: UserService
  ) {
    console.log('in recipes component');
    
    this.fetchRecipes();
    console.log(this.recipes);
  }

  fetchRecipes(): void {
    this.recipes = undefined;
    console.log('in fetch recipes', this.user);
    this.contentService.loadRecipes(this.user)
    .subscribe(recipes => {
      this.recipes = recipes;
    });
  }  

}
