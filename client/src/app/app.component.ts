import { Component, OnInit } from '@angular/core';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const userCookie = document.cookie;
    console.log('userCookie', userCookie);
    const username = userCookie ? userCookie.split(':"')[1].slice(0, -2) : '';

    if (username) {
      try {
        this.userService.user = username; 
      } catch (err) {
        console.log(err);
      }
    }
  }  
}
