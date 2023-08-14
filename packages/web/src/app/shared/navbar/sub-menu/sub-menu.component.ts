import { Component, NgZone } from '@angular/core';
import { fromEvent, merge, switchMap, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { AnchorService } from './anchor.service';
import { NavbarAnchor } from '../types';
import { trigger, transition, stagger, animate, style, query } from '@angular/animations';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { CMSService } from '../../../core/services/cms/cms.service';

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
})
export class SubMenuComponent {
  anchors: NavbarAnchor[] = [];
  currentPage = '';
  activeAnchorPos = 0;

  constructor(
    private location: Location,
    anchorService: AnchorService,
    localization: LocalizationService,
    cmsService: CMSService,
    zone: NgZone,
  ) {
    /**
     * Fetch sub items from the DOM both when localization has changed,
     * and when content has been fetched from the CMS.
     **/
    merge(localization.listenLocalization(), cmsService.listenContentLoadedFromCMS())
      .pipe(
        takeUntilDestroyed(),
        switchMap(() => zone.onStable.pipe(take(1))),
      )
      .subscribe(() => {
        // We reverse the list to find active anchor, searching last to first
        this.anchors = anchorService.getVisibleAnchors().slice().reverse() || [];
        this.setActiveAnchorFromUrl(location.path(true));
      });
    this.currentPage = location.path();
    this.setActiveAnchor();
  }

  scrollTo(anchor: NavbarAnchor): void {
    this.location.replaceState(`${this.currentPage}#${anchor.title}`);
    window.scrollTo({ top: anchor.top, behavior: 'smooth' });
  }

  private setActiveAnchorFromUrl(url: string): void {
    const fragment = url.split('#')[1];

    if (fragment) {
      this.activeAnchorPos =
        this.anchors.find((a) => a.title.toLowerCase() === fragment.toLowerCase())?.top || 0;
    }
  }

  private setActiveAnchor(): void {
    fromEvent(window, 'scroll')
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        // This extra padding triggers the anchor activation
        // before the title is at the absolute top of the page.
        const extraAnchorPadding = 100;
        const activeAnchor = this.anchors.find((a) => a.top - extraAnchorPadding < window.scrollY);

        if (activeAnchor && activeAnchor.top !== this.activeAnchorPos) {
          this.activeAnchorPos = activeAnchor.top || 0;
          this.location.replaceState(`${this.currentPage}#${activeAnchor.title}`);
        }
      });
  }
}
