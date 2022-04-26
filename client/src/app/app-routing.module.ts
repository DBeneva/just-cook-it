import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthActivate } from './guards/auth.activate';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditRecipeComponent } from './recipe/edit-recipe/edit-recipe.component';
import { NewRecipeComponent } from './recipe/new-recipe/new-recipe.component';
import { RecipeComponent } from './recipe/recipe/recipe.component';
import { RecipesComponent } from './recipe/recipes/recipes.component';
import { LoginComponent } from './user/login/login.component';
import { AccountComponent } from './user/account/account/account.component';
import { RegisterComponent } from './user/register/register.component';
import { EditAccountComponent } from './user/account/edit-account/edit-account.component';
import { MyRecipesComponent } from './recipe/my-recipes/my-recipes.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'recipes',
    pathMatch: 'full',
    component: RecipesComponent
  },
  {
    path: 'recipes/my-recipes',
    pathMatch: 'full',
    component: MyRecipesComponent
  },
  {
    path: 'recipes/new-recipe',
    pathMatch: 'full',
    component: NewRecipeComponent,
    canActivate: [AuthActivate],
    data: {
      authRequired: true,
      authFailureRedirectUrl: 'login'
    }
  },
  {
    path: 'recipes/:recipeId/edit',
    component: EditRecipeComponent,
    canActivate: [AuthActivate],
    data: {
      authRequired: true,
      authFailureRedirectUrl: 'recipes'
    }
  },
  {
    path: 'recipes/:recipeId',
    component: RecipeComponent,
    canActivate: [AuthActivate],
    data: {
      authRequired: true,
      authFailureRedirectUrl: 'login'
    }
  },
  { 
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthActivate],
    data: {
      authRequired: false,
      authFailureRedirectUrl: 'home'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthActivate],
    data: {
      authRequired: false,
      authFailureRedirectUrl: 'home'
    }
  },
  { 
    path: 'users/:userId',
    component: AccountComponent,
    canActivate: [AuthActivate],
    data: {
      authRequired: true,
      authFailureRedirectUrl: 'login'
    }
  },
  { 
    path: 'users/:userId/edit',
    component: EditAccountComponent,
    canActivate: [AuthActivate],
    data: {
      authRequired: true,
      authFailureRedirectUrl: 'login'
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
