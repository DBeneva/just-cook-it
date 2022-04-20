import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get username(): string {
    return this.userService.user || '';
  }
  
  errorMessage: string;
  
  constructor(
    private userService: UserService,
    private router: Router,
    activatedRoute: ActivatedRoute
    ) {
    console.log(this.username);
    this.errorMessage = activatedRoute.snapshot.queryParams.error;
  }

  logout(): void {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
