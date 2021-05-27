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
      [BLOCKS.HEADING_2]: (node, next) => `<h2 class="e-title-md">${next(node.content)}</h2>`,
      [BLOCKS.HEADING_3]: (node, next) => `<h3 class="e-title-sm">${next(node.content)}</h3>`,
      [BLOCKS.PARAGRAPH]: (node, next) => `<p class="e-text-body">${next(node.content)}</p>`,
      [BLOCKS.UL_LIST]: (node, next) => `<ul class="e-list">${next(node.content)}</ul>`,
      [INLINES.HYPERLINK]: (node, next) => `<a class="e-link e-link--inline" href="${node.data.uri}">${next(node.content)}</a>`,
      [BLOCKS.EMBEDDED_ASSET]: (node, next) => `<img class="img-fluid" src="${node.data.target.fields.file.url}"/>`
    }
  }

  getContent(str: String): string {
    return documentToHtmlString(Content.fields.content, this.options);
  }
}
