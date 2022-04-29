import { Location } from '@angular/common';
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
  user = this.userService.user;
  isDeletingRecipe = false;
  error: string = '';
  
  constructor(
    private contentService: ContentService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
    ) {
      setTimeout(() => {
        this.fetchRecipe();
      }, 0);
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

  likeRecipe(recipeId: string): void {
    const data = { recipeId, user: this.user };

    this.contentService.likeRecipe(data).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        console.log('recipe has liked', this.recipe.hasLiked);
        this.router.navigate([`/recipes/${this.recipe._id}`]);
      },
      error: (err) => {
        console.log('error in recipe component like', err);
        this.error = err.error;
      }
    });
  }

  unlikeRecipe(recipeId: string): void {
    const data = { recipeId, user: this.user };

    this.contentService.unlikeRecipe(data).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        this.router.navigate([`/recipes/${this.recipe._id}`]);
      },
      error: (err) => {
        console.log('error in recipe component unlike', err);
        this.error = err.message;
      }
    });
  }

  back() {
    this.location.back();
  }
}
