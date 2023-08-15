import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RoutesRecognized } from '@angular/router';
import { ScrollNotifierService } from './scroll-notifier.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {
  @ViewChild('feedbackContainer') feedbackContainer: ElementRef<HTMLDivElement>;
  webHook = 'https://hooks.slack.com/services/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';

  isEmoji = true;
  isComment = false;
  isSent = false;
  currentEmoji: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private scrollNotifierService: ScrollNotifierService,
  ) {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.resetFeedback();
      }
    });

    this.scrollNotifierService.onScroll.pipe(takeUntilDestroyed()).subscribe(() => {
      this.feedbackContainer.nativeElement.scrollIntoView({ behavior: 'smooth' });
    });
  }

  resetFeedback(): void {
    this.isEmoji = true;
    this.isComment = false;
    this.isSent = false;
  }

  chooseEmoji(emoji: string): void {
    this.currentEmoji = emoji;
    this.isEmoji = false;
    this.isComment = true;
  }

  sendFeedback(comment: string): void {
    this.isComment = false;
    this.isSent = true;
    this.postFeedbackToSlack(comment);
    setTimeout(() => this.resetFeedback(), 10000);
  }

  getPageUrl(): string {
    let pageUrl;
    if (this.router.url.includes('#')) {
      pageUrl = this.router.url.slice(0, this.router.url.lastIndexOf('#'));
    } else {
      pageUrl = this.router.url.slice(0);
    }
    return pageUrl;
  }

  getEmojiString(): string {
    let emojiString;
    if (this.currentEmoji === 'good') {
      emojiString = this.currentEmoji + ' 🟢';
    } else if (this.currentEmoji === 'neutral') {
      emojiString = this.currentEmoji + ' ⚪';
    } else {
      emojiString = this.currentEmoji + ' 🔴';
    }
    return emojiString;
  }

  getBinder(comment: string): string {
    let dash = '';
    if (comment !== '') {
      dash = '-';
    }
    return dash;
  }

  postFeedbackToSlack(comment: string): void {
    const message = {
      text: `${this.getPageUrl()}: ${this.getEmojiString().toUpperCase()} ${this.getBinder(
        comment,
      )} ${comment}`,
    };

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
    };

    this.http.post(this.webHook, JSON.stringify(message), { ...options, responseType: 'text' }).subscribe();
  }
}
