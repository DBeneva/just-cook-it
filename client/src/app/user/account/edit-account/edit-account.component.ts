import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/shared/interfaces';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})

export class EditAccountComponent {
  error: string;
  isDeletingAccount: boolean = false;

  get user(): IUser {
    return this.userService.user;
  };
  
  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location
  ) { }

  editAccount(form: NgForm): void {
    if (form.invalid) return;

    const data = {
      accountData: form.form.value,
      user: this.user
    };

    console.log('edit account component, data', data);
    
    this.userService.updateAccount(data).subscribe({
      next: (user) => {
        console.log('edit account component, user', user);
        this.userService.user = user;
        this.router.navigate([`/users/${this.user._id}`]);
      },
      error: (err) => {
        console.error(err);
        this.error = err.error.message;
      }
    });
  }

  back() {
    this.location.back();
  }

  showDeleteModal(show: boolean): void {
    this.isDeletingAccount = show;
  }
}
