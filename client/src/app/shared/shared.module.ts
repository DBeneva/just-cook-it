import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomValidatorDirective } from './custom-validator.directive';
import { DeleteComponent } from './delete/delete.component';



@NgModule({
  declarations: [CustomValidatorDirective, DeleteComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CustomValidatorDirective,
    DeleteComponent
  ]
})
export class SharedModule { }
