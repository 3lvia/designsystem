import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FeedbackComponent],
  exports: [FeedbackComponent],
})
export class FeedbackModule {}
