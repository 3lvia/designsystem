import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject, filter, fromEvent, takeUntil } from 'rxjs';

@Directive({
  selector: '[appTrapFocus]',
})
export class TrapFocusDirective implements AfterViewInit, OnDestroy {
  private unsubscriber = new Subject<void>();

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  ngAfterViewInit() {
    this.trapFocus(this.el.nativeElement);
  }

  private trapFocus(element: HTMLElement) {
    const focusableEls = Array.from(
      element.querySelectorAll(
        'a[href], button, textarea, input[type="text"],' +
          'input[type="radio"], input[type="checkbox"], select',
      ),
    ).filter((el) => 'disabled' in el && !el.disabled);
    const firstFocusableEl = focusableEls[0] as HTMLElement;
    const lastFocusableEl = focusableEls[focusableEls.length - 1] as HTMLElement;

    fromEvent(element, 'keydown')
      .pipe(
        takeUntil(this.unsubscriber),
        filter((ev): ev is KeyboardEvent => ev instanceof KeyboardEvent),
      )
      .subscribe((ev) => {
        const isTabPressed = ev.key.toLowerCase() === 'tab';
        if (!isTabPressed) return;

        if (ev.shiftKey) {
          if (document.activeElement === firstFocusableEl) {
            lastFocusableEl.focus();
            ev.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableEl) {
            firstFocusableEl.focus();
            ev.preventDefault();
          }
        }
      });
  }
}
