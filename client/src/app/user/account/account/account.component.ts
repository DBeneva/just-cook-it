import { Component } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  get user(): IUser {
    return this.userService.user;
  };
  
  constructor(
    private userService: UserService,
    private location: Location
  ) { }

  back() {
    this.location.back();
  }
}
