import { Component, OnDestroy } from '@angular/core';
import { eCommunity } from 'src/app/shared/e-items';
import { Subscription, fromEvent } from 'rxjs';
import { NavbarAnchor } from 'src/app/shared/navbarAnchor.interface';
import { Router, NavigationEnd } from '@angular/router';
import { ScrollService } from 'src/app/core/services/scroll.service';

@Component({
  selector: 'app-community-start',
  templateUrl: './community-start.component.html',
  styleUrls: ['./community-start.component.scss'],
})
export class CommunityStartComponent implements OnDestroy {
  listenOnScrollSubscription: Subscription;
  routerSubscription: Subscription;
  pages = eCommunity;
  navbarAnchors: NavbarAnchor[] = [];
  scrollEventTimeout;
  startedScrollSub = false;

  constructor(private router: Router, private scrollService: ScrollService) {
    this.scrollService.listenAnchorToScrollTo().subscribe((anchor: NavbarAnchor) => {
      this.onScrollToAnchor(anchor);
    });
    this.routerSubscription = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if (ev.url !== '/community') {
          setTimeout(() => {
            this.getNavbarAnchors();
          }, 50);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.listenOnScrollSubscription) {
      this.listenOnScrollSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
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
    this.navbarAnchors = this.scrollService.getNavbarAnchors();
    if (this.navbarAnchors && !this.startedScrollSub) {
      this.startScrollSubscription();
      this.startedScrollSub = true;
    }
  }

  onScrollToAnchor(anchor: NavbarAnchor): void {
    if (this.listenOnScrollSubscription) {
      this.listenOnScrollSubscription.unsubscribe();
    }
    this.scrollService.scrollToElement(anchor.top);
    clearTimeout(this.scrollEventTimeout);
    this.scrollEventTimeout = setTimeout(() => {
      this.startScrollSubscription();
    }, 750);
  }

  findAnchorAtScrollPosition = (): void => {
    this.scrollService.findAnchorAtScrollPosition(this.navbarAnchors);
  };
}
