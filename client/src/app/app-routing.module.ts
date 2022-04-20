import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthActivate } from './core/guards/auth.activate';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewRecipeComponent } from './recipe/new-recipe/new-recipe.component';
import { RecipesComponent } from './recipe/recipes/recipes.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'recipes', component: RecipesComponent },
  {
    path: 'new-recipe',
    component: NewRecipeComponent,
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
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthActivate],
    data: {
      authRequired: true,
      authFailureRedirectUrl: 'login'
    }
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
