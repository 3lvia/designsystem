import { Component, OnInit, OnDestroy } from '@angular/core';
import { eIdentity } from 'src/app/shared/e-items';
import { NavbarAnchor } from 'src/app/shared/navbarAnchor.interface';
import { NavigationEnd, Router } from '@angular/router';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-identity-start',
  templateUrl: './identity-start.component.html',
  styleUrls: ['./identity-start.component.scss'],
})
export class IdentityStartComponent implements OnInit, OnDestroy {
  pages = eIdentity;
  navbarAnchors: NavbarAnchor[] = [];
  listenOnScrollSubscription: Subscription;
  routerSubscription: Subscription;
  scrollEventTimeout;

  constructor(private router: Router, private scrollService: ScrollService) {
    this.scrollService.listenAnchorToScrollTo()
      .subscribe((anchor: NavbarAnchor) => {
        this.onScrollToAnchor(anchor);
      });
    this.routerSubscription = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if (ev.url !== '/identity') {
          setTimeout(() => { this.getNavbarAnchors(); }, 50);
        }
      }
    });
  }

  ngOnInit(): void {
    this.startScrollSubscription();
  }

  ngOnDestroy(): void {
    this.listenOnScrollSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  startScrollSubscription(): void {
    const scrollEvents = fromEvent(document, 'scroll');
    const result = scrollEvents.pipe(throttleTime(200));
    this.listenOnScrollSubscription = result.subscribe(() => {
      this.findAnchorAtScrollPosition();
      this.findNewNavbarHeight();
    });
  }

  findNewNavbarHeight(): void {
    this.scrollService.newScrollPosition();
  }

  getNavbarAnchors(): void {
    this.navbarAnchors = this.scrollService.getNavbarAnchors(this.navbarAnchors);
  }

  onScrollToAnchor(anchor: NavbarAnchor): void {
    this.listenOnScrollSubscription.unsubscribe();
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
