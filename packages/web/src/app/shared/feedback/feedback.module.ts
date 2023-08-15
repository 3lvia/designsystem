import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import { FeedbackLinkComponent } from './feedback-link/feedback-link.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FeedbackComponent, FeedbackLinkComponent],
  exports: [FeedbackComponent, FeedbackLinkComponent],
})
export class FeedbackModule {}
