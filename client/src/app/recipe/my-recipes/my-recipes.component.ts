import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import { IRecipe } from 'src/app/shared/interfaces';


@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})
export class MyRecipesComponent {
  myRecipes: IRecipe[] | undefined;
  user = this.userService.user;
  error: string;

  constructor(
    private contentService: ContentService,
    private userService: UserService,
    private location: Location
  ) {
    setTimeout(() => {
      this.fetchMyRecipes();
    }, 0);
  }

  fetchMyRecipes(): void {
    this.myRecipes = undefined;

    this.contentService.loadMyRecipes(this.user)
      .subscribe({
        next: (recipes) => {
          this.myRecipes = recipes;
        },
        error: (err) => {
          this.error = err.error;
        }
      });
  }

  back() {
    this.location.back();
  }
}
