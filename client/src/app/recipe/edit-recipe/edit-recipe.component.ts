import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import { IRecipe, IUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})

export class EditRecipeComponent {
  user: IUser = this.userService.user;
  recipeId: string = this.activatedRoute.snapshot.params.recipeId;
  recipe: IRecipe;
  recipeData: IRecipe;
  error: string;

  constructor(
    private contentService: ContentService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.loadRecipe();
  }

  loadRecipe() {
    this.contentService
      .loadRecipe({ recipeId: this.recipeId, user: this.user })
      .subscribe({
        next: (recipe) => {
          this.recipe = recipe;
        },
        error: (error) => {
          this.error = error.message;
        }
      });
  }

  editRecipe(form: NgForm): void {
    if (form.invalid) return;

    this.recipeData = form.form.value;
    console.log('in edit recipe recipeId, recipeData', { ...this.recipeData, owner: this.user });
    const data: any = { recipeId: this.recipeId, recipeData: { ...this.recipeData, owner: this.user }, user: this.user };
    
    this.contentService.updateRecipe(data).subscribe({
      next: () => {
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        console.error(err);
        this.error = err.error;
      }
    });
  }
}
