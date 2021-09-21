import { AfterContentInit, Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { NavbarAnchor } from 'src/app/shared/navbarAnchor.interface';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { combineLatest, fromEvent, Subscription } from 'rxjs';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { componentsDocPages } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnDestroy, OnInit, AfterContentInit {
  @Input() navbarItems: any[][];

  anchorChangeSubscription: Subscription;
  anchorPosSubscription: Subscription;
  listenOnScrollSubscription: Subscription;
  routerSubscription: Subscription;
  contentLoadedSubscription: Subscription;
  scrollEventTimeout;
  startedScrollSub = false;
  isLandingPage = false;

  navbarList: any[];
  activeNavbarItem: any;
  prevActiveNavbarItem: any;
  componentsNavbar = componentsDocPages;
  subMenuRoute: string;
  oldSubMenuRoute: string;
  clickedNavbarItem;
  isCmsPage = false;

  visibleAnchors: NavbarAnchor[] = [];
  prevVisibleAnchors: NavbarAnchor[] = [];
  activeAnchor: NavbarAnchor;
  prevActiveAnchor: NavbarAnchor;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scrollService: ScrollService,
    private location: Location,
    private cmsService: CMSService,
    private localizationService: LocalizationService,
  ) {}

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(): void {
    this.updateNavbarHeight();
  }

  ngOnInit(): void {
    const localizationSubscriber = this.localizationService.listenLocalization();
    const routerSubscriber = this.router.events;
    this.routerSubscription = combineLatest([localizationSubscriber, routerSubscriber]).subscribe((value) => {
      if (value[1] instanceof NavigationEnd) {
        this.setSubMenuRoute();
        this.isLandingPage = this.router.url.split('/')[2] === undefined;
        if (this.subMenuRoute !== this.oldSubMenuRoute) {
          this.updateNavbarList(value[0]);
        }

        this.checkIfPageExistsInProject();
        if (!this.isCmsPage) {
          setTimeout(() => {
            this.updateAnchorList();
          }, 200);
        }
      }
    });
    this.contentLoadedSubscription = this.cmsService.listenContentLoadedFromCMS().subscribe(() => {
      this.setNewActiveNavbarItem();
      setTimeout(() => this.updateAnchorList(), 200);
    });
    this.anchorPosSubscription = this.scrollService
      .listenAnchorAtCurrPos()
      .subscribe((anchor: NavbarAnchor) => {
        this.setNewActiveAnchor(anchor);
      });
    this.anchorChangeSubscription = this.route.fragment.subscribe((fragment) => {
      setTimeout(() => {
        this.chooseAnchor(fragment);
      }, 200);
    });
  }

  ngAfterContentInit(): void {
    const isPageWithNavbar = this.router.url.split('/')[1] !== undefined;
    this.isLandingPage = this.router.url.split('/')[2] === undefined;
    this.setSubMenuRoute();
    this.checkIfPageExistsInProject();

    if (!isPageWithNavbar) {
      return;
    }
    this.updateNavbarList(0);
    setTimeout(() => {
      this.updateAnchorList();
    }, 200);
  }

  ngOnDestroy(): void {
    this.contentLoadedSubscription && this.contentLoadedSubscription.unsubscribe();
    this.anchorPosSubscription && this.anchorPosSubscription.unsubscribe();
    this.anchorChangeSubscription && this.anchorChangeSubscription.unsubscribe();
    this.listenOnScrollSubscription && this.listenOnScrollSubscription.unsubscribe();
    this.routerSubscription && this.routerSubscription.unsubscribe();
  }

  setSubMenuRoute(): void {
    this.oldSubMenuRoute = this.subMenuRoute;
    this.subMenuRoute = this.router.url.split('/')[1];
  }

  getCurrentRoute(): string {
    let currentRoute = this.router.url.slice(this.router.url.lastIndexOf('/') + 1);
    if (currentRoute.includes('#')) {
      currentRoute = currentRoute.slice(0, currentRoute.indexOf('#'));
    }
    return currentRoute;
  }

  checkIfPageExistsInProject(): void {
    const currentPathWithoutAnchor = this.router.url.split('#')[0];
    if (currentPathWithoutAnchor === '/components') {
      this.isCmsPage = false;
    } else if (currentPathWithoutAnchor.split('/')[2]) {
      this.router.config[0].children.forEach((subRoute) => {
        if (subRoute.path === currentPathWithoutAnchor.split('/')[1]) {
          this.isCmsPage = !subRoute.children.some(
            (childRoute) => '/' + subRoute.path + '/' + childRoute.path === currentPathWithoutAnchor,
          );
        }
      });
    } else {
      this.isCmsPage = true;
    }
  }

  async updateNavbarList(locale: Locale): Promise<any> {
    const routeWithoutAnchor = this.router.url.split('#')[0];
    this.navbarList = [];
    if (routeWithoutAnchor.split('/')[1] === 'components') {
      this.navbarList = this.componentsNavbar.filter((page) => {
        return page.status !== 'Coming' && page.status !== 'Ignore';
      });
      this.navbarList.forEach((navbarItem) => {
        if (navbarItem.docUrl === routeWithoutAnchor.split('/')[2]) {
          this.markNewActiveNavbarItem(navbarItem);
          setTimeout(() => {
            this.setNewActiveNavbarItem();
            this.updateAnchorList();
          }, 200);
        }
      });
    } else {
      const content = await this.cmsService.getSubMenuList(locale);
      content.forEach((element) => {
        this.navbarList.push(element);
        if (element.docUrl === routeWithoutAnchor.split('/')[2]) {
          this.markNewActiveNavbarItem(element);
        }
      });
    }
  }

  setNewActiveNavbarItem(): void {
    this.setSubMenuRoute();
    if (this.activeNavbarItem) {
      if (this.clickedNavbarItem === this.activeNavbarItem) {
        return;
      }
      this.prevVisibleAnchors = this.visibleAnchors;
      this.prevActiveNavbarItem = this.activeNavbarItem;
      this.activeNavbarItem = this.clickedNavbarItem;
    } else {
      this.navbarList.forEach((item) => {
        if (item.docUrl === this.getCurrentRoute()) {
          this.activeNavbarItem = item;
        }
      });
    }
  }

  markNewActiveNavbarItem(navbarItem: Record<string, unknown>): void {
    this.clickedNavbarItem = navbarItem;
  }

  updateAnchorList(): void {
    this.visibleAnchors = this.scrollService.getVisibleAnchors();
    if (!this.visibleAnchors) {
      return;
    }
    if (this.router.url.split('#')[1]) {
      this.chooseAnchor(this.router.url.split('#')[1]);
    } else {
      this.chooseAnchor(this.visibleAnchors[0].title);
    }
    if (!this.startedScrollSub) {
      this.startScrollSubscription();
      this.startedScrollSub = true;
    }
  }

  setNewActiveAnchor(anchor: NavbarAnchor): void {
    if (this.prevActiveAnchor !== anchor) {
      this.formatRouteWithFragment(anchor);
    }
    this.prevActiveAnchor = this.activeAnchor;
    this.activeAnchor = anchor;
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

  formatRouteWithFragment(anchor: NavbarAnchor): void {
    let currentRoute = this.router.url;
    if (currentRoute.includes('#')) {
      currentRoute = currentRoute.slice(0, currentRoute.indexOf('#'));
    }
    const fragment = anchor.title.split(' ').join('-');
    this.location.replaceState(currentRoute + '#' + fragment);
  }

  chooseAnchor(fragment: string): void {
    this.timeoutScrollSubscription();
    if (!this.visibleAnchors || !fragment) {
      return;
    }
    const fragmentExists = this.visibleAnchors.find((anchor) => {
      const anchorRoute = anchor.title.toLocaleLowerCase().split(' ').join('-');
      const fragmentRoute = fragment.toLocaleLowerCase().split(' ').join('-');
      return anchorRoute === fragmentRoute;
    });
    if (!fragmentExists) {
      this.setNewActiveAnchor(this.visibleAnchors[0]);
      return;
    }
    this.visibleAnchors.forEach((anchor) => {
      const anchorRoute = anchor.title.toLocaleLowerCase().split(' ').join('-');
      const fragmentRoute = fragment.toLocaleLowerCase().split(' ').join('-');
      if (anchorRoute === fragmentRoute) {
        this.setNewActiveAnchor(anchor);
        this.scrollService.scrollToElement(anchor.top);
        this.formatRouteWithFragment(this.activeAnchor);
      }
    });
  }

  scrollToElement(anchor: NavbarAnchor): void {
    this.setNewActiveAnchor(anchor);
    this.formatRouteWithFragment(this.activeAnchor);
    this.scrollService.navigateToAnchor(anchor);
  }

  startScrollSubscription(): void {
    const scrollEvents = fromEvent(document, 'scroll');
    if (this.listenOnScrollSubscription) {
      this.listenOnScrollSubscription.unsubscribe();
    }
    this.listenOnScrollSubscription = scrollEvents.subscribe(() => {
      this.findAnchorAtScrollPosition();
      this.updateNavbarHeight();
    });
  }

  timeoutScrollSubscription(): void {
    if (this.listenOnScrollSubscription) {
      this.listenOnScrollSubscription.unsubscribe();
    }
    clearTimeout(this.scrollEventTimeout);
    this.scrollEventTimeout = setTimeout(() => {
      this.startScrollSubscription();
    }, 750);
  }

  findAnchorAtScrollPosition = (): void => {
    this.scrollService.findAnchorAtScrollPosition(this.visibleAnchors);
  };
}
