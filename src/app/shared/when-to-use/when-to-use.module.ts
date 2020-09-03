import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhenToUseComponent } from './when-to-use.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [WhenToUseComponent],
  exports: [WhenToUseComponent],
})
export class WhenToUseModule { }
