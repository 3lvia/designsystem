import { Component, ElementRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { filter, startWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CMSDocPageError, TransformedDocPage } from 'src/app/core/services/cms/cms.interface';
import { IDocumentationPage } from 'contentful/types';
import { ElvisComponentWrapper } from '../../../../../../components/components/elvis-component-wrapper/dist/elvia-component';

@Component({
  selector: 'app-cms-page',
  templateUrl: './cms-page.component.html',
  styleUrls: ['./cms-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CMSPageComponent implements OnDestroy {
  routerSubscription: Subscription;

  cmsContent: TransformedDocPage = {} as TransformedDocPage;
  showContentLoader = true;
  contentHTML: any = '';
  descriptionHTML: any = '';
  lastUpdated;
  isCmsPage = true;
  landingPage = false;
  hasChecked = false;
  activeEventListeners = [];
  errorMessages: CMSDocPageError[] = [];

  constructor(
    private cmsService: CMSService,
    private sanitizer: DomSanitizer,
    private localizationService: LocalizationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef,
    private titleService: Title,
  ) {
    if (!this.activatedRoute.snapshot.url[1]) {
      this.landingPage = true;
    }
    this.checkIfPageExistsInProject();

    const localizationSub = this.localizationService.listenLocalization();
    this.routerSubscription = combineLatest([localizationSub, this.activatedRoute.url]).subscribe((value) => {
      const firstRoute = value[1][0]?.path;
      const secondRoute = value[1][1]?.path;
      this.checkIfPageExistsInProject();
      if (this.hasChecked && this.isCmsPage) {
        if (firstRoute === 'preview' && secondRoute) {
          this.getDocPageFromCMS(value[0], secondRoute);
        } else if (!environment.production) {
          this.getDocPageFromCMS(value[0]);
        } else {
          this.getDocPageFromPreGeneratedList(value[0]);
        }
      } else {
        this.cmsService.contentLoadedFromCMS();
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription && this.routerSubscription.unsubscribe();
  }

  /**
   * Display the documentation page corresponding to the current path.
   * This function __will__ use the locally cached entries.
   *
   * @param locale Current locale (see localization.service.ts).
   */
  async getDocPageFromPreGeneratedList(locale: Locale): Promise<void> {
    this.removeClickEventListenersForCopyPath();

    const id = await this.cmsService.getPageSysId(locale);
    const docPage = await this.cmsService.getTransformedDocPageByEntryId(id, locale);
    this.setInnerHTMLToCMSContent(docPage);
    this.titleService.setTitle(docPage.title + ' | Elvia design system');
  }

  /**
   * Display the documentation page corresponding to the given pageId or path.
   * This function __will not__ use the locally cached entries.
   *
   * @param locale Current locale (see localization.service.ts).
   * @param pageId Contentful ID of the requested page. If no ID is provided, it will be found based on the current path.
   */
  async getDocPageFromCMS(locale: Locale, pageId?: string): Promise<void> {
    this.removeClickEventListenersForCopyPath();

    const id = pageId ?? (await this.cmsService.getPageSysId(locale));
    const entry = (await this.cmsService.getEntryFromCMS(id)) as IDocumentationPage;
    const docPage = await this.cmsService.getTransformedDocPageByEntry(entry, locale);
    this.setInnerHTMLToCMSContent(docPage);
    this.titleService.setTitle(docPage.title + ' | ' + 'Elvia design system');
  }

  /**
   * Inject the current page's transformed HTML to be displayed.
   *
   * If there are any errors in the transformed documentation page they will be shown.
   * These errors typically come from how content is implemented in Contentful.
   * @param docPage
   */
  setInnerHTMLToCMSContent(docPage: TransformedDocPage): void {
    if (docPage.errorMessages.length > 0) {
      this.errorMessages = docPage.errorMessages;
    }
    this.cmsContent = docPage;
    this.contentHTML = this.sanitizer.bypassSecurityTrustHtml(docPage.content);
    this.descriptionHTML = this.sanitizer.bypassSecurityTrustHtml(docPage.pageDescription);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    this.lastUpdated = new Date(this.cmsContent.lastUpdated);
    this.lastUpdated = this.lastUpdated.toLocaleDateString('nb-NO', options).replace('/', '.');
    this.showContentLoader = false;
    this.cmsService.contentLoadedFromCMS();
    this.addClickEventListenersForCopyPath();
    this.titleService.setTitle(docPage.title + ' | Elvia design system');
  }

  /**
   * This function adds event listeners to all the tooltips beside a title. The event listeners add "copy path on click"-functionality.
   */
  addClickEventListenersForCopyPath(): void {
    setTimeout(() => {
      this.elementRef.nativeElement
        .querySelectorAll('.cms-section__title, .cms-heading1__title')
        .forEach((domElement: HTMLElement) => {
          const tooltip = domElement.querySelector('elvia-tooltip');
          tooltip.addEventListener('click', () => this.copyAnchor(domElement['id']));
          this.activeEventListeners.push(domElement);
        });
    });
  }

  /**
   * This function removes event listeners from all the titles. The event listeners add "copy path on click"-functionality.
   */
  removeClickEventListenersForCopyPath(): void {
    this.activeEventListeners.forEach((domElement: HTMLElement) => {
      domElement.removeEventListener('click', () => this.copyAnchor(domElement['id']));
    });
    this.activeEventListeners = [];
  }

  checkIfPageExistsInProject(): void {
    const currentPathWithoutAnchor = this.router.url.split('#')[0];
    if (currentPathWithoutAnchor.split('/')[2]) {
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

  /**
   * Perform the "copy path on click"-action on a title.
   * @param id HTML-id of a title element.
   */
  copyAnchor(id: string): void {
    const anchorTitleElement = document.getElementById(id);
    const tooltipElement = document.getElementById(`elvia-tooltip-${id}`) as ElvisComponentWrapper;
    tooltipElement.setProps({ content: 'Copied!' });

    anchorTitleElement.classList.add('anchor-copied');

    setTimeout(() => {
      anchorTitleElement.classList.remove('anchor-copied');
      tooltipElement.setProps({ content: 'Copy' });
    }, 800);
    const modifiedAnchor = id;
    let anchorUrl = 'https://design.elvia.io';
    if (this.router.url.includes('#')) {
      anchorUrl =
        anchorUrl + this.router.url.slice(0, this.router.url.lastIndexOf('#')) + '#' + modifiedAnchor;
    } else {
      anchorUrl = anchorUrl + this.router.url + '#' + modifiedAnchor;
    }
    navigator.clipboard.writeText(anchorUrl);
  }
}
