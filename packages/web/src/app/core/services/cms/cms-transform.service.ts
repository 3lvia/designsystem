import { Injectable } from '@angular/core';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

@Injectable({
  providedIn: 'root',
})
export class CMSTransformService {
  private locale = 'en-GB'; // Fallback
  private subMenu;
  private options = {
    renderMark: {
      [MARKS.BOLD]: (text) => `<b>${text}</b>`,
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, next) => `<h2 class="e-title-md e-mb-24">${next(node.content)}</h2>`, // We don't want want to use h1 tags for this purpose
      [BLOCKS.HEADING_2]: (node, next) => `<h2 class="e-title-md e-mb-24">${next(node.content)}</h2>`,
      [BLOCKS.HEADING_3]: (node, next) => `<h3 class="e-title-sm">${next(node.content)}</h3>`,
      [BLOCKS.HEADING_6]: (node, next) => `<p class="e-text-lg">${next(node.content)}</p>`,
      [BLOCKS.PARAGRAPH]: (node, next) => `<p>${next(node.content)}</p>`,
      [BLOCKS.UL_LIST]: (node, next) => `${this.getList(next(node.content))}`,
      [BLOCKS.OL_LIST]: (node, next) => `<ul class="e-list e-list--numbers">${next(node.content)}</ul>`,
      [INLINES.HYPERLINK]: (node, next) =>
        `<a class="e-link e-link--inline" href="${node.data.uri}">${next(node.content)}</a>`,
      [BLOCKS.EMBEDDED_ASSET]: (node) =>
        `<img class="cms-img" src="${node.data.target.fields.file[this.locale].url}"/>`,
      [BLOCKS.HR]: () => `<hr class="cms-hr e-mb-24"></hr>`,
      [BLOCKS.EMBEDDED_ENTRY]: (node) => `${this.getHTML(node, this.locale, this.subMenu)}`,
      [INLINES.EMBEDDED_ENTRY]: (node) => `${this.getHTML(node, this.locale, this.subMenu)}`,
    },
  };

  // eslint-disable-next-line
  getHTML(data, locale, subMenu?, model?): string {
    this.subMenu = subMenu;
    this.locale = locale;
    if (data.nodeType === 'embedded-entry-block' || data.nodeType === 'embedded-entry-inline') {
      return this.embeddedEntryBlock(data, locale, this.subMenu);
    }
    if (model === 'content') {
      return documentToHtmlString(data.fields.content[locale], this.options);
    } else if (model === 'pageDescription') {
      return documentToHtmlString(data.fields.pageDescription[locale], this.options);
    }
  }

  private embeddedEntryBlock(node, locale, subMenu) {
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
      return this.getLink(data, locale, subMenu);
    }
    return documentToHtmlString(data.fields.content, this.options);
  }

  private getEntryType(node) {
    if (!node || !node.data || !node.data.target || !node.data.target.sys || !node.data.target.sys.id) {
      return;
    }

    return node.data.target.sys.contentType.sys.id;
  }

  private getCenteredContent(data, locale) {
    return `
      <div class="cms-centered-content">
        ${documentToHtmlString(data.fields.content[locale], this.options)}
      </div>`;
  }

  private getList(content) {
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

  private getLink(data, locale, subMenu) {
    let fullPath = '';
    if (data.fields.page) {
      const subPath = data.fields.page[locale].fields.path[locale];
      fullPath = this.getFullPath(subPath, subMenu);
    } else if (data.fields.urlNewTab) {
      fullPath = data.fields.urlNewTab[locale];
    } else {
      console.error('Link: Missing either page reference or url.');
    }
    return `
      <a 
        href="${fullPath}" 
        ${`class='e-link
          ${data.fields.inline[locale] ? `e-link--inline` : ''} 
          ${data.fields.action[locale] ? `e-link--action` : ''} 
          ${data.fields.newTab[locale] ? `e-link--new-tab` : ''}
          ${data.fields.size[locale] === 'Large' ? `e-link--lg` : ''}
          ${data.fields.size[locale] === 'Small' ? `e-link--sm` : ''}
        '`}
        ${data.fields.newTab[locale] ? `target="_blank"` : ''}
      >
        ${data.fields.title[locale] ? `<span class="e-link__title">${data.fields.title[locale]}</span>` : ''}
        ${
          data.fields.action[locale]
            ? `<span class="e-link__icon">
          <i class="e-icon e-icon--arrow_right_circle-color"></i>
          <i class="e-icon e-icon--arrow_right_circle-filled-color"></i>
        </span>`
            : ''
        }
        ${
          data.fields.newTab[locale]
            ? `<span class="e-link__icon"><i class="e-icon e-icon--new_tab-bold"></i></span>`
            : ''
        }
      </a>`;
  }

  private getFullPath(subPath, subMenu) {
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

  private getSection(data, locale) {
    return `
      <div class="cms-section elvis-anchor">
        <div class="cms-section__title">
            <h2 class="e-title-md elvis-anchor-title e-mb-24 e-mt-0" style="display: flex">
            ${data.fields.title ? data.fields.title[locale] : ''}
            </h2>
        </div>
        <div class="cms-section__content e-text-body">
            ${documentToHtmlString(data.fields.content[locale], this.options)}
        </div>
      </div>`;
  }
  private getSubsection(data, locale) {
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
  private getSubsubsection(data, locale) {
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

  private getLandingPage(data, locale) {
    const srcUrl = 'https:' + data.fields.overviewImage[locale].fields.file[locale].url;
    return `
      <div class="cms-landing-page">
        <img class="cms-landing-page__img" src="${srcUrl}"></img>
        <div class="cms-landing-page__description e-text-lg">
          ${data.fields.description ? data.fields.description[locale] : ''}
        </div>
      </div>`;
  }

  private getLandingPageWithCards(data, locale, subMenu) {
    const cardList = [...data.fields.overviewCard[locale]];
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
