import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartphoneComponent } from './smartphone.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [SmartphoneComponent],
  exports: [SmartphoneComponent]
})
export class SmartphoneModule { }
