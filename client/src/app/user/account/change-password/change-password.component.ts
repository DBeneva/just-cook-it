import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { passwordValidator, sameValueAsFactory } from 'src/app/shared/validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  visibleOldPassword: boolean = false;
  visibleNewPassword: boolean = false;
  visibleConfirmPassword: boolean = false;
  error: string = '';
  passwordValidator = passwordValidator;
  killSubscription = new Subject();
  form: FormGroup;

  constructor(private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(5)]],
      newPassword: ['', [Validators.required, Validators.minLength(5), passwordValidator]],
      confirmPassword: ['', [Validators.required, sameValueAsFactory(
        () => this.form ? this.form.get('newPassword') : null, this.killSubscription
      )]]
    });
  }

  changePassword(form) {

  }

  showOldPassword() {
    this.visibleOldPassword = !this.visibleOldPassword;
  }

  showNewPassword() {
    this.visibleNewPassword = !this.visibleNewPassword;
  }

  showConfirmPassword() {
    this.visibleConfirmPassword = !this.visibleConfirmPassword;
  }

  back() {
    this.location.back();
  }
}
