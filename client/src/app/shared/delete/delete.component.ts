import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  @Input() recipeName: string | undefined;
  @Input() recipeId: string | undefined;
  @Output() hideModal: EventEmitter<any> = new EventEmitter();

  constructor(
    private contentService: ContentService,
    private userService: UserService,
    private router: Router
  ) { }

  hide() {
    this.hideModal.emit();
  }

  deleteRecipe() {
    const data = { recipeId: this.recipeId, user: this.userService.user };

    this.contentService.deleteRecipe(data).subscribe({
      next: () => {
        console.log('Record with id', this.recipeId, 'has been deleted');
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['/recipes']);
      }
    });
  }
}
