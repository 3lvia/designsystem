import { AfterContentInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { NavbarAnchor } from 'src/app/shared/shared.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { combineLatest, fromEvent, Subject, Subscription } from 'rxjs';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { CMSNavbarItem } from 'src/app/core/services/cms/cms.interface';
import { LOCALE_CODE } from 'contentful/types';
import { takeUntil } from 'rxjs/operators';
import { RouterService } from '../../core/services/router.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnDestroy, OnInit, AfterContentInit {
  private unsubscriber = new Subject();
  private listenOnScrollSubscription: Subscription;
  private scrollEventTimeout: ReturnType<typeof setTimeout>;
  private startedScrollSub = false;
  isLandingPage = false;
  isLoaded = false;

  navbarList: CMSNavbarItem[] = [];
  activeNavbarItem: CMSNavbarItem;
  prevActiveNavbarItem: CMSNavbarItem;
  subMenuRoute: string;
  private clickedNavbarItem: CMSNavbarItem;
  private isCmsPage = false;

  visibleAnchors: NavbarAnchor[] = [];
  prevVisibleAnchors: NavbarAnchor[] = [];
  activeAnchor: NavbarAnchor;
  private prevActiveAnchor: NavbarAnchor;

  showLocaleToggle = true;
  locale: LOCALE_CODE = 'en-GB';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scrollService: ScrollService,
    private location: Location,
    private cmsService: CMSService,
    private localizationService: LocalizationService,
    private routerService: RouterService,
  ) {}

  @HostListener('window:popstate') // for updating side menu on changes to the history (clicking back-button)
  onPopstate(): void {
    setTimeout(() => this.updateNavbarList(Locale[this.locale]), 200);
  }

  ngOnInit(): void {
    const localizationSubscriber = this.localizationService.listenLocalization();

    this.updateLocaleSwitchVisibility();
    combineLatest([localizationSubscriber, this.routerService.urlPathChange()])
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(([locale]) => {
        this.locale = locale === Locale['en-GB'] ? 'en-GB' : 'nb-NO';

        this.updateLocaleSwitchVisibility();
        this.setSubMenuRoute();
        this.isLandingPage = this.router.url.split('/')[2] === undefined;
        this.updateNavbarList(locale);
        this.checkIfPageExistsInProject();
        if (!this.isCmsPage) {
          setTimeout(() => {
            this.updateAnchorList();
          }, 200);
        }
      });
    this.cmsService
      .listenContentLoadedFromCMS()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(() => {
        this.setNewActiveNavbarItem();
        setTimeout(() => {
          this.updateAnchorList();
          this.updateNavbarHeight();
        }, 200);
      });
    this.scrollService
      .listenAnchorAtCurrPos()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((anchor: NavbarAnchor) => {
        this.setNewActiveAnchor(anchor);
      });
    this.scrollService
      .listenAnchorToScrollTo()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((anchor: NavbarAnchor) => {
        this.chooseAnchor(anchor.title);
      });
    this.route.fragment.pipe(takeUntil(this.unsubscriber)).subscribe((fragment) => {
      setTimeout(() => {
        if (fragment) {
          this.chooseAnchor(fragment);
        }
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
    this.localizationService.listenLocalization().subscribe((locale) => {
      this.updateNavbarList(locale);
    });
    setTimeout(() => {
      this.updateAnchorList();
    }, 200);
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
    this.listenOnScrollSubscription && this.listenOnScrollSubscription.unsubscribe();
  }

  private setSubMenuRoute(): void {
    this.subMenuRoute = this.router.url.split('/')[1];
  }

  private getCurrentRoute(): string {
    return location.pathname.split('/').pop() || '';
  }

  private getCurrentPathWithoutAnchorOrParams(): string {
    const urlWithoutAnchor = this.router.url.split('#')[0];
    return urlWithoutAnchor.split('?')[0];
  }

  private checkIfPageExistsInProject(): void {
    const currentPath = this.getCurrentPathWithoutAnchorOrParams();
    if (currentPath === '/components') {
      this.isCmsPage = false;
    } else if (currentPath.split('/')[2]) {
      this.router.config[0].children?.forEach((subRoute) => {
        if (subRoute.path === currentPath.split('/')[1]) {
          this.isCmsPage = !subRoute.children?.some(
            (childRoute) => '/' + subRoute.path + '/' + childRoute.path === currentPath,
          );
        }
      });
    } else {
      this.isCmsPage = true;
    }
  }

  private async updateNavbarList(locale: Locale): Promise<void> {
    this.isLoaded = false;
    const currentPath = this.getCurrentPathWithoutAnchorOrParams();
    this.navbarList = await this.cmsService.getSubMenuList(locale);
    this.navbarList.forEach((element) => {
      if (element.docUrl === currentPath.split('/')[2]) {
        this.markNewActiveNavbarItem(element);
        if (!this.isCmsPage) {
          this.setNewActiveNavbarItem();
          this.updateAnchorList();
        }
      }
    });
    this.isLoaded = true;
  }

  private setNewActiveNavbarItem(): void {
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

  markNewActiveNavbarItem(navbarItem: CMSNavbarItem): void {
    this.clickedNavbarItem = navbarItem;
  }

  private updateAnchorList(): void {
    const newVisibleAnchors = this.scrollService.getVisibleAnchors();
    if (!newVisibleAnchors) {
      this.visibleAnchors = [];
      return;
    }
    this.visibleAnchors = newVisibleAnchors;
    const anchor = this.router.url.split('#')[1];
    if (anchor) {
      this.chooseAnchor(anchor);
    } else {
      this.chooseAnchor(this.visibleAnchors[0].title);
    }
    if (!this.startedScrollSub) {
      this.startScrollSubscription();
      this.startedScrollSub = true;
    }
  }

  private setNewActiveAnchor(anchor: NavbarAnchor): void {
    if (this.prevActiveAnchor !== anchor) {
      this.formatRouteWithFragment(anchor);
    }
    this.prevActiveAnchor = this.activeAnchor;
    this.activeAnchor = anchor;
  }

  @HostListener('window:resize', ['$event'])
  @HostListener('window:scroll', ['$event'])
  private updateNavbarHeight(): void {
    const fromTop = document.documentElement.scrollTop + window.innerHeight + 200 + 60;
    const scrollHeight = document.documentElement.scrollHeight + 48;
    const el = document.getElementById('side-navbar') as HTMLElement;
    if (fromTop >= scrollHeight) {
      const newHeight = scrollHeight - document.documentElement.scrollTop - 60 - 64 - 48 - 60 - 200;
      el.style.height = newHeight + 'px';
    } else {
      el.style.height = window.innerHeight - 64 - 48 - 60 + 'px';
    }
    this.updateNavbarBlur();
  }

  updateNavbarBlur(): void {
    const navbarElement = document.getElementById('side-navbar')?.firstChild as HTMLElement | null;
    if (!navbarElement) {
      return;
    }
    const clientHeight = navbarElement.getBoundingClientRect().height;
    const bottomOfNavbar = clientHeight + navbarElement.scrollTop;
    const heightOfNavbar = navbarElement.scrollHeight;

    const navbarBlurStartFraction = 0.9;
    const isAtEndOfNavbar = bottomOfNavbar >= navbarBlurStartFraction * heightOfNavbar;
    if (isAtEndOfNavbar) {
      const remainingHeight = heightOfNavbar - bottomOfNavbar;
      const remainingPercentage = (100 * remainingHeight) / heightOfNavbar;
      const blurAmount = `${100 - remainingPercentage * (1 - navbarBlurStartFraction) * 20}%`;
      navbarElement.style.setProperty('--navbar-blur-amount', blurAmount);
    } else {
      navbarElement.style.setProperty('--navbar-blur-amount', '80%');
    }
  }

  private formatRouteWithFragment(anchor: NavbarAnchor): void {
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

  private startScrollSubscription(): void {
    const scrollEvents = fromEvent(document, 'scroll');
    if (this.listenOnScrollSubscription) {
      this.listenOnScrollSubscription.unsubscribe();
    }
    this.listenOnScrollSubscription = scrollEvents.subscribe(() => {
      this.findAnchorAtScrollPosition();
      this.updateNavbarHeight();
    });
  }

  private timeoutScrollSubscription(): void {
    if (this.listenOnScrollSubscription) {
      this.listenOnScrollSubscription.unsubscribe();
    }
    clearTimeout(this.scrollEventTimeout);
    this.scrollEventTimeout = setTimeout(() => {
      this.startScrollSubscription();
    }, 750);
  }

  private findAnchorAtScrollPosition = (): void => {
    this.scrollService.findAnchorAtScrollPosition(this.visibleAnchors);
  };

  setLocale(locale: LOCALE_CODE): void {
    this.localizationService.setLocalization(Locale[locale]);
    this.localizationService.setPreferredLocalization(Locale[locale]);
  }

  private updateLocaleSwitchVisibility(): void {
    // Only show locale switch on brand pages
    this.showLocaleToggle = this.router.url.split('/')[1] === 'brand';
  }
}
