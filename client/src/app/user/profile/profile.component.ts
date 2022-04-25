import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: IUser = { username: 'Gosho', email: 'gosho@gmail.com', recipes: [], likedRecipes: [], _id: '1234', token: 'bla' };
  
  constructor() { }

  ngOnInit() {
  }

}
