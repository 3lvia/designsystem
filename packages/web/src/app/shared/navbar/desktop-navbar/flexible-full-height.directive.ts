import { Directive, HostBinding, NgZone } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { first, fromEvent, switchMap } from 'rxjs';
import { CMSService } from 'src/app/core/services/cms/cms.service';

/**
 * This directive ensure that the desktop navbar never is too
 * tall for the screen.
 */
@Directive({
  selector: '[appFlexibleFullHeight]',
  standalone: true,
})
export class FlexibleFullHeightDirective {
  private footerHeight = document.querySelector('app-footer')?.clientHeight ?? 0;
  private offsetTop = '128px';
  private distanceFromBottom = '0px';

  @HostBinding('style.max-height')
  get maxHeight() {
    return `calc(100vh - ${this.offsetTop} - ${this.distanceFromBottom})`;
  }

  constructor(cmsService: CMSService, zone: NgZone) {
    /**
     * Update after the CMS content loads and the DOM is stable
     */
    cmsService
      .listenContentLoadedFromCMS()
      .pipe(
        takeUntilDestroyed(),
        switchMap(() => zone.onStable.pipe(first())),
      )
      .subscribe(() => this.setDistanceFromBottom());

    zone.onStable.pipe(first()).subscribe(() => this.setDistanceFromBottom());

    this.setDistanceFromBottomOnScroll();
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
