import { Component, Input, OnInit } from '@angular/core';
import { EItems } from 'src/app/shared/e-items.interface';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { NavbarAnchor } from 'src/app/shared/navbarAnchor.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() navbarItems: EItems[];

  navbarAnchors: NavbarAnchor[] = [];
  prevNavbarAnchors: NavbarAnchor[] = [];
  activeNavbarItem: EItems;
  prevActiveNavbarItem: EItems;

  filteredPages: EItems[];
  toggleMenu = false;
  activeAnchor: NavbarAnchor;
  prevActiveAnchor: NavbarAnchor;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scrollService: ScrollService,
    private location: Location,
  ) {
    this.scrollService.listenNewScrollPosition().subscribe(() => {
      this.updateNavbarHeight();
    });
    this.scrollService.listenAnchorAtCurrPos().subscribe((anchor: NavbarAnchor) => {
      if (this.prevActiveAnchor !== anchor) {
        this.updateAnchorRoute(anchor);
      }
      this.prevActiveAnchor = this.activeAnchor;
      this.activeAnchor = anchor;
    });

    this.scrollService.listenAnchors().subscribe((anchors: NavbarAnchor[]) => {
      this.navbarAnchors = anchors;

      this.navbarItems.forEach((item) => {
        let currentRoute = this.router.url.slice(this.router.url.lastIndexOf('/') + 1);
        if (currentRoute.includes('#')) {
          currentRoute = currentRoute.slice(0, currentRoute.indexOf('#'));
        }
        if (item.docUrl === currentRoute) {
          this.activeNavbarItem = item;
        }
      });

      this.route.fragment.subscribe(fragment => {
        if (!fragment) {
          this.activeAnchor = this.navbarAnchors[0];
          this.updateAnchorRoute(this.activeAnchor);
          return;
        }
        const fragmentExists = this.navbarAnchors.find(anchor => {
          const anchorRoute = anchor.title.toLocaleLowerCase().split(' ').join('-');
          const fragmentRoute = fragment.toLocaleLowerCase().split(' ').join('-');
          return anchorRoute === fragmentRoute;
        });
        if (!fragmentExists) {
          this.activeAnchor = this.navbarAnchors[0];
          this.updateAnchorRoute(this.activeAnchor);
          return;
        }
        this.navbarAnchors.forEach(anchor => {
          const anchorRoute = anchor.title.toLocaleLowerCase().split(' ').join('-');
          const fragmentRoute = fragment.toLocaleLowerCase().split(' ').join('-');
          if (anchorRoute === fragmentRoute) {
            this.activeAnchor = anchor;
            this.scrollService.scrollToElement(anchor.top);
            this.updateAnchorRoute(this.activeAnchor);
          }
        });
      });
    });
  }


  ngOnInit(): void {
    this.filteredPages = this.navbarItems.filter((page) => {
      return page.status !== 'Coming';
    });
  }

  updateNavbarHeight(): void {
    const fromTop = document.documentElement.scrollTop + window.innerHeight + 200 + 60;
    const scrollHeight = document.documentElement.scrollHeight;
    const el = document.getElementById('side-navbar') as HTMLElement;
    if (fromTop >= scrollHeight) {
      const newHeight = (scrollHeight - document.documentElement.scrollTop - 60 - 64 - 60 - 200);
      el.style.height = (newHeight) + 'px';
    } else {
      el.style.height = (window.innerHeight - 64 - 60) + 'px';
    }
  }

  updateAnchorRoute(anchor: NavbarAnchor): void {
    let currentRoute = this.router.url;
    if (currentRoute.includes('#')) {
      currentRoute = currentRoute.slice(0, currentRoute.indexOf('#'));
    }
    const fragment = anchor.title.split(' ').join('-');
    this.location.replaceState(currentRoute + '#' + fragment);
  }

  markNewActiveNavbarItem(navbarItem: EItems): void {
    if (navbarItem === this.activeNavbarItem) {
      return;
    }
    this.prevNavbarAnchors = this.navbarAnchors;
    this.prevActiveNavbarItem = this.activeNavbarItem;
    this.activeNavbarItem = navbarItem;
  }

  scrollToElement(anchor: NavbarAnchor): void {
    this.activeAnchor = anchor;
    this.scrollService.newAnchorToScrollTo(anchor);
    this.updateAnchorRoute(this.activeAnchor);
  }
}
