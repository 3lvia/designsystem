import { Component } from '@angular/core';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-feedback-link',
  templateUrl: './feedback-link.component.html',
  styleUrls: ['./feedback-link.component.scss'],
})
export class FeedbackLinkComponent {
  constructor(private scrollService: ScrollService) {}
  scrollToFeedback(): void {
    const offsetTop = document.body.scrollHeight;
    this.scrollService.scrollToElement(offsetTop);
  }
}
