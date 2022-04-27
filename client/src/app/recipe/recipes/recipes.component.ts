import { Component } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import { IRecipe } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  recipes: IRecipe[] | undefined;
  user = this.userService.user;

  constructor(
    private contentService: ContentService,
    private userService: UserService
  ) {
    setTimeout(() => {
      this.fetchRecipes();
    }, 500);
  }

  fetchRecipes(): void {
    this.recipes = undefined;

    this.contentService.loadRecipes(this.user)
      .subscribe(recipes => {
        this.recipes = recipes;
      });
  }
}
