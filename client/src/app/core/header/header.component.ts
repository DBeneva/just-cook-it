import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  get user(): IUser {
    return this.userService.user;
  };

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get username(): string {
    return this.user ? this.user.username : '';
  }

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  logout(): void {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
