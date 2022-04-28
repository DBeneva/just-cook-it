import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeComponent } from './recipe/recipe.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { DeleteRecipeComponent } from './delete-recipe/delete-recipe.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';
import { LoadingRecipesComponent } from './loading/loading-recipes/loading-recipes.component';
import { LoadingRecipeComponent } from './loading/loading-recipe/loading-recipe.component';



@NgModule({
  declarations: [
    RecipesComponent,
    RecipeComponent,
    NewRecipeComponent,
    EditRecipeComponent,
    DeleteRecipeComponent,
    MyRecipesComponent,
    MyFavoritesComponent,
    LoadingRecipesComponent,
    LoadingRecipeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule
  ]
})
export class RecipeModule { }
