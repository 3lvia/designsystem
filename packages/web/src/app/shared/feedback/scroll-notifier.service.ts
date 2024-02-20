import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollNotifierService {
  private scrollEvent = new Subject<void>();

  onScroll = this.scrollEvent.asObservable();

  scrollToFeedback() {
    this.scrollEvent.next();
  }
}
