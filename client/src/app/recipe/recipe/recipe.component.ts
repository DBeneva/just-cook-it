import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import { IRecipe } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})

export class RecipeComponent {
  recipe: IRecipe;
  isLogged = this.userService.isLogged;
  user = this.userService.user;
  isDeletingRecipe = false;
  previousUrl: string;
  error: string = '';
  
  constructor(
    private contentService: ContentService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {
      this.fetchRecipe();
  }

  fetchRecipe(): void {
    this.recipe = undefined;
    const recipeId = this.activatedRoute.snapshot.params.recipeId;
    const data = { recipeId, user: this.user };

    this.contentService.loadRecipe(data).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
      },
      error: (err) => {
        console.log(err);
        this.error = err.message;
      }
    });
  }

  showDeleteModal(show: boolean): void {
    this.isDeletingRecipe = show;
  }

  likeRecipe(recipeId) {
    const data = { recipeId, user: this.user };

    this.contentService.likeRecipe(data).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
      },
      error: (err) => {
        console.log('error in recipe component like', err);
        this.error = err.error;
      }
    });
  }  
}
