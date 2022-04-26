import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomValidatorDirective } from './custom-validator.directive';


@NgModule({
  declarations: [CustomValidatorDirective],
  imports: [
    CommonModule
  ],
  exports: [
    CustomValidatorDirective
  ]
})
export class SharedModule { }
