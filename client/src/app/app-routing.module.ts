import { NgModule } from '@angular/core';
import { Routes, RouterModule, NavigationEnd } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthActivate } from './guards/auth.activate';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditRecipeComponent } from './recipe/edit-recipe/edit-recipe.component';
import { NewRecipeComponent } from './recipe/new-recipe/new-recipe.component';
import { RecipeComponent } from './recipe/recipe/recipe.component';
import { RecipesComponent } from './recipe/recipes/recipes.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';


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
    path: 'recipes/:recipeId',
    pathMatch: 'full',
    component: RecipeComponent,
    canActivate: [AuthActivate],
    data: {
      authRequired: true,
      authFailureRedirectUrl: 'login'
    }
  },
  {
    path: 'recipes/:recipeId/edit',
    pathMatch: 'full',
    component: EditRecipeComponent
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
    path: 'profile',
    component: ProfileComponent,
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
