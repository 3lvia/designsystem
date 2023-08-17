import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import { FeedbackLinkComponent } from './feedback-link/feedback-link.component';
import { EmojiBadComponent } from './emoji-bad/emoji-bad.component';
import { EmojiNeutralComponent } from './emoji-neutral/emoji-neutral.component';
import { EmojiGoodComponent } from './emoji-good/emoji-good.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FeedbackComponent,
    FeedbackLinkComponent,
    EmojiBadComponent,
    EmojiNeutralComponent,
    EmojiGoodComponent,
  ],
  exports: [FeedbackComponent, FeedbackLinkComponent],
})
export class FeedbackModule {}
