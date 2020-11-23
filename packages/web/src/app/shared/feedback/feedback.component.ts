import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit, OnDestroy {

  webHook = 'https://hooks.slack.com/services/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';

  isEmoji = true;
  isComment = false;
  isSent = false;
  currentEmoji: string;
  routerSubscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe(data => {
      if (data instanceof RoutesRecognized) {
        this.isEmoji = true;
        this.isComment = false;
        this.isSent = false;
      }
    });
  }

  chooseEmoji(emoji: string): void {
    this.currentEmoji = emoji;
    this.isEmoji = false;
    this.isComment = true;
  }

  sendFeedback(comment: string): void {
    this.isComment = false;
    this.isSent = true;
    this.postFeedback(comment);
  }

  postFeedback(comment: string): void {
    if (comment === '') {
      comment = 'No comment';
    }
    let pageUrl;
    if (this.router.url.includes('#')) {
      pageUrl = this.router.url.slice(0, this.router.url.lastIndexOf('#'));
    } else {
      pageUrl = this.router.url.slice(0);
    }

    const message = {
      text: 'FEEDBACK: ' + '(' + pageUrl + ') ' + this.currentEmoji.toUpperCase() + ' - ' + comment
    }

    const options = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/x-www-form-urlencoded' }
      )
    };

    this.http.post(this.webHook, JSON.stringify(message), { ...options, responseType: 'text' }).subscribe();
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
