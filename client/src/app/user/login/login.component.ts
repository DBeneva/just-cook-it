import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  login(email: string, password: string): void {
    this.userService.login({ email, password });
    const redirectUrl = this.activatedRoute.snapshot.queryParams.redirectUrl || '/';
    this.router.navigate([redirectUrl]);
  }
}
