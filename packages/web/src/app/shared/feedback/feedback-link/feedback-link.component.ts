import { Component } from '@angular/core';
import { ScrollNotifierService } from '../scroll-notifier.service';

@Component({
  selector: 'app-feedback-link',
  templateUrl: './feedback-link.component.html',
})
export class FeedbackLinkComponent {
  constructor(private scrollService: ScrollNotifierService) {}

  scrollToFeedback(): void {
    this.scrollService.scrollToFeedback();
  }
}
