import { Injectable } from '@angular/core';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

@Injectable({
  providedIn: 'root',
})
export class CMSTransformService {
  private locale = 'en-GB'; // Fallback
  private options = {
    renderMark: {
      [MARKS.BOLD]: (text) => `<b>${text}</b>`,
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, next) =>
        `<h2 class="e-title-md elvis-anchor-title e-mb-24">${next(node.content)}</h2>`, // We don't want want to use h1 tags for this purpose
      [BLOCKS.HEADING_2]: (node, next) =>
        `<h2 class="e-title-md elvis-anchor-title e-mb-24">${next(node.content)}</h2>`,
      [BLOCKS.HEADING_3]: (node, next) => `<h3 class="e-title-sm">${next(node.content)}</h3>`,
      [BLOCKS.HEADING_6]: (node, next) => `<p class="e-text-lg">${next(node.content)}</p>`,
      [BLOCKS.PARAGRAPH]: (node, next) => `<p>${next(node.content)}</p>`,
      [BLOCKS.UL_LIST]: (node, next) => `<ul class="e-list">${next(node.content)}</ul>`,
      [INLINES.HYPERLINK]: (node, next) =>
        `<a class="e-link e-link--inline" href="${node.data.uri}">${next(node.content)}</a>`,
      [BLOCKS.EMBEDDED_ASSET]: (node) =>
        `<img class="cms-img" src="${node.data.target.fields.file[this.locale].url}"/>`,
      [BLOCKS.HR]: () => `<hr class="cms-hr e-mb-24"></hr>`,
      [BLOCKS.EMBEDDED_ENTRY]: (node) => `${this.getHTML(node, this.locale)}`,
    },
  };

  // eslint-disable-next-line
  getHTML(data, locale, cachedEntries?): string {
    this.locale = locale;
    if (data.nodeType === 'embedded-entry-block') {
      return this.embeddedEntryBlock(data, locale);
    }

    return documentToHtmlString(data.fields.content[locale], this.options);
  }

  private embeddedEntryBlock(node, locale) {
    console.log('Entry');
    const type = this.getEntryType(node);
    const data = node.data.target;
    if (type === 'section') {
      return this.getSection(data, locale);
    }
    if (type === 'landingPage') {
      console.log('Landing page');
      return this.getLandingPage(data, locale);
    }
    return documentToHtmlString(data.fields.content, this.options);
  }

  private getEntryType(node) {
    if (!node || !node.data || !node.data.target || !node.data.target.sys || !node.data.target.sys.id) {
      return;
    }

    return node.data.target.sys.contentType.sys.id;
  }

  private getSection(data, locale) {
    return `
        <div class="cms-section">
            <div class="cms-section__title">
                <h2 class="e-title-md elvis-anchor-title e-mb-24" style="display: flex">
                ${data.fields.title ? data.fields.title[locale] : ''}
                </h2>
            </div>
            <div class="cms-section__content e-text-body">
                ${documentToHtmlString(data.fields.content[locale], this.options)}
            </div>
        </div>`;
  }

  private getLandingPage(data, locale) {
    const srcUrl = 'https:' + data.fields.overviewImage[locale].fields.file[locale].url;
    console.log(srcUrl);
    return `
        <div class="cms-landing-page">
            <img class="cms-landing-page__img" src="${srcUrl}"></img>
            <div class="cms-landing-page__description e-text-lg">
              ${data.fields.description ? data.fields.description[locale] : ''}
            </div>
        </div>`;
  }
}
