import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NavbarAnchor } from 'src/app/shared/navbarAnchor.interface';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private subjectScroll = new Subject<any>();
  private subjectAnchorScrollTo = new Subject<any>();
  private subjectAnchorAtPositions = new Subject<any>();
  private subjectAnchorsNew = new Subject<any>();

  listenNewScrollPosition(): Observable<any> {
    return this.subjectScroll.asObservable();
  }
  newScrollPosition(): void {
    this.subjectScroll.next();
  }

  listenAnchorToScrollTo(): Observable<any> {
    return this.subjectAnchorScrollTo.asObservable();
  }
  newAnchorToScrollTo(anchorToScrollTo: NavbarAnchor): void {
    this.subjectAnchorScrollTo.next(anchorToScrollTo);
  }

  listenAnchorAtCurrPos(): Observable<any> {
    return this.subjectAnchorAtPositions.asObservable();
  }
  newAnchorAtCurrPos(anchorAtPos: NavbarAnchor): void {
    this.subjectAnchorAtPositions.next(anchorAtPos);
  }

  listenAnchors(): Observable<any> {
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

  getPageAnchors(): NodeListOf<Element> {
    const elements = document.querySelectorAll('.elvis-anchor');
    if (elements.length === 0) {
      return;
    }
    return elements;
  }

  getPageAnchorTitles(): NodeListOf<Element> {
    const elementTitles = document.querySelectorAll('.elvis-anchor-title');
    if (elementTitles.length === 0) {
      return;
    }
    return elementTitles;
  }

  getNavbarAnchors(anchors: NavbarAnchor[]): NavbarAnchor[] {
    const elements = this.getPageAnchors();
    const elementTitles = this.getPageAnchorTitles();

    if (elements && elementTitles) {
      const firstItem = elements.item(0) as HTMLElement;
      anchors = [{ title: 'Overview', top: 0, height: firstItem.offsetTop }];
      for (let i = 0; i < elements.length; i++) {
        const item = elements.item(i) as HTMLElement;
        const elementTitle = elementTitles.item(i) as HTMLElement;
        const innerText = elementTitle.innerText;
        const fromTop = item.offsetTop;
        const fullHeight = item.offsetHeight;
        const newElement = {
          title: innerText,
          top: fromTop,
          height: fullHeight,
        };
        anchors.push(newElement);
      }
      this.newAnchors(anchors);
      return anchors;
    }
  }

  // Checks for changes in position from top and navigates according to changes or initial list of anchor offset positions.
  navigateToAnchor(anchor: NavbarAnchor): void {
    const elements = this.getPageAnchors();
    const elementTitles = this.getPageAnchorTitles();

    if (anchor.title === 'Overview') {
      this.newAnchorToScrollTo(anchor);
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
