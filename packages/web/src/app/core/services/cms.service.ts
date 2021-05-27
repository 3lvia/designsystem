import { Injectable } from '@angular/core';
import * as Content from '@elvia/content/dist/community-cms-test';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

@Injectable({
  providedIn: 'root',
})


export class CMSService {
  options = {
    renderMark: {
      [MARKS.BOLD]: text => `<b>${text}</b>`
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, next) => `<h2 class="e-title-md elvis-anchor-title e-mb-24">${next(node.content)}</h2>`, // We don't want want to use h1 tags for this purpose
      [BLOCKS.HEADING_2]: (node, next) => `<h2 class="e-title-md elvis-anchor-title e-mb-24">${next(node.content)}</h2>`,
      [BLOCKS.HEADING_3]: (node, next) => `<h3 class="e-title-sm">${next(node.content)}</h3>`,
      [BLOCKS.PARAGRAPH]: (node, next) => `<p class="e-text-body">${next(node.content)}</p>`,
      [BLOCKS.UL_LIST]: (node, next) => `<ul class="e-list">${next(node.content)}</ul>`,
      [INLINES.HYPERLINK]: (node, next) => `<a class="e-link e-link--inline" href="${node.data.uri}">${next(node.content)}</a>`,
      [BLOCKS.EMBEDDED_ASSET]: (node, next) => `<img class="cms-img" src="${node.data.target.fields.file.url}"/>`,
      [BLOCKS.HR]: (node, next) => `<hr class="cms-hr e-mb-24"></hr>`
    }
  }

  getContent(str: String): any {
    return {
      title: Content.fields.title,
      pageDescription: Content.fields.pageDescription,
      content: documentToHtmlString(Content.fields.content, this.options)
    }
  }
}
