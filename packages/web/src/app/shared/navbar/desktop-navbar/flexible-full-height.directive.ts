import { Directive, HostBinding, OnDestroy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

/**
 * This directive ensure that the desktop navbar never is too
 * tall for the screen.
 */
@Directive({
  selector: '[appFlexibleFullHeight]',
  standalone: true,
})
export class FlexibleFullHeightDirective implements OnDestroy {
  private observer: MutationObserver | undefined;
  private footerHeight = document.querySelector('app-footer')?.clientHeight ?? 0;
  private offsetTop = '128px';
  private distanceFromBottom = '0px';

  @HostBinding('style.max-height')
  get maxHeight() {
    return `calc(100vh - ${this.offsetTop} - ${this.distanceFromBottom})`;
  }

  constructor() {
    this.observer = new MutationObserver(() => this.setDistanceFromBottom());
    const pageContent = document.querySelector('[data-page-content]');
    if (pageContent) {
      this.observer.observe(pageContent, { subtree: true, childList: true });
    }

    this.setDistanceFromBottomOnScroll();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setDistanceFromBottomOnScroll(): void {
    fromEvent(window, 'scroll')
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.setDistanceFromBottom();
      });
  }

  private setDistanceFromBottom(): void {
    const scrollBottom = document.body.scrollHeight - (window.innerHeight + window.scrollY);
    const minOffsetBottom = 32;
    this.distanceFromBottom = `${Math.max(minOffsetBottom, this.footerHeight - scrollBottom)}px`;
  }
}
