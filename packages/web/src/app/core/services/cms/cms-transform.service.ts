import { Injectable } from '@angular/core';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

@Injectable({
    providedIn: 'root',
})

export class CMSTransformService {
    private options = {
        renderMark: {
            [MARKS.BOLD]: text => `<b>${text}</b>`
        },
        renderNode: {
            [BLOCKS.HEADING_1]: (node, next) => `<h2 class="e-title-md elvis-anchor-title e-mb-24">${next(node.content)}</h2>`, // We don't want want to use h1 tags for this purpose
            [BLOCKS.HEADING_2]: (node, next) => `<h2 class="e-title-md elvis-anchor-title e-mb-24">${next(node.content)}</h2>`,
            [BLOCKS.HEADING_3]: (node, next) => `<h3 class="e-title-sm">${next(node.content)}</h3>`,
            [BLOCKS.PARAGRAPH]: (node, next) => `<p>${next(node.content)}</p>`,
            [BLOCKS.UL_LIST]: (node, next) => `<ul class="e-list">${next(node.content)}</ul>`,
            [INLINES.HYPERLINK]: (node, next) => `<a class="e-link e-link--inline" href="${node.data.uri}">${next(node.content)}</a>`,
            [BLOCKS.EMBEDDED_ASSET]: (node, next) => `<img class="cms-img" src="${node.data.target.fields.file.url}"/>`,
            [BLOCKS.HR]: (node, next) => `<hr class="cms-hr e-mb-24"></hr>`,
            [BLOCKS.EMBEDDED_ENTRY]: (node) => `${this.getHTML(node)}`
        }
    }




    getHTML(data, cachedEntries?): string {
        if (data.nodeType === 'embedded-entry-block') {
            return this.embeddedEntryBlock(data);
        }

        return documentToHtmlString(data.fields.content, this.options);
    }

    private embeddedEntryBlock(node) {
        const type = this.getEntryType(node);
        const data = node.data.target;
        if (type === 'section') {
            return this.getSection(data);
        }
        return documentToHtmlString(data.fields.content, this.options);
    }

    private getEntryType(node) {
        if (!node || !node.data || !node.data.target || !node.data.target.sys || !node.data.target.sys.id) {
            return;
        }

        return node.data.target.sys.contentType.sys.id;
    }

    private getSection(data) {
        return `
        <app-component-subsection>
            <ng-container ngProjectAs="sectionContent">
                ${documentToHtmlString(data.fields.content, this.options)}
            </ng-container>
        </app-component-subsection>`;
    }
}
