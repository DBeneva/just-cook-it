import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { emailValidator, passwordValidator, sameValueAsFactory } from 'src/app/shared/validators';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
  killSubscription = new Subject();
  form: FormGroup;
  emailValidator = emailValidator;
  passwordValidator = passwordValidator;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, passwordValidator]],
      repass: ['', [Validators.required, sameValueAsFactory(
        () => this.form ? this.form.get('password') : null, this.killSubscription
      )]]
    });
  }

  register(): void {
    if (this.form.invalid) { return; }
    console.log(`${this.form.value.code}`);

    const { username, email, password, repass } = this.form.value;
    this.userService.register({ username, email, password, repass }).subscribe({
      next: () => { this.router.navigate(['/']) },
      error: (err) => { console.error(err) }
    });
  }

  ngOnDestroy() {
    this.killSubscription.next();
    this.killSubscription.complete();
  }
}
