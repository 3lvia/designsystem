import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { ScrollNotifierService } from '../scroll-notifier.service';

@Component({
  selector: 'app-feedback-link',
  templateUrl: './feedback-link.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeedbackLinkComponent {
  constructor(private scrollService: ScrollNotifierService) {}

  scrollToFeedback(): void {
    this.scrollService.scrollToFeedback();
  }
}
