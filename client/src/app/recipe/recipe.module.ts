import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeComponent } from './recipe/recipe.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [RecipesComponent, RecipeComponent, NewRecipeComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class RecipeModule { }
