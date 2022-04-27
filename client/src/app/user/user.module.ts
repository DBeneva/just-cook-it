import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account/account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { EditAccountComponent } from './account/edit-account/edit-account.component';
import { DeleteAccountComponent } from './account/delete-account/delete-account.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';


@NgModule({
  declarations: [RegisterComponent, LoginComponent, AccountComponent, EditAccountComponent, DeleteAccountComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class UserModule { }
