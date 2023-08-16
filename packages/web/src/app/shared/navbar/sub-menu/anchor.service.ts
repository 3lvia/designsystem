import { Injectable } from '@angular/core';
import { Locale } from 'src/app/core/services/localization.service';

export interface Anchor {
  name: string;
  top: number;
}

@Injectable({
  providedIn: 'root',
})
export class AnchorService {
  getAnchors(locale: Locale): Anchor[] {
    const overviewTitle = locale === Locale['nb-NO'] ? 'Oversikt' : 'Overview';
    const elements = document.querySelectorAll<HTMLElement>('[data-url-fragment]');

    if (elements.length) {
      elements.forEach((anchor, index) => {
        anchor.setAttribute('id', index === 0 ? overviewTitle : anchor.innerText);
      });
      const anchors: Anchor[] = Array.from(elements).map((element, index) => ({
        name: index === 0 ? overviewTitle : element.innerText,
        top: element.offsetTop,
      }));

      return anchors;
    }

    return [];
  }
}
