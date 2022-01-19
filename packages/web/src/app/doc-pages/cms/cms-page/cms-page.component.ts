import { Component, ElementRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { CopyToClipboardService } from 'src/app/core/services/copy-to-clipboard.service';

@Component({
  selector: 'app-cms-page',
  templateUrl: './cms-page.component.html',
  styleUrls: ['./cms-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CMSPageComponent implements OnDestroy {
  routerSubscription: Subscription;

  cmsContent: any = {};
  showContentLoader = true;
  contentHTML: any = '';
  descriptionHTML: any = '';
  lastUpdated;
  isCmsPage = true;
  landingPage = false;
  hasChecked = false;
  activeEventListeners = [];

  constructor(
    private cmsService: CMSService,
    private sanitizer: DomSanitizer,
    private localizationService: LocalizationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private copyService: CopyToClipboardService,
    private elementRef: ElementRef,
  ) {
    if (!this.activatedRoute.snapshot.url[1]) {
      this.landingPage = true;
    }
    this.checkIfPageExistsInProject();

    const localizationSub = this.localizationService.listenLocalization();
    const routerSub = this.router.events;
    this.routerSubscription = combineLatest([localizationSub, routerSub]).subscribe((value) => {
      if (value[1] instanceof NavigationEnd) {
        this.checkIfPageExistsInProject();
        if (this.hasChecked && this.isCmsPage) {
          this.updateContent(value[0]);
        } else {
          this.cmsService.contentLoadedFromCMS();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription && this.routerSubscription.unsubscribe();
  }

  async updateContent(locale: Locale): Promise<any> {
    if (!this.isCmsPage) {
      return;
    }
    this.removeClickEventListenersForCopyPath();

    const pageId = await this.cmsService.getPageSysId(locale);
    const docPage = await this.cmsService.getDocumentationPageByEntryId(pageId, locale);
    this.cmsContent = docPage;
    this.contentHTML = this.sanitizer.bypassSecurityTrustHtml(docPage.content);
    this.descriptionHTML = this.sanitizer.bypassSecurityTrustHtml(docPage.pageDescription);
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    this.lastUpdated = new Date(this.cmsContent.lastUpdated);
    this.lastUpdated = this.lastUpdated.toLocaleDateString('nb-NO', options).replace('/', '.');
    this.showContentLoader = false;
    this.cmsService.contentLoadedFromCMS();

    this.addClickEventListenersForCopyPath();
  }

  addClickEventListenersForCopyPath(): void {
    setTimeout(() => {
      this.elementRef.nativeElement
        .querySelectorAll('.cms-section__title, .cms-heading1__title')
        .forEach((domElement) => {
          domElement.addEventListener('click', () => this.copyAnchor(domElement['id']));
          this.activeEventListeners.push(domElement);
        });
    });
  }

  removeClickEventListenersForCopyPath(): void {
    this.activeEventListeners.forEach((domElement) => {
      domElement.removeEventListener('click', () => this.copyAnchor(domElement['id']));
    });
    this.activeEventListeners = [];
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
    this.hasChecked = true;
  }

  copyAnchor(id: string): void {
    const anchorTitleElement = document.getElementById(id);
    anchorTitleElement.classList.add('anchor-copied');
    setTimeout(() => {
      anchorTitleElement.classList.remove('anchor-copied');
    }, 800);
    const modifiedAnchor = id;
    let anchorUrl = 'https://design.elvia.io';
    if (this.router.url.includes('#')) {
      anchorUrl =
        anchorUrl + this.router.url.slice(0, this.router.url.lastIndexOf('#')) + '#' + modifiedAnchor;
    } else {
      anchorUrl = anchorUrl + this.router.url + '#' + modifiedAnchor;
    }
    this.copyService.copyToClipBoard(anchorUrl);
  }
}
