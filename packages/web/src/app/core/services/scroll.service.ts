import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject } from 'rxjs';
import { NavbarAnchor } from 'src/app/shared/shared.interface';
import { Locale, LocalizationService } from './localization.service';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private subjectAnchorScrollTo = new Subject<NavbarAnchor>();
  private subjectAnchorAtPositions = new Subject<NavbarAnchor>();
  private subjectAnchorsNew = new Subject<NavbarAnchor[]>();

  private localizedOverview = 'Overview';

  constructor(private localizationService: LocalizationService) {
    this.localizationService
      .listenLocalization()
      .pipe(takeUntilDestroyed())
      .subscribe((localization) => {
        switch (localization) {
          case Locale['en-GB']:
            this.localizedOverview = 'Overview';
            break;
          case Locale['nb-NO']:
            this.localizedOverview = 'Oversikt';
            break;
          default:
            this.localizedOverview = 'Overview';
            break;
        }
      });
  }

  listenAnchorToScrollTo(): Observable<NavbarAnchor> {
    return this.subjectAnchorScrollTo.asObservable();
  }
  newAnchorToScrollTo(anchorToScrollTo: NavbarAnchor): void {
    this.subjectAnchorScrollTo.next(anchorToScrollTo);
  }

  listenAnchorAtCurrPos(): Observable<NavbarAnchor> {
    return this.subjectAnchorAtPositions.asObservable();
  }
  newAnchorAtCurrPos(anchorAtPos: NavbarAnchor): void {
    this.subjectAnchorAtPositions.next(anchorAtPos);
  }

  listenAnchors(): Observable<NavbarAnchor[]> {
    return this.subjectAnchorsNew.asObservable();
  }
  newAnchors(anchors: NavbarAnchor[]): void {
    this.subjectAnchorsNew.next(anchors);
  }

  scrollToElement(offsetPos: number): void {
    // Check if browser is IE11
    if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > -1) {
      window.scrollTo(0, offsetPos);
    } else {
      window.scrollTo({
        top: offsetPos + 1,
        behavior: 'smooth',
      });
    }
  }

  getPageAnchors(): NodeListOf<Element> | undefined {
    const elements = document.querySelectorAll('.elvis-anchor');
    if (elements.length === 0) {
      return;
    }
    return elements;
  }

  getPageAnchorTitles(): NodeListOf<Element> | undefined {
    const elementTitles = document.querySelectorAll('.elvis-anchor-title');
    if (elementTitles.length === 0) {
      return;
    }
    return elementTitles;
  }

  getVisibleAnchors(): NavbarAnchor[] | undefined {
    const elements = this.getPageAnchors();
    const elementTitles = this.getPageAnchorTitles();

    if (elements && elementTitles) {
      const firstItem = elements.item(0) as HTMLElement;
      const anchors = [{ title: this.localizedOverview, top: 0, height: firstItem.offsetTop }];
      for (let i = 0; i < elements.length; i++) {
        const item = elements.item(i) as HTMLElement;
        const elementTitle = elementTitles.item(i) as HTMLElement;
        const innerText = elementTitle.innerText;
        const fromTop = item.offsetTop;
        let fullHeight = item.offsetHeight;
        if (i < elements.length - 1) {
          const nexItem = elements.item(i + 1) as HTMLElement;
          fullHeight = nexItem.offsetTop - item.offsetTop;
        }
        const newElement = {
          title: innerText,
          top: fromTop - 60, // TODO: 60 is just a temp fix because sometimes the scroll goes past the anchor title
          height: fullHeight,
        };
        anchors.push(newElement);
      }
      this.newAnchors(anchors);
      return anchors;
    }
    return undefined;
  }

  // Checks for changes in position from top and navigates according to changes or initial list of anchor offset positions.
  navigateToAnchor(anchor: NavbarAnchor): void {
    const elements = this.getPageAnchors();
    const elementTitles = this.getPageAnchorTitles();

    if (anchor.title === 'Overview') {
      this.newAnchorToScrollTo(anchor);
      return;
    }
    if (!elements || !elementTitles) {
      return;
    }
    for (let i = 0; i < elements.length; i++) {
      const item = elements.item(i) as HTMLElement;
      const elementTitle = elementTitles.item(i) as HTMLElement;
      const offSetTopValue = item.offsetTop;
      if (elementTitle.innerText === anchor.title) {
        if (offSetTopValue !== anchor.top) {
          anchor.top = offSetTopValue;
          this.newAnchorToScrollTo(anchor);
        } else {
          this.newAnchorToScrollTo(anchor);
        }
      }
    }
  }

  findAnchorAtScrollPosition(navbarAnchors: NavbarAnchor[]): void {
    const currentPos = window.scrollY;
    if (navbarAnchors === undefined) {
      return;
    }
    navbarAnchors.forEach((anchor) => {
      if (window.scrollY + window.innerHeight === document.body.scrollHeight) {
        this.newAnchorAtCurrPos(navbarAnchors[navbarAnchors.length - 1]);
      } else if (currentPos > anchor.top && currentPos < anchor.top + anchor.height) {
        this.newAnchorAtCurrPos(anchor);
      }
    });
  }
}
