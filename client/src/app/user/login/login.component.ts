import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { emailValidator } from 'src/app/shared/validators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  form: FormGroup;
  emailValidator = emailValidator;  

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
      this.form = this.fb.group({
        email: ['', [Validators.required, emailValidator]],
        password: ['', [Validators.required, Validators.minLength(5)]]
      });
    }

    login(form: NgForm): void {
      if (form.invalid) { return; }
  
      const { username, password } = form.value;
      this.userService.login({ username, password }).subscribe({
        next: () => {
          const redirectUrl = this.activatedRoute.snapshot.queryParams.redirectUrl || '/';
          this.router.navigate([redirectUrl]);
        },
        error: (err) => { console.log(err); }
      });
    }
}
