import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeComponent } from './recipe/recipe.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';



@NgModule({
  declarations: [RecipesComponent, RecipeComponent, NewRecipeComponent],
  imports: [
    CommonModule
  ]
})
export class RecipeModule { }
