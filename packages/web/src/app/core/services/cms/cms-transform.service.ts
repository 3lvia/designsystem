import { Injectable } from '@angular/core';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { documentToHtmlString, Options } from '@contentful/rich-text-html-renderer';
import { Locale } from '../localization.service';
import { Router } from '@angular/router';
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
  IOverviewCard,
  IWhenToUse,
} from 'contentful/types';
import { CMSDocPageError, CMSSubMenu, TransformedDocPage } from './cms.interface';

/**
 * This class transforms an entry from Contentful to an object containing all the needed information to be shown on design.elvia.io by the Angular cms-page.component.
 *
 * The function transformEntryToDocPage is the main entrypoint.
 *
 * Interfaces for all the Contentful models are available in packages/web/contentful/types.d.ts.
 */
@Injectable({
  providedIn: 'root',
})
export class CMSTransformService {
  private errorMessages: CMSDocPageError[] = [];
  private locale = 'en-GB'; // Fallback
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
      [BLOCKS.EMBEDDED_ASSET]: (node) => this.getEmbeddedAsset(node.data.target.fields.file[this.locale].url),
      [BLOCKS.EMBEDDED_ENTRY]: (node) => `${this.getHTML(node, this.locale, this.subMenu)}`,
      [INLINES.EMBEDDED_ENTRY]: (node) => `${this.getHTML(node, this.locale, this.subMenu)}`,
    },
  };

  constructor(private router: Router) {}

  showErrorMessage(model: string, errorMessage: string, requiredText?: boolean): void {
    console.error(
      `Contentful - ${model}: ${errorMessage} \n   This field is required for the content to load.`,
    );
    const newError = {
      name: model,
      message: errorMessage + (requiredText ? '\n   This field is required for the content to load.' : ''),
    };
    this.errorMessages.push(newError);
  }

  // eslint-disable-next-line
  getHTML(data, locale: string, subMenu?: CMSSubMenu[], model?: string): string {
    this.subMenu = subMenu;
    this.locale = locale;
    if (data.nodeType === 'embedded-entry-block' || data.nodeType === 'embedded-entry-inline') {
      return this.embeddedEntryBlock(data, locale, this.subMenu, data.nodeType === 'embedded-entry-inline');
    }
    if (model === 'content') {
      return documentToHtmlString(data.fields.content[locale], this.options);
    } else if (model === 'pageDescription') {
      return documentToHtmlString(data.fields.pageDescription[locale], this.options);
    }
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
    let locale = 'en-GB';
    if (localization === Locale['nb-NO']) {
      locale = 'nb-NO';
    }

    let subMenuRoute = '';
    if (this.router.url.split('/')[2]) {
      subMenuRoute = this.router.url.split('/')[1] + '/';
    }
    if (!data.fields.path) {
      this.showErrorMessage('Documentation page', 'The page is missing a path.');
    }

    const description = data.fields.pageDescription
      ? this.getHTML(data, locale, subMenu, 'pageDescription')
      : '';
    const content = data.fields.content ? this.getHTML(data, locale, subMenu, 'content') : '';
    const figmaUrl = data.fields.figmaUrl ? data.fields.figmaUrl[locale] : '';
    const isMainPage = data.fields.isMainPage ? data.fields.isMainPage : '';
    return {
      title: data.fields.title[locale],
      pageDescription: description,
      figmaUrl: figmaUrl,
      content: content,
      isMainPage: isMainPage,
      docUrl: data.fields.path && data.fields.path[locale],
      fullPath: data.fields.path && subMenuRoute + data.fields.path[locale],
      lastUpdated: data.sys.updatedAt,
      errorMessages: this.errorMessages,
    };
  }

  private embeddedEntryBlock(node, locale: string, subMenu: CMSSubMenu[], inlineEntry: boolean) {
    const type = this.getEntryType(node);
    const data = node.data.target;
    if (type === 'landingPage') {
      return this.getLandingPage(data, locale);
    }
    if (type === 'landingPageWithCards') {
      return this.getLandingPageWithCards(data, locale, subMenu);
    }
    if (type === 'centeredContent') {
      return this.getCenteredContent(data, locale);
    }
    if (type === 'internalLink') {
      return this.getLink(data, locale, subMenu, inlineEntry);
    }
    if (type === 'whenToUse') {
      return this.getWhenToUse(data, locale);
    }
    if (type === 'image') {
      return this.getImage(data, locale, false);
    }
    if (type === 'downloadContent') {
      return this.getDownloadContent(data, locale, false, false);
    }
    if (type === 'grid') {
      return this.getGrid(data, locale);
    }
    return documentToHtmlString(data.fields.content, this.options);
  }

  private getEntryType(node): CONTENT_TYPE {
    if (!node || !node.data || !node.data.target || !node.data.target.sys || !node.data.target.sys.id) {
      return;
    }
    return node.data.target.sys.contentType.sys.id;
  }

  private getCenteredContentErrors(data: ICenteredContent, locale: string) {
    if (!data.fields.content) {
      this.showErrorMessage(
        'Centered content',
        `${
          data.fields.title
            ? 'The "Centered content" "' + data.fields.title[locale] + '"'
            : 'A "Centered content" on your page'
        } is missing content.`,
      );
    }
  }
  private getCenteredContent(data: ICenteredContent, locale: string) {
    this.getCenteredContentErrors(data, locale);
    if (!data.fields.content) {
      return;
    }
    return `
      <div class="cms-centered-content">
        ${documentToHtmlString(data.fields.content[locale], this.options)}
      </div>`;
  }

  private getList(content: string) {
    const liRegex = /(?:<li>)(.*?)(?=<\/li>)/g;
    const imgRegex = /(?:<img)(.*?)(?=\/>)/g;
    const formattedContent = content.replace(/(\r\n|\n|\r)/gm, '');
    let liStrings = [...formattedContent.match(liRegex)];
    const bulletIcons = liStrings.map((i) => {
      const imageUrl = i.match(imgRegex) && i.match(imgRegex)[0].replace('<img', '');
      const str = `<img style="position: absolute; margin-right: 8px; margin-left: -48px; width:32px; height: 32px;"' + ${imageUrl}/>`;
      return str.replace('class="cms-img', '');
    });
    liStrings = liStrings.map((li) => {
      return li.replace(imgRegex, '').replace('<li>', '').replace('/>', '');
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
      <i class="e-icon e-icon--quotation-color e-icon--lg" aria-hidden="true"></i>
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
        element.entry.fields.pages[this.locale].forEach((subElement: IDocumentationPage) => {
          if (subElement.fields.path[this.locale] === subPath) {
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

  private getLinkPath(
    data: IInternalLink,
    locale: string,
    subMenu: CMSSubMenu[],
    paragraphTitle: string,
  ): string {
    let linkPath = '';
    if (data.fields.page) {
      const subPath: string = data.fields.page[locale].fields.path[locale];
      linkPath = this.getFullPath(subPath, subMenu) + '#' + paragraphTitle;
      if (!linkPath) {
        this.showErrorMessage('Link', `${subPath} is not an existing page that can be referenced.`);
        return undefined;
      }
    } else if (data.fields.urlNewTab) {
      linkPath = data.fields.urlNewTab[locale];
    } else {
      this.showErrorMessage(
        'Link',
        `${
          data.fields.title ? 'The link "' + data.fields.title[locale] + '"' : 'A link on your page'
        } has no url, add either Url design.elvia.io or Url new tab / external.`,
      );
      return undefined;
    }
    return linkPath;
  }

  private getLink(data: IInternalLink, locale: string, subMenu: CMSSubMenu[], inlineEntry: boolean): string {
    const paragraphTitle: string = data.fields.paragraph
      ? data.fields.paragraph[locale].replaceAll(' ', '-')
      : '';
    const linkPath = this.getLinkPath(data, locale, subMenu, paragraphTitle);
    if (!data.fields.title) {
      this.showErrorMessage('Link', 'A link on your page is missing link text.');
    }
    if (!data.fields.title || !linkPath) {
      return;
    }
    const linkText = data.fields.title[locale];
    const type = data.fields.type ? data.fields.type[locale] : '';
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
          ${isExternal ? 'target="_blank"' : ''}
        >
          <span class="e-link__title">${linkText}</span>
          ${
            isAction && !isInline
              ? '<span class="e-link__icon"><i class="e-icon e-icon--arrow_right_circle-color" aria-hidden="true"></i><i class="e-icon e-icon--arrow_right_circle-filled-color" aria-hidden="true"></i></span>'
              : ''
          }
          ${
            isExternal
              ? '<span class="e-link__icon"><i class="e-icon e-icon--new_tab-bold" aria-hidden="true"></i></span>'
              : ''
          }
        </a>
      ${!isInline ? '</p>' : ''}`;
  }

  private getWhenToUseErrors(data: IWhenToUse, locale: string) {
    if (!data.fields.name) {
      this.showErrorMessage(
        'When & when not to use',
        'The "When & when not to use" entry on your page is missing a title, this will make sorting / finding entries in Contentful harder and messy.',
      );
    }
    if (!data.fields.whenToUse) {
      this.showErrorMessage(
        'When & when not to use',
        `${
          data.fields.name
            ? 'The entry "' + data.fields.name[locale] + '"'
            : 'A "When & when not to use" entry on your page'
        } is missing the "when to use" field.`,
      );
    }
    if (!data.fields.whenNotToUse) {
      this.showErrorMessage(
        'When & when not to use',
        `${
          data.fields.name
            ? 'The entry "' + data.fields.name[locale] + '"'
            : 'A "When & when not to use" entry on your page'
        } is missing the "when not to use" field.`,
      );
    }
  }

  private getWhenToUse(data: IWhenToUse, locale: string): string {
    this.getWhenToUseErrors(data, locale);
    if (!data.fields.name || !data.fields.whenToUse || !data.fields.whenNotToUse) {
      return;
    }
    let returnStringWhen = '';
    let returnStringWhenNot = '';
    const whensList = documentToHtmlString(data.fields.whenToUse[locale], this.options).split('<p');
    const whenNotsList = documentToHtmlString(data.fields.whenNotToUse[locale]).split('<p');
    whensList.forEach((when) => {
      returnStringWhen += `<li>${when
        .replace('class="cms-paragraph e-text-body">', '')
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
          <i class="e-icon e-icon--check_circle e-icon--xs e-icon--color-green" aria-hidden="true"></i>
        </div>
        <div>When to use:</div>
      </div>
      <span class="e-text-description">
        <ul>
          ${returnStringWhen}
        </ul>
      </span>
    </div>
    <div class="when-not-to-use">
      <div class="e-title-caps" style="display: flex; flex-direction: row">
        <div class="e-mr-8">
          <i class="e-icon e-icon--remove_circle e-icon--xs e-icon--color-red" aria-hidden="true"></i>
        </div>
        <div>When not to use:</div>
      </div>
      <span class="e-text-description">
        <ul>
          ${returnStringWhenNot}
        </ul>
      </span>
    </div>
  </div>`;
  }

  private getImageErrors(data: IImage, locale: string) {
    if (!data.fields.name) {
      this.showErrorMessage(
        'Image',
        'An image on your page is missing title, this will make sorting / finding entries in Contentful harder and messy.',
      );
    }
    if (!data.fields.image) {
      this.showErrorMessage(
        'Image',
        `${
          data.fields.name ? 'The image "' + data.fields.name[locale] + '"' : 'An image on your page'
        } is missing the image asset.`,
      );
    }
    if (!data.fields.altText) {
      this.showErrorMessage(
        'Image',
        `${
          data.fields.name ? 'The image "' + data.fields.name[locale] + '"' : 'An image on your page'
        } is missing alt text.`,
      );
    }
  }

  private getImage(data: IImage, locale: string, inGrid: boolean) {
    this.getImageErrors(data, locale);
    if (!data.fields.name || !data.fields.image || !data.fields.altText) {
      return;
    }
    const hasInlineText = data.fields.inlineText !== undefined;
    const imgSize: IImage['fields']['size'] = data.fields.size[locale];
    const imgAlignment: IImage['fields']['alignment'] = data.fields.alignment[locale];
    const description: IImage['fields']['description'] = data.fields.description
      ? data.fields.description[locale]
      : undefined;
    const altText: IImage['fields']['altText'] = data.fields.altText
      ? data.fields.altText[locale]
      : undefined;
    const srcUrl = 'https:' + data.fields.image[locale].fields.file[locale].url;
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
      <div>
        <img
          class='
            ${inGrid ? 'e-br-8' : ''}
            ${hasInlineText ? 'cms-image-inline' : ''} 
            align-${imgAlignment}
            ${imgSize === 'original' ? 'original-margin' : ''} 
          '
          style='${hasInlineText ? `display: inline; width: ${imgSize}` : 'max-width: 100%'}'
          src="${srcUrl}"
          ${altText !== 'decorative' && altText !== '"decorative"' ? 'alt="' + altText + '"' : ''}
        />
        ${hasInlineText ? '' : '<br class="containerDivNewLine" />'} 
        <div 
          class=' 
            ${description !== undefined && 'cms-image-desc-show'} 
            cms-image-desc
            e-text-img'
          style='text-align: ${imgAlignment} !important'
        >
          ${documentToHtmlString(description, this.options)}
        </div>
      </div>
      ${hasInlineText ? `${documentToHtmlString(data.fields.inlineText[locale], this.options)}` : ''}
      <div style="clear: ${imgAlignment}"></div>
    </div>
    </div>
    `;
  }

  private getDownloadContentErrors(data: IDownloadContent, locale: string) {
    if (!data.fields.name) {
      this.showErrorMessage(
        'Download content',
        'A "Download content" on your page is missing name, this will make sorting / finding entries in Contentful harder and messy.',
      );
    }
    if (!data.fields.displayImage) {
      this.showErrorMessage(
        'Download content',
        `${
          data.fields.name
            ? 'The "Display image" "' + data.fields.name[locale] + '"'
            : 'A "Display image" on your page'
        } is missing display image.`,
      );
    }
    if (!data.fields.downloadableContent) {
      this.showErrorMessage(
        'Download content',
        `${
          data.fields.name
            ? 'The "Download content" "' + data.fields.name[locale] + '"'
            : 'A "Download content" on your page'
        } is missing download content.`,
      );
    }
  }

  private getDownloadContent(
    data: IDownloadContent,
    locale: string,
    inGrid: boolean,
    inverted: boolean,
  ): string {
    this.getDownloadContentErrors(data, locale);
    if (!data.fields.name || !data.fields.displayImage || !data.fields.downloadableContent) {
      return;
    }
    const assetName: IDownloadContent['fields']['name'] = data.fields.name[locale];
    const displayTitle: IDownloadContent['fields']['displayTitle'] = data.fields.displayTitle
      ? data.fields.displayTitle[locale]
      : undefined;
    const displayImage = 'https:' + data.fields.displayImage[locale].fields.file[locale].url;
    const asset = 'https:' + data.fields.downloadableContent[locale].fields.file[locale].url;
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
        <img
          class="cms-section__img normal-img"
          src="${displayImage}"
        />
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
              <i class="e-icon e-icon--download ${inverted ? 'e-icon--inverted' : ''}" aria-hidden="true"></i>
            </span>
            <span class="e-btn__title">${fileType}</span>
          </button>
        </a>
      </div>
    </div>`;
  }

  private getGridErrors(data: IGrid, locale: string) {
    if (!data.fields.name) {
      this.showErrorMessage(
        'Grid',
        'A "Grid" on your page is missing name, this will make sorting / finding entries in Contentful harder and messy.',
      );
    }
    if (!data.fields.gridElements) {
      this.showErrorMessage(
        'Grid',
        `${
          data.fields.name ? 'The "Grid" "' + data.fields.name[locale] + '"' : 'A "Grid" on your page'
        } is missing grid elements.`,
      );
    }
  }

  private getGrid(data: IGrid, locale: string): string {
    this.getGridErrors(data, locale);
    if (!data.fields.name || !data.fields.gridElements) {
      return;
    }
    const elements: IGrid['fields']['gridElements'] = data.fields.gridElements[locale];
    const background: IGrid['fields']['background'] = data.fields.background[locale];
    let returnString = '';
    if (
      elements.find((el) => el.sys.contentType.sys.id === 'image') &&
      elements.find((el) => el.sys.contentType.sys.id === 'downloadContent')
    ) {
      this.showErrorMessage(
        'Grid',
        'You have to choose between images or download content, both are not allowed',
        false,
      );
      return;
    }
    if (elements[0].sys.contentType.sys.id === 'downloadContent') {
      const nameArray = [];
      elements.forEach((element) => {
        nameArray.push(element.fields.name[locale]);
      });
      if (new Set(nameArray).size !== nameArray.length) {
        this.showErrorMessage(
          'Grid',
          `You have multiple download content entries with the same name. All grid elements needs to have unique download content names.`,
          false,
        );
        return;
      }
      elements.forEach((element: IDownloadContent) => {
        if (background === 'Dark') {
          returnString +=
            '<div class="col-sm-6 col-md-4" style="display: flex; align-items: flex-end; justify-content: center">' +
            this.getDownloadContent(element, locale, true, true) +
            '</div>';
        } else {
          returnString +=
            '<div class="col-sm-6 col-md-4" style="display: flex; align-items: flex-end; justify-content: center">' +
            this.getDownloadContent(element, locale, true, false) +
            '</div>';
        }
      });
    } else if (elements[0].sys.contentType.sys.id === 'image') {
      elements.forEach((element: IImage) => {
        returnString += '<div class="col-sm-6 col-md-4">' + this.getImage(element, locale, true) + '</div>';
      });
    }
    return `<div class="e-grid e-px-24 e-br-8 ${
      background === 'Dark' ? 'e-bg-grey' : background === 'Grey' ? 'e-bg-grey-05' : ''
    } " style="margin-top: 12px; margin-bottom: 12px">
    <div class="row e-grid-gutters-ext e-grid-gutters-vertical">
      ${returnString}
    </div>
  </div>`;
  }

  private getEmbeddedAsset(asset: string): string {
    return `<img class="cms-img" src="${asset}"/>`;
  }

  private getParagraph(paragraph: string): string {
    return `<p class="cms-paragraph e-text-body">${paragraph}</p>`;
  }

  private getHeading1(heading: string): string {
    return `<div class="cms-heading1 elvis-anchor">
      <div class="cms-heading1__title" id="${heading.replace(/ /g, '-')}">
        <span class="e-tooltip" tabindex="0">
            <span class="icons">
              <img
                class="cms-section__img normal-img"
                alt="Copy anchor button"
                src="assets/hyperlink-3.svg"
              />
              <img
                class="cms-section__img green-img"
                alt="Copy anchor button"
                src="assets/hyperlink-3-green.svg"
              />
            </span>
            <h2 class="e-title-md elvis-anchor-title e-mb-24 e-mt-0" style="display: flex">
            ${heading}
            <ng-content select="headerIcon"></ng-content>
            </h2>

            <span class="e-tooltip__content">Copied!</span>
          </span>
      </div>
    </div>`;
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

  private getLandingPage(data: ILandingPage, locale: string) {
    const srcUrl = 'https:' + data.fields.overviewImage[locale].fields.file[locale].url;
    return `
      <div class="cms-landing-page">
        <img class="cms-landing-page__img" src="${srcUrl}"></img>
        <div class="cms-landing-page__description e-text-lg">
          ${data.fields.description ? data.fields.description[locale] : ''}
        </div>
      </div>`;
  }

  private getLandingPageWithCards(data: ILandingPageWithCards, locale: string, subMenu: CMSSubMenu[]) {
    const cardList: IOverviewCard[] = [...data.fields.overviewCard[locale]];
    let returnString = '';
    cardList.forEach((card) => {
      let fullPath = '';
      if (card.fields.pageUrl) {
        const subPath = card.fields.pageUrl[locale].fields.path[locale];
        fullPath = this.getFullPath(subPath, subMenu);
        if (!fullPath) {
          this.showErrorMessage('LandingPage', `${subPath} is not an existing page that can be referenced.`);
        }
      } else {
        this.showErrorMessage(
          'LandingPage',
          `The card "${card.fields.title}" is missing page url reference.`,
        );
      }
      const iconUrl = 'https:' + card.fields.pageIcon[locale].fields.file[locale].url;
      const cardTitle = card.fields.title[locale];
      returnString += `<div class="col-sm-4 col-md-3 col-lg-3 col-xl-2dot4">
        <a class="e-link e-link--card" href="${fullPath}">
          <div class="e-link__content">
            <div class="e-link__icon">
              <img src="${iconUrl}"></img>
            </div>
            <div class="e-link__title">${cardTitle}</div>
          </div>
        </a>
      </div>`;
    });
    return (
      `<div class="e-grid" style="margin-top: 20px;"><div class="row components-overview-cards components-overview-cards-animation e-grid-gutters-ext e-grid-gutters-vertical">
      ` +
      returnString +
      '</div></div>'
    );
  }
}
