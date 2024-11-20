import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';

import { ScrollNotifierService } from '../scroll-notifier.service';

@Component({
  selector: 'app-feedback-link',
  templateUrl: './feedback-link.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeedbackLinkComponent {
  private scrollService = inject(ScrollNotifierService);


  scrollToFeedback(): void {
    this.scrollService.scrollToFeedback();
  }
}
