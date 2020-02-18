import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDocComponent } from './button-doc.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ButtonDocComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ButtonDocModule { }
