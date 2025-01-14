import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Location, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { first, fromEvent, of, switchMap } from 'rxjs';

import { CMSService } from 'src/app/core/services/cms/cms.service';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';

export interface Anchor {
  name: string;
  top: number;
}

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, translate: '0 -2px' }),
            stagger(70, [animate('0.2s', style({ opacity: 1, translate: 0 }))]),
          ],
          {
            optional: true,
          },
        ),
      ]),
    ]),
  ],
  imports: [NgClass],
})
export class SubMenuComponent {
  anchors: Anchor[] = [];
  activeAnchor = '';

  constructor(
    private router: Router,
    private location: Location,
    private cmsService: CMSService,
    changeDetectorRef: ChangeDetectorRef,
    localization: LocalizationService,
    zone: NgZone,
  ) {
    this.setActiveAnchorOnScroll();
    this.scrollToCorrectAnchorOnPageLoad();

    /**
     * A couple of steps is required to safely retrieve sub menu items:
     *  1. If the page comes from the CMS, wait for it to be loaded. If
     *     the page is client side only, proceed immediately to the next step.
     *  2. Switch the observable to listen for localization changes
     *  3. When localization changes, wait for the DOM to stabilize
     *     before retrieving the anchor elements from the DOM.
     **/
    this.cmsService
      .listenCurrentRouteIsCms()
      .pipe(
        switchMap((isCms) => {
          if (isCms) {
            return this.cmsService.listenContentLoadedFromCMS();
          }
          return of(undefined);
        }),
        switchMap(() => localization.listenLocalization()),
        takeUntilDestroyed(),
        switchMap(() => zone.onStable.pipe(first())),
      )
      .subscribe(() => {
        this.anchors = this.getAnchors(localization.getCurrentLocalization());
        // @ts-expect-error TS2322 (LEGO-3683)
        this.activeAnchor = this.anchors[0]?.name;
        changeDetectorRef.detectChanges();
      });
  }

  goToFragment(id: string): void {
    this.router.navigateByUrl(`${this.location.path()}#${id}`, {
      replaceUrl: true,
    });
  }

  private scrollToCorrectAnchorOnPageLoad() {
    const fragment = location.hash.substring(1);

    if (fragment) {
      this.goToFragment(fragment);
    }
  }

  private setActiveAnchorOnScroll(): void {
    fromEvent(window, 'scroll')
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        // This extra padding triggers the anchor activation
        // before the title is at the absolute top of the page.
        const extraAnchorPadding = 128;
        const activeAnchor = this.anchors
          .slice()
          .reverse()
          .find((a) => a.top - extraAnchorPadding <= window.scrollY);

        if (activeAnchor && activeAnchor.name !== this.activeAnchor) {
          this.activeAnchor = activeAnchor.name;
          this.location.replaceState(`${this.location.path()}#${activeAnchor.name}`);
        }
      });
  }

  private getAnchors(locale: Locale): Anchor[] {
    const overviewTitle = locale === 'nb-NO' ? 'Oversikt' : 'Overview';
    const elements = document.querySelectorAll<HTMLElement>('[data-url-fragment]');

    if (elements.length > 1) {
      elements.forEach((anchor, index) => {
        anchor.setAttribute('id', index === 0 ? overviewTitle : anchor.innerText);
      });

      const anchors: Anchor[] = Array.from(elements).map((element, index) => ({
        name: index === 0 ? overviewTitle : element.innerText,
        top: (element.parentElement as HTMLElement)?.offsetTop,
      }));

      return anchors;
    }

    return [];
  }
}
