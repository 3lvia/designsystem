import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavbarAnchor } from '../types';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';

@Injectable({
  providedIn: 'root',
})
export class AnchorService {
  private localizedOverview = 'Overview';

  constructor(private localizationService: LocalizationService) {
    this.localizationService
      .listenLocalization()
      .pipe(takeUntilDestroyed())
      .subscribe((localization) => {
        switch (localization) {
          case Locale['nb-NO']:
            this.localizedOverview = 'Oversikt';
            break;
          default:
            this.localizedOverview = 'Overview';
            break;
        }
      });
  }

  getVisibleAnchors(): NavbarAnchor[] {
    const elements = document.querySelectorAll('.elvis-anchor');
    const elementTitles = document.querySelectorAll('.elvis-anchor-title');

    if (elements.length && elementTitles.length) {
      const anchors: NavbarAnchor[] = [{ title: this.localizedOverview, top: 0 }].concat(
        Array.from(elements).map((element, index) => ({
          title: (elementTitles.item(index) as HTMLElement).innerText,
          top: (element as HTMLElement).offsetTop - 60,
        })),
      );

      return anchors;
    }

    return [];
  }
}
