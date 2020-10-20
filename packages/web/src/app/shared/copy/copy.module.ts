import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyComponent } from './copy.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [CopyComponent],
  declarations: [CopyComponent],
})
export class CopyModule { }
