import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { NodeRenderer, Options, documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { ThemeName } from '@elvia/elvis-colors';
import {
  CONTENT_TYPE,
  ICenteredContent,
  IDocumentationPage,
  IDownloadContent,
  IGrid,
  IImage,
  IInternalLink,
  ILandingPage,
  ILandingPageWithCards,
  IWhenToUse,
  LOCALE_CODE,
} from 'contentful/types';

import { Locale } from '../localization.service';
import { ThemeService } from '../theme.service';
import { CMSTransformErrorsService } from './cms-transform-errors.service';
import { CMSSubMenu, TransformedDocPage } from './cms.interface';
import { extractLocale } from './extractLocale';

/**
 * This class transforms an entry from Contentful to an object containing all the needed information to be shown on design.elvia.io by the Angular cms-page.component.
 *
 * The function `transformEntryToDocPage` is the main entrypoint.
 *
 * Interfaces for all the Contentful models are available in `packages/web/contentful/types.d.ts`. They are automatically generated by running `yarn contentful:types`.
 */
@Injectable({
  providedIn: 'root',
})
export class CMSTransformService {
  private locale: LOCALE_CODE = 'en-GB'; // Fallback
  private currentTheme: ThemeName = 'light';
  private subMenu: CMSSubMenu[];
  private options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => `<strong>${text}</strong>`,
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, next) => this.getHeading1(next(node.content)),
      [BLOCKS.HEADING_2]: (node, next) => this.getHeading2(next(node.content)),
      [BLOCKS.HEADING_5]: (node, next) => this.getHeading3(next(node.content)),
      [BLOCKS.PARAGRAPH]: (node, next) => this.getParagraph(next(node.content)),
      [BLOCKS.UL_LIST]: (node, next) => this.getList(next(node.content)),
      [BLOCKS.OL_LIST]: (node, next) => this.getNumberedList(next(node.content)),
      [BLOCKS.QUOTE]: (node, next) => this.getQuote(next(node.content)),
      [BLOCKS.EMBEDDED_ASSET]: (node) =>
        this.getEmbeddedAsset(this.extractLocale(node.data.target.fields.file).url),
      [BLOCKS.EMBEDDED_ENTRY]: (node) => `${this.getHTML(node)}`,
      [INLINES.EMBEDDED_ENTRY]: (node) => `${this.getHTML(node)}`,
    },
  };

  /** Wrap `extractLocale` to avoid having to pass the locale to it every time. */
  private extractLocale = <T extends Parameters<typeof extractLocale>[0]>(data: T) =>
    extractLocale(data, this.locale);

  constructor(
    private router: Router,
    private cmsTransformErrorsService: CMSTransformErrorsService,
    private themeService: ThemeService,
  ) {
    this.themeService
      .listenTheme()
      .pipe(takeUntilDestroyed())
      .subscribe((theme) => {
        this.currentTheme = theme;
      });
  }

  /**
   * Transforms a documentation page entry from Contentful to an object containing all the needed information to be shown on design.elvia.io by the Angular cms-page.component.
   *
   * @param data Documentation page entry.
   * @param subMenu
   * @param localization Current localization (see localization.service.ts).
   * @returns Object containing transformed documentation page.
   */
  transformEntryToDocPage(
    data: IDocumentationPage,
    subMenu: CMSSubMenu[],
    localization: Locale,
  ): TransformedDocPage {
    this.locale = localization;
    let subMenuRoute = '';
    if (this.router.url.split('/')[2]) {
      subMenuRoute = this.router.url.split('/')[1] + '/';
    }
    if (!data.fields.path) {
      this.cmsTransformErrorsService.showErrorMessage('Documentation page', 'The page is missing a path.');
    }
    this.subMenu = subMenu;

    const description = this.getDocumentationPageHTML(data, 'pageDescription');
    const content = this.getDocumentationPageHTML(data, 'content');
    const title = this.extractLocale(data.fields.title) ?? '';
    const figmaUrl = (data.fields.figmaUrl && this.extractLocale(data.fields.figmaUrl)) ?? '';
    const isMainPage = (data.fields.isMainPage && this.extractLocale(data.fields.isMainPage)) ?? false;
    return {
      title: title,
      pageDescription: description,
      figmaUrl: figmaUrl,
      content: content,
      isMainPage: isMainPage,
      docUrl: data.fields.path && this.extractLocale(data.fields.path),
      fullPath: data.fields.path && subMenuRoute + this.extractLocale(data.fields.path),
      lastUpdated: data.sys.updatedAt,
      errorMessages: this.cmsTransformErrorsService.errorMessages,
    };
  }

  private getHTML(data: Parameters<NodeRenderer>[0]): string {
    if (data.nodeType === 'embedded-entry-block' || data.nodeType === 'embedded-entry-inline') {
      return this.embeddedEntryBlock(data, this.subMenu, data.nodeType === 'embedded-entry-inline');
    }
    return '';
  }

  private getDocumentationPageHTML(data: IDocumentationPage, model: 'content' | 'pageDescription') {
    if (!(model in data.fields)) {
      return '';
    }
    const modelData = data.fields[model];
    if (!modelData) {
      return '';
    }
    const document = this.extractLocale(modelData);
    return document ? documentToHtmlString(document, this.options) : '';
  }

  private embeddedEntryBlock(node: Parameters<NodeRenderer>[0], subMenu: CMSSubMenu[], inlineEntry: boolean) {
    const type = this.getEntryType(node);
    const data = node.data.target;
    if (type === 'landingPage') {
      return this.getLandingPage(data);
    }
    if (type === 'landingPageWithCards') {
      return this.getLandingPageWithCards(data, subMenu);
    }
    if (type === 'centeredContent') {
      return this.getCenteredContent(data);
    }
    if (type === 'internalLink') {
      return this.getLink(data, subMenu, inlineEntry);
    }
    if (type === 'whenToUse') {
      return this.getWhenToUse(data);
    }
    if (type === 'image') {
      return this.getImage(data, false);
    }
    if (type === 'downloadContent') {
      return this.getDownloadContent(data, false, false);
    }
    if (type === 'grid') {
      return this.getGrid(data);
    }
    return documentToHtmlString(data.fields.content, this.options);
  }

  private getEntryType(node: Parameters<NodeRenderer>[0]): CONTENT_TYPE | undefined {
    if (!node || !node.data || !node.data.target || !node.data.target.sys || !node.data.target.sys.id) {
      return;
    }
    return node.data.target.sys.contentType.sys.id;
  }

  private getCenteredContent(data: ICenteredContent) {
    this.cmsTransformErrorsService.getCenteredContentErrors(data, this.locale);
    const contentData = data.fields.content;
    if (!contentData) {
      return '';
    }
    const document = this.extractLocale(contentData);
    if (!document) {
      return '';
    }
    return `
      <div class="cms-centered-content">
        ${documentToHtmlString(document, this.options)}
      </div>`;
  }

  private getList(content: string) {
    const liRegex = /(?:<li>)(.*?)(?=<\/li>)/g;
    const imgRegex = /(?:<img)(.*?)(?=\/>)/g;
    const formattedContent = content.replace(/(\r\n|\n|\r)/gm, '');
    let liStrings = [...formattedContent.match(liRegex)!];
    const bulletIcons = liStrings.map((i) => {
      const imageUrl = i.match(imgRegex) && i.match(imgRegex)?.[0].replace('<img', '');
      const str = `<img style="position: absolute; margin-right: 8px; margin-left: -48px; width:32px; height: 32px;"' + ${imageUrl}/>`;
      return str.replace('class="cms-img', '');
    });
    liStrings = liStrings.map((li) => {
      return li
        .replace(imgRegex, '')
        .replace('<li>', '')
        .replace('/>', '')
        .replace('cms-image', 'e-none cms-image');
    });
    if (bulletIcons[0].includes('src=')) {
      let returnString = '<ol class="e-list e-list--icons e-text-lg">';
      for (let liIndex = 0; liIndex <= liStrings.length - 1; liIndex++) {
        returnString += `<li><span class="e-list__icon">${bulletIcons[liIndex]}</span><span>${liStrings[liIndex]}</span></li>`;
      }
      returnString = returnString + `</ol>`;
      return returnString;
    } else {
      return `<ul class="e-list">${content}</ul>`;
    }
  }

  private getNumberedList(list: string): string {
    return `<ul class="e-list e-list--numbers">${list}</ul>`;
  }

  private getQuote(quote: string): string {
    return `<div class="cms-quote-container">
    <div>
      <e-icon name="quotationColor" size="lg"></e-icon>
    </div>
    <div class="cms-quote-text e-text-quote">
      ${quote}
    </div>
  </div>`;
  }

  private getFullPath(subPath: string, subMenu: CMSSubMenu[]) {
    let fullPath = '';
    subMenu.forEach((element) => {
      if (element.path === subPath) {
        fullPath = subPath;
      } else {
        const pages = element.entry.fields.pages;
        if (!pages) {
          return;
        }
        this.extractLocale(pages)?.forEach((subElement) => {
          if (this.extractLocale(subElement.fields.path) === subPath) {
            fullPath = element.path + '/' + subPath;
          }
        });
      }
    });
    if (fullPath === '') {
      return undefined;
    }
    return fullPath;
  }

  private getLinkPath(data: IInternalLink, subMenu: CMSSubMenu[], paragraphTitle: string): string {
    let linkPath = '';
    if (data.fields.page) {
      const pages = data.fields.page;
      if (!pages) {
        this.cmsTransformErrorsService.showErrorMessage(
          'Link',
          `Entry ${data.sys.id} is not an existing page that can be referenced.`,
        );
        return '';
      }
      const path = this.extractLocale(pages);
      if (!path) {
        this.cmsTransformErrorsService.showErrorMessage(
          'Link',
          `Entry ${data.sys.id} is not an existing page that can be referenced.`,
        );
        return '';
      }
      const subPath = this.extractLocale(path.fields.path) ?? '';
      linkPath = this.getFullPath(subPath, subMenu) + '#' + paragraphTitle;
      if (!linkPath) {
        this.cmsTransformErrorsService.showErrorMessage(
          'Link',
          `${subPath} is not an existing page that can be referenced.`,
        );
        return '';
      }
    } else if (data.fields.urlNewTab) {
      const url = this.extractLocale(data.fields.urlNewTab);
      if (!url) {
        this.cmsTransformErrorsService.showErrorMessage(
          'Link',
          `Entry ${data.sys.id} is not an existing page that can be referenced.`,
        );
        return '';
      }
      linkPath = url;
    } else {
      this.cmsTransformErrorsService.showErrorMessage(
        'Link',
        `${
          data.fields.title
            ? 'The link "' + this.extractLocale(data.fields.title) + '"'
            : 'A link on your page'
        } has no url, add either Url design.elvia.io or Url new tab / external.`,
      );
      return '';
    }
    return linkPath;
  }

  private getLink(data: IInternalLink, subMenu: CMSSubMenu[], inlineEntry: boolean): string {
    const paragraphTitle =
      (data.fields.paragraph && this.extractLocale(data.fields.paragraph)?.replace(/ /g, '-')) ?? '';
    const linkPath = this.getLinkPath(data, subMenu, paragraphTitle);
    if (!data.fields.title) {
      this.cmsTransformErrorsService.showErrorMessage('Link', 'A link on your page is missing link text.');
    }
    if (!data.fields.title || !linkPath) {
      return '';
    }
    const linkText = this.extractLocale(data.fields.title);
    const type = data.fields.type ? this.extractLocale(data.fields.type) : '';
    const isInline = inlineEntry;
    const isExternal = data.fields.urlNewTab !== undefined && data.fields.page === undefined;
    const isAction = type === 'Action' && !isExternal;
    return `
      ${!isInline ? '<p>' : ''}
        <a 
          href="${linkPath}" 
          class='e-link e-link--lg
            ${isInline ? 'e-link--inline' : ''} 
            ${isAction && !isInline ? 'e-link--action' : ''} 
            ${isExternal ? 'e-link--new-tab' : ''} 
          '
          ${isExternal ? 'target="_blank" rel="noopener"' : ''}
        >
          <span class="e-link__title">${linkText}</span>
          ${
            isAction && !isInline
              ? '<span class="e-link__icon"><e-icon name="arrowRightCircleColor"></e-icon><e-icon name="arrowRightCircleFilledColor"></e-icon></span>'
              : ''
          }
          ${isExternal ? '<span class="e-link__icon"><e-icon name="newTabBold" ></e-icon></span>' : ''}
        </a>
      ${!isInline ? '</p>' : ''}`;
  }

  private getWhenToUse(data: IWhenToUse): string {
    this.cmsTransformErrorsService.getWhenToUseErrors(data, this.locale);
    if (!data.fields.name || !data.fields.whenToUse || !data.fields.whenNotToUse) {
      return '';
    }
    let returnStringWhen = '';
    let returnStringWhenNot = '';
    const whenToUseData = this.extractLocale(data.fields.whenToUse);
    const whenNotToUseData = this.extractLocale(data.fields.whenNotToUse);
    if (!whenToUseData || !whenNotToUseData) {
      return '';
    }
    const whensList = documentToHtmlString(whenToUseData, this.options).split('<p');
    const whenNotsList = documentToHtmlString(whenNotToUseData).split('<p');
    whensList.forEach((when) => {
      returnStringWhen += `<li>${when
        .replace('class="cms-paragraph e-text-lg">', '')
        .replace('</p>', '')}</li>`;
    });
    whenNotsList.forEach((whenNot) => {
      returnStringWhenNot += `<li>${whenNot.replace('>', '').replace('</p>', '')}</li>`;
    });
    returnStringWhen = returnStringWhen.replace('<li></li>', '');
    returnStringWhenNot = returnStringWhenNot.replace('<li></li>', '');
    return `<div class="when e-my-24">
    <div class="when-to-use">
      <div class="e-title-caps" style="display: flex; flex-direction: row">
        <div class="e-mr-8">
          <e-icon name="checkCircle" size="xs" class="e-icon--color-positive"></e-icon>
        </div>
        <div>When to use:</div>
      </div>
      <span class="e-text-md">
        <ul>
          ${returnStringWhen}
        </ul>
      </span>
    </div>
    <div class="when-not-to-use">
      <div class="e-title-caps" style="display: flex; flex-direction: row">
        <div class="e-mr-8">
          <e-icon name="removeCircle" size="xs" class="e-icon--color-error"></e-icon>
        </div>
        <div>When not to use:</div>
      </div>
      <span class="e-text-md">
        <ul>
          ${returnStringWhenNot}
        </ul>
      </span>
    </div>
  </div>`;
  }

  private getImage(data: IImage, inGrid: boolean) {
    this.cmsTransformErrorsService.getImageErrors(data, this.locale);
    if (!data.fields.name || !data.fields.image || !data.fields.altText) {
      return '';
    }
    const hasInlineText = data.fields.inlineText !== undefined;
    const imgSize = this.extractLocale(data.fields.size);
    const imgAlignment = data.fields.alignment ? this.extractLocale(data.fields.alignment) : undefined;
    const shouldHaveThemeBackground = !data.fields.transparentBackground;
    const description = data.fields.description ? this.extractLocale(data.fields.description) : undefined;
    const altText = data.fields.altText ? this.extractLocale(data.fields.altText) : undefined;
    let srcUrl = 'https:' + this.extractLocale(this.extractLocale(data.fields.image)!.fields.file)?.url;
    if (this.currentTheme === 'dark' && data.fields.imageDark) {
      srcUrl = 'https:' + this.extractLocale(this.extractLocale(data.fields.imageDark)!.fields.file)?.url;
    }
    return `<div class='${imgAlignment && !hasInlineText ? 'cms-image-align-' + imgAlignment : ''}'>
    <div
      style=' 
        ${hasInlineText ? 'display: block' : 'display: inline-block;'}
        ${
          imgSize === 'original'
            ? 'width: unset'
            : imgSize === '100%'
              ? 'width: calc(' + imgSize + '- 64px)'
              : 'width: ' + imgSize
        }
      '
      class='
        cms-image
        ${imgSize === '25%' ? 'cms-image-small' : 'cms-image-normal'}
      '
    >
      <div class="e-my-16">
        <img
          class=' 
            ${shouldHaveThemeBackground && 'theme-image-background'}
            ${inGrid ? 'e-br-8' : ''}
            ${hasInlineText ? 'cms-image-inline' : ''} 
            align-${imgAlignment}
            ${imgSize === 'original' ? 'original-margin' : ''} 
          '
          style='${hasInlineText ? `display: inline; width: ${imgSize}` : 'max-width: 100%'}'
          src="${srcUrl}"
          ${altText?.toLocaleLowerCase() !== 'decorative' ? 'alt="' + altText + '"' : 'alt=""'}
        />
        ${hasInlineText ? '' : '<br class="containerDivNewLine" />'} 
        <div 
          class=' 
            ${description !== undefined && 'cms-image-desc-show'} 
            cms-image-desc
            e-text-img'
          style='text-align: ${imgAlignment} !important'
        >
          ${description ? documentToHtmlString(description, this.options) : ''}
        </div>
      </div>
      ${
        hasInlineText && data.fields.inlineText
          ? `${documentToHtmlString(this.extractLocale(data.fields.inlineText)!, this.options)}`
          : ''
      }
      <div style="clear: ${imgAlignment}"></div>
    </div>
    </div>
    `;
  }

  private getDownloadContent(data: IDownloadContent, inGrid: boolean, inverted: boolean): string {
    this.cmsTransformErrorsService.getDownloadContentErrors(data, this.locale);
    if (!data.fields.name || !data.fields.displayImage || !data.fields.downloadableContent) {
      return '';
    }
    const assetName = this.extractLocale(data.fields.name) ?? '';
    const displayTitle = data.fields.displayTitle ? this.extractLocale(data.fields.displayTitle) : undefined;
    const altText = this.extractLocale(this.extractLocale(data.fields.displayImage)!.fields.title);
    const url = this.extractLocale(this.extractLocale(data.fields.displayImage)!.fields.file)?.url;
    const displayImage = 'https:' + url + '?fm=jpg&fl=progressive';
    const displayImageWebp = 'https:' + url + '?fm=webp&q=75&w=720';
    const displayImageAvif = 'https:' + url + '?fm=avif&q=75&w=720';
    const asset =
      'https:' + this.extractLocale(this.extractLocale(data.fields.downloadableContent)!.fields.file)?.url;
    const fileType = asset.split('.').pop();
    fetch(asset)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = URL.createObjectURL(blob);
        const link = document.getElementById('download-content-' + assetName) as HTMLAnchorElement;
        link.href = blobURL;
        link.download = assetName;
      });

    return `<div class="cms-download-content ${inGrid ? '' : 'e-my-24'}">
      <div class="cms-display-image e-mb-24">
        <picture>
          <source type="image/avif" srcset="${displayImageAvif}"  />
          <source type="image/webp" srcset="${displayImageWebp}"  />
          <img
            class="cms-section__img"
            src="${displayImage}"
            alt="${altText}"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
      ${
        displayTitle !== undefined
          ? `<div class="e-title-caps e-mb-16 ${inGrid ? 'e-text-center' : 'e-text-right'}">` +
            displayTitle +
            '</div>'
          : ''
      }
      <div class="cms-downloadable-asset ${inGrid ? 'centered' : ''}">
        <a role="button" id="download-content-${assetName}">
          <button class="e-btn e-btn--tertiary ${inverted ? 'e-btn--inverted' : ''}">
            <span class="e-btn__icon">
              <e-icon name="download"></e-icon>
            </span>
            <span class="e-btn__title">${fileType}</span>
          </button>
        </a>
      </div>
    </div>`;
  }

  private getGrid(data: IGrid): string {
    this.cmsTransformErrorsService.getGridErrors(data, this.locale);
    if (!data.fields.name || !data.fields.gridElements) {
      return '';
    }

    const gridElementsAreDownloadContent = (
      elements?: (IImage | IDownloadContent)[],
    ): elements is IDownloadContent[] => {
      return !!elements?.every((element) => element.sys.contentType.sys.id === 'downloadContent');
    };

    const gridElementsAreImages = (elements?: (IImage | IDownloadContent)[]): elements is IImage[] => {
      return !!elements?.every((element) => element.sys.contentType.sys.id === 'image');
    };

    const elements = this.extractLocale(data.fields.gridElements);
    const background = this.extractLocale(data.fields.background);
    let returnString = '';
    if (
      elements?.find((el) => el.sys.contentType.sys.id === 'image') &&
      elements?.find((el) => el.sys.contentType.sys.id === 'downloadContent')
    ) {
      this.cmsTransformErrorsService.showErrorMessage(
        'Grid',
        'You have to choose between images or download content, both are not allowed',
        false,
      );
      return '';
    }
    if (gridElementsAreDownloadContent(elements)) {
      const nameArray: string[] = [];
      elements.forEach((element) => {
        nameArray.push(this.extractLocale(element.fields.name)!);
      });
      if (new Set(nameArray).size !== nameArray.length) {
        this.cmsTransformErrorsService.showErrorMessage(
          'Grid',
          `You have multiple download content entries with the same name. All grid elements needs to have unique download content names.`,
          false,
        );
        return '';
      }
      elements.forEach((element) => {
        if (background === 'Dark') {
          returnString +=
            '<div class="col-sm-6 col-md-4" style="display: flex; align-items: flex-end; justify-content: center">' +
            this.getDownloadContent(element, true, true) +
            '</div>';
        } else {
          returnString +=
            '<div class="col-sm-6 col-md-4" style="display: flex; align-items: flex-end; justify-content: center">' +
            this.getDownloadContent(element, true, false) +
            '</div>';
        }
      });
    } else if (gridElementsAreImages(elements)) {
      elements.forEach((element) => {
        returnString += '<div class="col-sm-6 col-md-4">' + this.getImage(element, true) + '</div>';
      });
    }
    return `<div class="e-grid e-px-24 e-br-8 ${background === 'Dark' ? '' : 'e-theme-light'}" style="${
      background === 'Dark'
        ? 'background: var(--e-light-theme-grey); color: var(--e-light-theme-grey--contrast);'
        : background === 'Grey'
          ? 'background: var(--e-light-theme-grey-05); color: var(--e-light-theme-grey-05--contrast);'
          : 'background: var(--e-light-theme-white); color: var(--e-light-theme-white--contrast);'
    } margin-top: 12px; margin-bottom: 12px">
    <div class="row e-grid-gutters-ext e-grid-gutters-vertical">
      ${returnString}
    </div>
  </div>`;
  }

  private getEmbeddedAsset(asset: string): string {
    return `<img class="cms-img" src="${asset}"/>`;
  }

  private getParagraph(paragraph: string): string {
    return `<p class="cms-paragraph e-text-lg">${paragraph}</p>`;
  }

  private getHeading1(heading: string): string {
    return `<div class="cms-heading1">
    <div class="cms-heading1__title" id="anchor-heading-${heading}">
      <span style="position: absolute; left: -36px; margin-top: 2px;">
        <elvia-tooltip class="cms-anchor-title" content="Copy" showDelay="400" display="relative" id="elvia-tooltip-${heading}">
          <span class="icons" slot="trigger" id="anchor-icons">
            <e-icon name="link" size="sm" class="cms-section__img"></e-icon>
          </span>
        </elvia-tooltip>
      </span>
      <h2 class="e-title-md e-mb-24 e-flex" data-url-fragment>
        ${heading}
        <ng-content select="headerIcon"></ng-content>
      </h2>
    </div>
  </div>
  `;
  }

  private getHeading2(heading: string): string {
    return `<div class="cms-heading2">
      <h3 class="cms-heading2__title e-title-sm">
        ${heading}
      </h3>
    </div>`;
  }

  private getHeading3(heading: string): string {
    return `<div class="cms-heading3">
      <h4 class="cms-heading3__title e-title-xs">
        ${heading}
      </h4>
    </div>`;
  }

  private getLandingPage(data: ILandingPage) {
    const srcUrl =
      'https:' + this.extractLocale(this.extractLocale(data.fields.overviewImage!)!.fields.file)?.url;
    return `
      <div class="cms-landing-page">
        <img class="cms-landing-page__img" src="${srcUrl}" alt="${this.extractLocale(
          this.extractLocale(data.fields.overviewImage!)!.fields.title,
        )}"></img>
        <div class="cms-landing-page__description e-text-lg">
          ${data.fields.description ? this.extractLocale(data.fields.description) : ''}
        </div>
      </div>`;
  }

  private getLandingPageWithCards(data: ILandingPageWithCards, subMenu: CMSSubMenu[]) {
    const cardList = this.extractLocale(data.fields.overviewCard);
    let returnString = '';
    cardList?.forEach((card) => {
      let fullPath = '';
      if (card.fields.pageUrl) {
        const subPath = this.extractLocale(this.extractLocale(card.fields.pageUrl!)!.fields.path)!;
        fullPath = this.getFullPath(subPath, subMenu)!;
        if (!fullPath) {
          this.cmsTransformErrorsService.showErrorMessage(
            'LandingPage',
            `${subPath} is not an existing page that can be referenced.`,
          );
        }
      } else {
        this.cmsTransformErrorsService.showErrorMessage(
          'LandingPage',
          `The card "${card.fields.title}" is missing page URL reference.`,
        );
      }
      let iconUrl =
        'https:' + this.extractLocale(this.extractLocale(card.fields.pageIcon!)!.fields.file)?.url;
      if (this.currentTheme === 'dark' && card.fields.pageIconDarkTheme) {
        iconUrl =
          'https:' + this.extractLocale(this.extractLocale(card.fields.pageIconDarkTheme!)!.fields.file)?.url;
      }
      const cardTitle = this.extractLocale(card.fields.title);
      returnString += `<a href="${fullPath}">
        <elvia-card
          heading="${cardTitle}"
          maxHeadingLines="2"
          >
          <img slot="icon" src="${iconUrl}" alt="" aria-hidden="true"></img>
        </elvia-card>
      </a>
    `;
    });
    return (
      `<div style="margin-top: 48px;"><div class="components-overview-cards">
      ` +
      returnString +
      '</div></div>'
    );
  }
}
