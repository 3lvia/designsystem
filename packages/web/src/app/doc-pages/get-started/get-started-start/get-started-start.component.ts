import { Component, OnInit, OnDestroy } from '@angular/core';
import { eGetStarted } from 'src/app/shared/e-items';
import { Subscription, fromEvent } from 'rxjs';
import { NavbarAnchor } from 'src/app/shared/navbarAnchor.interface';
import { Router, NavigationEnd } from '@angular/router';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-get-started-start',
  templateUrl: './get-started-start.component.html',
  styleUrls: ['./get-started-start.component.scss'],
})
export class GetStartedStartComponent implements OnInit, OnDestroy {

  listenOnScrollSubscription: Subscription;
  routerSubscription: Subscription;
  pages = eGetStarted;
  navbarAnchors: NavbarAnchor[] = [];
  scrollEventTimeout;

  constructor(private router: Router, private scrollService: ScrollService) {
    this.scrollService.listenAnchorToScrollTo()
      .subscribe((anchor: NavbarAnchor) => {
        this.onScrollToAnchor(anchor);
      });
    this.routerSubscription = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if (ev.url !== '/get-started') {
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
