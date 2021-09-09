import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EItems } from 'src/app/shared/e-items.interface';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { NavbarAnchor } from 'src/app/shared/navbarAnchor.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { combineLatest, Subscription } from 'rxjs';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { CMSService } from 'src/app/core/services/cms/cms.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnDestroy, OnInit {
  @Input() navbarItems: EItems[];

  navbarAnchors: NavbarAnchor[] = [];
  prevNavbarAnchors: NavbarAnchor[] = [];
  activeNavbarItem: any;
  prevActiveNavbarItem: any;

  navbarItemsCMS = [];
  subMenuRoute: string;
  newPath: string;

  mainMenu: any;
  filteredPages: EItems[];
  toggleMenu = false;
  activeAnchor: NavbarAnchor;
  prevActiveAnchor: NavbarAnchor;
  anchorSubscription: Subscription;
  fragmentSubscription: Subscription;
  scrollPosSubscription: Subscription;
  anchorPosSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scrollService: ScrollService,
    private location: Location,
    private cmsService: CMSService,
    private localizationService: LocalizationService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.scrollPosSubscription = this.scrollService.listenNewScrollPosition().subscribe(() => {
      this.updateNavbarHeight();
    });

    this.anchorPosSubscription = this.scrollService
      .listenAnchorAtCurrPos()
      .subscribe((anchor: NavbarAnchor) => {
        if (this.prevActiveAnchor !== anchor) {
          this.updateAnchorRoute(anchor);
        }
        this.prevActiveAnchor = this.activeAnchor;
        this.activeAnchor = anchor;
      });

    this.anchorSubscription = this.scrollService.listenAnchors().subscribe((anchors: NavbarAnchor[]) => {
      this.navbarAnchors = anchors;

      this.navbarItems.forEach((item) => {
        if (item.docUrl === this.getCurrentRoute()) {
          this.activeNavbarItem = item;
        }
      });

      this.fragmentSubscription = this.route.fragment.subscribe((fragment) => {
        if (!fragment) {
          this.activeAnchor = this.navbarAnchors[0];
          this.updateAnchorRoute(this.activeAnchor);
          return;
        }
        const fragmentExists = this.navbarAnchors.find((anchor) => {
          const anchorRoute = anchor.title.toLocaleLowerCase().split(' ').join('-');
          const fragmentRoute = fragment.toLocaleLowerCase().split(' ').join('-');
          return anchorRoute === fragmentRoute;
        });
        if (!fragmentExists) {
          this.activeAnchor = this.navbarAnchors[0];
          this.updateAnchorRoute(this.activeAnchor);
          return;
        }
        this.navbarAnchors.forEach((anchor) => {
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
    this.setSubMenuRoute();
    if (this.navbarItems !== undefined) {
      this.filteredPages = this.navbarItems.filter((page) => {
        return page.status !== 'Coming' && page.status !== 'Ignore';
      });
    } else {
      const localizationSubscriber = this.localizationService.listenLocalization();
      const activatedRouteSubscriber = this.activatedRoute.params;
      combineLatest([localizationSubscriber, activatedRouteSubscriber]).subscribe((value) => {
        this.updateContent(value[0]);
      });
    }
  }

  ngOnDestroy(): void {
    this.scrollPosSubscription && this.scrollPosSubscription.unsubscribe();
    this.anchorPosSubscription && this.anchorPosSubscription.unsubscribe();
    this.anchorSubscription && this.anchorSubscription.unsubscribe();
    if (this.fragmentSubscription) {
      this.fragmentSubscription.unsubscribe();
    }
  }

  async updateContent(locale: Locale): Promise<any> {
    this.mainMenu = await this.cmsService.getMenu(locale);
    this.navbarItemsCMS = [];
    this.mainMenu.pages.forEach((element) => {
      if (element.path === this.subMenuRoute) {
        if (element.entry.fields.pages === undefined || element.entry.fields.pages === null) {
          return;
        }
        const localeKey = Object.keys(element.entry.fields.pages)[locale];
        const cmsPages = element.entry.fields.pages[localeKey];
        cmsPages.forEach((element) => {
          const navbarItem = {
            title: element.fields.title[localeKey],
            path: element.fields.path[localeKey],
            fullPath: this.subMenuRoute + element.fields.path[localeKey],
          };
          this.navbarItemsCMS.push(navbarItem);
        });
      }
    });
    this.updateActiveItem();
  }

  getCurrentRoute(): string {
    let currentRoute = this.router.url.slice(this.router.url.lastIndexOf('/') + 1);
    if (currentRoute.includes('#')) {
      currentRoute = currentRoute.slice(0, currentRoute.indexOf('#'));
    }
    return currentRoute;
  }
  setSubMenuRoute(): void {
    const url = this.activatedRoute.snapshot.url;
    this.subMenuRoute = url[0].path;
  }

  updateNavbarHeight(): void {
    const fromTop = document.documentElement.scrollTop + window.innerHeight + 200 + 60;
    const scrollHeight = document.documentElement.scrollHeight + 48;
    const el = document.getElementById('side-navbar') as HTMLElement;
    if (fromTop >= scrollHeight) {
      const newHeight = scrollHeight - document.documentElement.scrollTop - 60 - 64 - 48 - 60 - 200;
      el.style.height = newHeight + 'px';
    } else {
      el.style.height = window.innerHeight - 64 - 48 - 60 + 'px';
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

  updateActiveItem(): void {
    this.navbarItemsCMS.forEach((item) => {
      if (item.path === this.getCurrentRoute()) {
        this.activeNavbarItem = item;
      }
    });
  }

  markNewActiveNavbarItemCMS(): void {
    setTimeout(() => {
      this.updateActiveItem();
    }, 10);
  }

  markNewActiveNavbarItem(navbarItem: EItems): void {
    if (navbarItem === this.activeNavbarItem) {
      return;
    }
    this.prevNavbarAnchors = this.navbarAnchors;
    this.prevActiveNavbarItem = this.activeNavbarItem;
    this.activeNavbarItem = navbarItem;
    this.scrollService.getNavbarAnchors([]);
  }

  scrollToElement(anchor: NavbarAnchor): void {
    this.activeAnchor = anchor;
    this.updateAnchorRoute(this.activeAnchor);
    this.scrollService.navigateToAnchor(anchor);
  }
}
