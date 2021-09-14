import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, fromEvent, Subscription } from 'rxjs';
import { NavbarAnchor } from 'src/app/shared/navbarAnchor.interface';
import { ScrollService } from 'src/app/core/services/scroll.service';
@Component({
  selector: 'app-cms-page',
  templateUrl: './cms-page.component.html',
  styleUrls: ['./cms-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CMSPageComponent implements OnInit {
  cmsContent: any = {};
  html: any = '';
  cmsPage = false;

  listenOnScrollSubscription: Subscription;
  routerSubscription: Subscription;
  navbarAnchors: NavbarAnchor[] = [];
  scrollEventTimeout;
  startedScrollSub = false;

  constructor(
    private cmsService: CMSService,
    private sanitizer: DomSanitizer,
    private localizationService: LocalizationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private scrollService: ScrollService
  ) { }

  ngOnInit(): void {
    this.checkIfCMSPage();

    const subscriber1 = this.localizationService.listenLocalization();
    const subscriber2 = this.activatedRoute.params;
    combineLatest([subscriber1, subscriber2]).subscribe((value) => {
      this.updateContent(value[0]);
    });

    // Anchors
    this.scrollService.listenAnchorToScrollTo().subscribe((anchor: NavbarAnchor) => {
      this.onScrollToAnchor(anchor);
    });
    this.routerSubscription = this.router.events.subscribe(() => {
      const url = this.activatedRoute.snapshot.url;
      this.checkIfCMSPage();
      if (
        url[1]
      ) {
        this.getNavbarAnchors();
      }
    });
  }

  async updateContent(locale: Locale): Promise<any> {
    const url = this.activatedRoute.snapshot.url;
    const menu = await this.cmsService.getMenu(locale);
    const localeKey = Object.keys(menu['pages'][0].entry.fields.pages)[locale];
    const subMenu = menu['pages'].find((sub) => sub.path === url[0].path);
    if (!subMenu) {
      console.error('FOUND NO SUBMENU WITH THAT PATH');
    }
    if (!url[1]) {
      this.updateContentByEntryId(subMenu.entry.fields.landingPage[localeKey].sys.id, locale);
      return;
    } else {
      const docPage = subMenu.entry.fields.pages[localeKey].find(
        (page) => page.fields.path[localeKey] === url[1].path,
      );
      if (!docPage) {
        console.error('FOUND NO PAGE WITH THAT PATH');
      }
      this.updateContentByEntryId(docPage.sys.id, locale);
      return;
    }
  }

  checkIfCMSPage(): void {
    const hasSubRoute = this.router.config[0].children.some((subRoute) => subRoute.path === this.activatedRoute.snapshot.url[0].path)
    if (hasSubRoute) {
      this.router.config[0].children.forEach((subRoute) => {
        if (subRoute.path === this.activatedRoute.snapshot.url[0].path) {
          const currentPathWithoutAnchor = this.router.url.split('#')[0];
          this.cmsPage = !subRoute.children.some((childRoute) => ('/' + subRoute.path + '/' + childRoute.path) === currentPathWithoutAnchor)
        }
      })
    } else {
      this.cmsPage = true;
    }
  }

  updateContentByEntryId(entryId: string, locale: number): void {
    this.cmsService.getDocumentationPageByEntryId(entryId, locale).then((content) => {
      this.cmsContent = content;
      this.html = this.sanitizer.bypassSecurityTrustHtml(content.content);
      setTimeout(() => this.getNavbarAnchors(), 500);
    });
  }

  // Anchors
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
