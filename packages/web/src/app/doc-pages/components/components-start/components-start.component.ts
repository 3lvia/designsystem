import { Component, OnDestroy } from '@angular/core';
import { eComponents } from 'src/app/shared/e-items';
import { NavbarAnchor } from 'src/app/shared/navbarAnchor.interface';
import { Router, NavigationEnd } from '@angular/router';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-components-start',
  templateUrl: './components-start.component.html',
  styleUrls: ['./components-start.component.scss'],
})
export class ComponentsStartComponent implements OnDestroy {

  listenOnScrollSubscription: Subscription;
  routerSubscription: Subscription;
  pages = eComponents;
  navbarAnchors: NavbarAnchor[] = [];
  scrollEventTimeout;
  startedScrollSub = false;

  constructor(private router: Router, private scrollService: ScrollService) {
    this.scrollService.listenAnchorToScrollTo()
      .subscribe((anchor: NavbarAnchor) => {
        this.onScrollToAnchor(anchor);
      });
    this.routerSubscription = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if (ev.url !== '/components') {
          setTimeout(() => { this.getNavbarAnchors(); }, 50);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.listenOnScrollSubscription) { this.listenOnScrollSubscription.unsubscribe(); }
    if (this.routerSubscription) { this.routerSubscription.unsubscribe(); }
  }

  startScrollSubscription(): void {
    const scrollEvents = fromEvent(document, 'scroll');
    this.listenOnScrollSubscription = scrollEvents.subscribe(() => {
      this.findAnchorAtScrollPosition();
      this.findNewNavbarHeight();
    });
  }

  findNewNavbarHeight(): void {
    this.scrollService.newScrollPosition();
  }

  getNavbarAnchors(): void {
    this.navbarAnchors = this.scrollService.getNavbarAnchors(this.navbarAnchors);
    if (this.navbarAnchors && !this.startedScrollSub) {
      this.startScrollSubscription();
      this.startedScrollSub = true;
    }
  }

  onScrollToAnchor(anchor: NavbarAnchor): void {
    if (this.listenOnScrollSubscription) { this.listenOnScrollSubscription.unsubscribe(); }
    this.scrollService.scrollToElement(anchor.top);
    clearTimeout(this.scrollEventTimeout);
    this.scrollEventTimeout = setTimeout(() => {
      this.startScrollSubscription();
    }, 750);
  }

  findAnchorAtScrollPosition = (): void => {
    this.scrollService.findAnchorAtScrollPosition(this.navbarAnchors);
  }

}
