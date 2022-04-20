import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/core/services/content.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent {

  constructor(
    private contentService: ContentService,
    private router: Router
  ) { }

  createTheme(form: NgForm): void {
    if (form.invalid) return;

    this.contentService.saveRecipe(form.value).subscribe({
      next: () => { 
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
