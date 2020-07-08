import { Component, OnInit, OnDestroy } from '@angular/core';
import { eTools } from 'src/app/shared/e-items';
import { Subscription, fromEvent } from 'rxjs';
import { NavbarAnchor } from 'src/app/shared/navbarAnchor.interface';
import { Router, NavigationEnd } from '@angular/router';
import { ScrollService } from 'src/app/core/services/scroll.service';

@Component({
  selector: 'app-tools-start',
  templateUrl: './tools-start.component.html',
  styleUrls: ['./tools-start.component.scss'],
})
export class ToolsStartComponent implements OnInit, OnDestroy {

  listenOnScrollSubscription: Subscription;
  pages = eTools;
  navbarAnchors: NavbarAnchor[] = [];
  scrollEventTimeout;

  constructor(private router: Router, private scrollService: ScrollService) {
    this.scrollService.listenAnchorToScrollTo()
      .subscribe((anchor: NavbarAnchor) => {
        this.onScrollToAnchor(anchor);
      });
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if (ev.url !== '/components') {
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
    this.listenOnScrollSubscription = scrollEvents.subscribe(() => {
      this.findAnchorAtScrollPosition();
      this.findNewNavbarHeight();
    });
  }

  findNewNavbarHeight(): void {
    this.scrollService.newScrollPosition();
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
