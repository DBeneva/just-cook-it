import { Component } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import { IRecipe } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.css']
})
export class MyFavoritesComponent {
  myFavorites: IRecipe[] | undefined;
  user = this.userService.user;
  error: string;

  constructor(
    private contentService: ContentService,
    private userService: UserService
  ) {
    setTimeout(() => {
      this.fetchMyFavorites();
    }, 0);
  }

  fetchMyFavorites(): void {
    this.myFavorites = undefined;

    this.contentService.loadMyFavorites(this.user)
      .subscribe({
        next: (recipes) => {
          this.myFavorites = recipes;
        },
        error: (err) => {
          this.error = err.error;
        }
      });
  }
}
