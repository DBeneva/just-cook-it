import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {
  @Input() username: string | undefined;
  @Output() hideModal: EventEmitter<any> = new EventEmitter();

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  hide() {
    this.hideModal.emit();
  }

  deleteAccount() {
    console.log('user in delete account', this.userService.user);
    this.userService.deleteAccount(this.userService.user).subscribe({
      next: () => {
        console.log('Record has been deleted');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        this.router.navigate([`/users/${this.userService.user._id}`]);
      }
    });
  }
}
