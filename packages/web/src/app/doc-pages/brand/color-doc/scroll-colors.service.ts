import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollColorsService {
  private scrollEvent = new Subject<void>();

  onScroll = this.scrollEvent.asObservable();

  scrollToTokens() {
    this.scrollEvent.next();
  }
}
