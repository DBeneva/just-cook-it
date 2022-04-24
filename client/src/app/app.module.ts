import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
import { SharedModule } from './shared/shared.module';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthActivate } from './guards/auth.activate';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    UserModule,
    RecipeModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    AuthActivate
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
