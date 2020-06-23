import { Component, OnInit, OnDestroy } from '@angular/core';
import { eUtilities } from 'src/app/shared/e-items';
import { NavbarAnchor } from 'src/app/shared/navbarAnchor.interface';
import { NavigationEnd, Router } from '@angular/router';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-utilities-start',
  templateUrl: './utilities-start.component.html',
  styleUrls: ['./utilities-start.component.scss'],
})
export class UtilitiesStartComponent implements OnInit, OnDestroy {
  pages = eUtilities;
  navbarAnchors: NavbarAnchor[] = [];
  listenOnScrollSubscription: Subscription;
  scrollEventTimeout;

  constructor(private router: Router, private scrollService: ScrollService) {
    this.scrollService.listenAnchorToScrollTo()
      .subscribe((anchor: NavbarAnchor) => {
        this.onScrollToAnchor(anchor);
      });
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if (ev.url !== '/utilities') {
          setTimeout(() => { this.getNavbarAnchors(); }, 50);
        }
      }
    });
  }

  ngOnInit(): void {
    this.startScrollSubscription();
  }

  startScrollSubscription(): void {
    const scrollEvents = fromEvent(document, 'scroll');
    this.listenOnScrollSubscription = scrollEvents.subscribe(() => { this.findAnchorAtScrollPosition(); });
  }

  ngOnDestroy(): void {
    this.listenOnScrollSubscription.unsubscribe();
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
