import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { IDocumentationPage } from 'contentful/types';
import { combineLatest } from 'rxjs';

import { ComponentHeaderComponent } from '../../../shared/component-documentation/component-structure/component-header/component-header.component';
import { CMSDocPageError, TransformedDocPage } from 'src/app/core/services/cms/cms.interface';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-cms-page',
  templateUrl: './cms-page.component.html',
  styleUrls: ['./cms-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ComponentHeaderComponent, RouterOutlet],
})
export class CMSPageComponent implements OnDestroy {
  cmsContent: TransformedDocPage = {} as TransformedDocPage;
  showContentLoader = true;
  contentHTML: SafeHtml = '';
  descriptionHTML: SafeHtml = '';
  // @ts-expect-error TS2564 (LEGO-3683)
  lastUpdated: string;
  isCmsPage = true;
  landingPage = false;
  hasChecked = false;
  activeEventListeners: HTMLElement[] = [];
  errorMessages: CMSDocPageError[] = [];

  constructor(
    private cmsService: CMSService,
    private sanitizer: DomSanitizer,
    private localizationService: LocalizationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef,
    private titleService: Title,
    themeService: ThemeService,
  ) {
    if (!this.activatedRoute.snapshot.url[1]) {
      this.landingPage = true;
    }
    this.checkIfPageExistsInProject();

    combineLatest([
      this.localizationService.listenLocalization(),
      this.activatedRoute.url,
      themeService.listenTheme(),
    ])
      .pipe(takeUntilDestroyed())
      .subscribe(([locale, url]) => {
        const firstRoute = url[0]?.path;
        const secondRoute = url[1]?.path;
        this.checkIfPageExistsInProject();
        if (this.hasChecked && this.isCmsPage) {
          if (firstRoute === 'preview' && secondRoute) {
            this.getDocPageFromCMS(locale, secondRoute);
          } else {
            this.getDocPageFromPreGeneratedList(locale);
          }
        } else {
          this.cmsService.contentLoadedFromCMS();
        }
      });
  }

  ngOnDestroy(): void {
    this.cmsService.setCurrentRouteIsCms(false);
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
    this.setInnerHTMLToCMSContent(docPage, locale);
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
    this.setInnerHTMLToCMSContent(docPage, locale);
    this.titleService.setTitle(docPage.title + ' | ' + 'Elvia design system');
  }

  /**
   * Inject the current page's transformed HTML to be displayed.
   *
   * If there are any errors in the transformed documentation page they will be shown.
   * These errors typically come from how content is implemented in Contentful.
   * @param docPage
   */
  setInnerHTMLToCMSContent(docPage: TransformedDocPage, locale: Locale): void {
    if (docPage.errorMessages.length > 0) {
      this.errorMessages = docPage.errorMessages;
    }
    this.cmsContent = docPage;
    this.contentHTML = this.sanitizer.bypassSecurityTrustHtml(docPage.content);
    this.descriptionHTML = this.sanitizer.bypassSecurityTrustHtml(docPage.pageDescription);
    const cmsLastUpdatedDate = new Date(this.cmsContent.lastUpdated);
    const lastUpdatedFormattedDate = cmsLastUpdatedDate.toLocaleString(locale, {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
    });

    this.lastUpdated = (locale === 'en-GB' ? 'Last updated ' : 'Sist oppdatert ') + lastUpdatedFormattedDate;
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
          tooltip?.addEventListener('click', () => this.copyAnchor(domElement['id']));
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
    const urlWithoutAnchor = this.router.url.split('#')[0];
    // @ts-expect-error TS1804 (LEGO-3683)8
    const currentPath = urlWithoutAnchor.split('?')[0];
    // @ts-expect-error TS1804 (LEGO-3683)8
    if (currentPath.split('/')[2]) {
      this.router.config.forEach((route) => {
        // @ts-expect-error TS1804 (LEGO-3683)8
        if (route.path === currentPath.split('/')[1]) {
          this.isCmsPage = !route.children?.some(
            (childRoute) => '/' + route.path + '/' + childRoute.path === currentPath,
          );
        }
      });
    } else {
      this.isCmsPage = true;
    }
    this.cmsService.setCurrentRouteIsCms(this.isCmsPage);
    this.hasChecked = true;
  }

  /**
   * Perform the "copy path on click"-action on a title.
   * @param id HTML-id of a title element.
   */
  copyAnchor(id: string): void {
    const anchorTitleElement = document.getElementById(id)?.querySelector('e-icon');
    const tooltipElement = document.getElementById(
      `elvia-tooltip-${id.replace('anchor-heading-', '')}`,
    ) as ElvisComponentWrapper;
    tooltipElement.setProps({ content: 'Copied!' });

    anchorTitleElement?.classList.add('e-icon--color-positive');
    setTimeout(() => {
      anchorTitleElement?.classList.remove('e-icon--color-positive');
      tooltipElement.setProps({ content: 'Copy' });
    }, 1400);
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
