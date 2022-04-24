import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent {
  error: string = '';

  constructor(
    private contentService: ContentService,
    private userService: UserService,
    private router: Router
  ) { }

  createRecipe(form: NgForm): void {
    if (form.invalid) return;

    const data = form.value;
    data.user = this.userService.user;

    this.contentService.saveRecipe(data).subscribe({
      next: () => { 
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        console.error(err);
        this.error = err.error.message;
      }
    });
  }
}
