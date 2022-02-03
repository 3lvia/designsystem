import { Injectable } from '@angular/core';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { documentToHtmlString, Options } from '@contentful/rich-text-html-renderer';
import { Locale } from '../localization.service';
import { Router } from '@angular/router';
import {
  ICenteredContent,
  IDocumentationPage,
  IImage,
  IInternalLink,
  ILandingPage,
  ILandingPageWithCards,
  IOverviewCard,
  ISection,
  ISubsection,
  ISubsubsection,
} from 'contentful/__generated__/types';
import { TransformedDocPage } from './cms.interface';

@Injectable({
  providedIn: 'root',
})
export class CMSTransformService {
  private locale = 'en-GB'; // Fallback
  private subMenu;
  private options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => `<b>${text}</b>`,
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

  constructor(private router: Router) { }

  // eslint-disable-next-line
  getHTML(data, locale: string, subMenu?, model?: string): string {
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

  transformEntryToDocPage(
    data: IDocumentationPage,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    subMenu,
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
    };
  }

  private embeddedEntryBlock(node, locale: string, subMenu, inlineEntry: boolean) {
    const type = this.getEntryType(node);
    const data = node.data.target;
    if (type === 'section') {
      return this.getSection(data, locale);
    }
    if (type === 'subsection') {
      return this.getSubsection(data, locale);
    }
    if (type === 'subsubsection') {
      return this.getSubsubsection(data, locale);
    }
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
    if (type === 'image') {
      return this.getImage(data, locale);
    }
    return documentToHtmlString(data.fields.content, this.options);
  }

  private getEntryType(node) {
    if (!node || !node.data || !node.data.target || !node.data.target.sys || !node.data.target.sys.id) {
      return;
    }

    return node.data.target.sys.contentType.sys.id;
  }

  private getCenteredContent(data: ICenteredContent, locale: string) {
    return `
      <div class="cms-centered-content">
        ${documentToHtmlString(data.fields.content[locale], this.options)}
      </div>`;
  }

  private getList(content: string) {
    const liRegex = /(?:<li>)(.*?)(?=<\/li>)/g;
    const imgRegex = /(?:<img)(.*?)(?=\/>)/g;
    if (!content.match(liRegex)) {
      console.error('List: Formatting of lists content is not correct, make sure there are no line breaks.');
    }
    let liStrings = [...content.match(liRegex)];
    const bulletIcons = liStrings.map((i) => {
      const imageUrl = i.match(imgRegex) && i.match(imgRegex)[0].replace('<img', '');
      const str = '<img style="position: absolute; margin-right: 8px; margin-left: -48px;"' + imageUrl + '/>';
      return str.replace('class="cms-img', '');
    });
    liStrings = liStrings.map((li) => {
      return li.replace(imgRegex, '').replace('<img/>', '').replace('<li>/>', '<li>');
    });
    if (bulletIcons[0].includes('src=')) {
      let returnString = `<ol class="e-list e-list--icons">`;
      for (let liIndex = 0; liIndex <= liStrings.length - 1; liIndex++) {
        returnString += `<li><span class="e-list__icon">${bulletIcons[liIndex]}</span>`;
        returnString += `<span>${liStrings[liIndex]}</span></li>`;
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
    return ` <div class="cms-quote-container">
    <div>
      <i class="e-icon e-icon--quotation-color e-icon--lg"></i>
    </div>
    <div class="cms-quote-text e-text-quote">
      ${quote}
    </div>
  </div>`;
  }

  private getLinkPath(data: IInternalLink, locale: string, subMenu, paragraphTitle): string {
    let linkPath = '';
    if (data.fields.page) {
      const subPath = data.fields.page[locale].fields.path[locale];
      linkPath = this.getFullPath(subPath, subMenu) + '#' + paragraphTitle;
    } else if (data.fields.urlNewTab) {
      linkPath = data.fields.urlNewTab[locale];
    } else {
      console.error('Link: Missing either page reference or url.');
    }
    return linkPath;
  }

  private getLink(data: IInternalLink, locale: string, subMenu, inlineEntry: boolean) {
    const linkText = data.fields.title[locale];
    const type = data.fields.type ? data.fields.type[locale] : '';
    const isInline = inlineEntry;
    const isExternal = data.fields.urlNewTab !== undefined && data.fields.page === undefined;
    const isAction = type === 'Action' && !isExternal;
    const paragraphTitle = data.fields.paragraph ? data.fields.paragraph[locale] : '';
    const linkPath = this.getLinkPath(data, locale, subMenu, paragraphTitle)
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
          ${isAction && !isInline
        ? '<span class="e-link__icon"><i class="e-icon e-icon--arrow_right_circle-color"></i><i class="e-icon e-icon--arrow_right_circle-filled-color"></i></span>'
        : ''
      }
          ${isExternal
        ? '<span class="e-link__icon"><i class="e-icon e-icon--new_tab-bold"></i></span>'
        : ''
      }
        </a>
      ${!isInline ? '</p>' : ''}`;
  }

  private getImage(data: IImage, locale: string) {
    const hasInlineText = data.fields.inlineText !== undefined;
    const imgSize = data.fields.size[locale];
    const imgAlignment = data.fields.alignment[locale];
    const description = data.fields.description ? data.fields.description[locale] : undefined;
    let altText;
    if (!data.fields.name) {
      console.error(`Image: A image on your page is missing title.`);
    } else if (data.fields.altText) {
      altText = data.fields.altText[locale];
    } else {
      console.error(`Image: Image '${data.fields.name[locale]}' is missing alt text.`);
    }
    const srcUrl = 'https:' + data.fields.image[locale].fields.file[locale].url;
    return `<div
      ${`style=' 
        ${hasInlineText ? 'display: block' : `display: inline-block;`}
        ${imgSize === 'original'
        ? `width: unset`
        : imgSize === '100%'
          ? `width: calc(${imgSize} - 64px)`
          : `width: ${imgSize}`
      }
      '`}
      ${`class='
        cms-image
        ${imgSize === '25%' ? `cms-image-small` : `cms-image-normal`}
      '`}
    >
      <div>
        <img
          ${`class='
            ${hasInlineText ? 'cms-image-inline' : ''} 
            align-${imgAlignment}
            ${imgSize === 'original' ? 'original-margin' : ''} 
          '`}
          ${`style=' 
            ${hasInlineText
        ? `display: inline; width: ${imgSize}`
        : 'max-width: 100%'
      } 
          '`}
          src="${srcUrl}"
          ${altText !== 'decorative' && altText !== '"decorative"' ? `alt="${altText}"` : ``}
        />
        <div 
          ${`class=' 
            ${description !== undefined && 'cms-image-desc-show'} 
            cms-image-desc
            e-text-img'
          `}
        >
          ${documentToHtmlString(description, this.options)}
        </div>
      </div>
      ${hasInlineText
        ? `${documentToHtmlString(data.fields.inlineText[locale], this.options)}`
        : ''
      }
      <div style="clear: ${imgAlignment}"></div>
    </div>
    `;
  }

  private getFullPath(subPath: string, subMenu) {
    let fullPath = '';
    subMenu.forEach((element) => {
      if (element.path === subPath) {
        fullPath = subPath;
      } else {
        element.entry.fields.pages[this.locale].forEach((subElement) => {
          if (subElement.fields.path[this.locale] === subPath) {
            fullPath = element.path + '/' + subPath;
          }
        });
      }
    });
    if (fullPath === '') {
      console.error('Link: ' + subPath + ' is not an existing page that can be referenced.');
    }
    return fullPath;
  }

  private getEmbeddedAsset(asset: string): string {
    return `<img class="cms-img" src="${asset}"/>`;
  }

  private getSection(data: ISection, locale: string) {
    return `
      <div class="cms-section elvis-anchor">
        <div class="cms-section__title" id="${data.fields.title[locale] ? data.fields.title[locale].replaceAll(' ', '-') : ''
      }">
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
            ${data.fields.title ? data.fields.title[locale] : ''}
            <ng-content select="headerIcon"></ng-content>
            </h2>

            <span class="e-tooltip__content">Copied!</span>
          </span>
        </div>
        <div class="cms-section__content e-text-body">
            ${documentToHtmlString(data.fields.content[locale], this.options)}
        </div>
      </div>`;
  }

  private getSubsection(data: ISubsection, locale: string) {
    return `
      <div class="cms-subsection e-my-72">
        <div class="cms-subsection__title">
          <h3 class="e-title-sm e-mt-0 e-mb-16" style="display: flex">
            ${data.fields.title ? data.fields.title[locale] : ''}
          </h3>
        </div>
        <div class="cms-subsection__content e-text-body e-my-0">
          ${documentToHtmlString(data.fields.content[locale], this.options)}
        </div>
      </div>`;
  }

  private getSubsubsection(data: ISubsubsection, locale: string) {
    return `
      <div class="cms-subsubsection e-my-48">
        <div class="cms-subsubsection__title">
          <h4 class="e-title-xs e-mt-0 e-mb-8" style="display: flex">
            ${data.fields.title ? data.fields.title[locale] : ''}
          </h4>
        </div>
        <div class="cms-subsubsection__content e-text-body e-my-0">
          ${documentToHtmlString(data.fields.content[locale], this.options)}
        </div>
      </div>`;
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

  private getLandingPageWithCards(data: ILandingPageWithCards, locale: string, subMenu) {
    const cardList: IOverviewCard[] = [...data.fields.overviewCard[locale]];
    let returnString = '';
    cardList.forEach((card) => {
      let fullPath = '';
      if (card.fields.pageUrl) {
        const subPath = card.fields.pageUrl[locale].fields.path[locale];
        fullPath = this.getFullPath(subPath, subMenu);
      } else {
        console.error('Link: Missing either page reference or url.');
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
