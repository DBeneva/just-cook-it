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
    const user = document.cookie ? JSON.parse(document.cookie.split('USER=')[1]) : '';

    if (user) {
      try {
        this.userService.user = user;
      } catch (err) {
        console.log(err);
      }
    }
  }  
}
