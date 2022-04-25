import { Component } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces';
import { Location } from '@angular/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: IUser = { username: 'Gosho', email: 'gosho@gmail.com', recipes: [], likedRecipes: [], _id: '1234', token: 'bla' };
  
  constructor(private location: Location) { }

  back() {
    this.location.back();
  }
}
