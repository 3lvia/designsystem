import { Injectable } from '@angular/core';
import * as ContentConfig from '../../../../contentful/content.config';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CMSService {

  private entries = {};
  private entriesToSync = [];
  private options = {
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
      [BLOCKS.HR]: (node, next) => `<hr class="cms-hr e-mb-24"></hr>`,
      [BLOCKS.EMBEDDED_ENTRY]: (node) => `${this.getEmbeddedEntry(node)}`
    }
  }

  constructor(private http: HttpClient) { }

  getEmbeddedEntry(node): String {
    return this.getInstantContent(node.data.target.sys.id);
  }


  getDocumentationPage(pageName: String): Promise<any> {
    const contentMetadata = ContentConfig[pageName];

    if (!contentMetadata) {
      console.error("ERROR: getContent - No content found for that string");
    }

    return this.getEntry(contentMetadata.contentful.entry_id).then(data => {
      return {
        title: data.fields.title,
        pageDescription: data.fields.pageDescription,
        content: documentToHtmlString(data.fields.content, this.options)
      }
    });
  }


  private async getEntry(entryId: string): Promise<any> {
    const url = `assets/contentful/dist/entries/${entryId}.json`
    this.entries[entryId] = await this.http.get(url).toPromise();

    this.findEntriesWithinNode(this.entries[entryId]);
    await this.syncEntries(); // getAllEntries();


    return this.entries[entryId];
  }

  async syncEntries() {
    while (this.entriesToSync.length > 0) {
      const id = this.entriesToSync.pop();
      await this.getEntry(id);
    }
  }

  async findEntriesWithinNode(node) {
    if (node.id && node.type === 'Entry') {
      if (!this.entries[node.id]) {
        this.entriesToSync.push(node.id);
      }
    }
    if (node instanceof Array) {
      node.forEach(item => {
        this.findEntriesWithinNode(item);
      });
      return;
    }
    const keys = Object.keys(node);
    keys.forEach(key => {
      if (key === 'fields' || key === 'content' || key === 'data' || key === 'target' || key === 'sys') {
        this.findEntriesWithinNode(node[key]);
      }
    })
  }


  /**
   * private async getEntry(entryId: string): Promise<any> {
    const url = `assets/contentful/dist/entries/${entryId}.json`
    this.entries[entryId] = await this.http.get(url).toPromise();
    return this.entries[entryId];
  }
   */


  private getInstantContent(entryId: string): string {
    const data = this.entries[entryId];

    if (!data) {
      console.error('No matching content');
      return '';
    }
    console.log(data);
    return documentToHtmlString(data.fields.content, this.options);
  }/*

  // Recursively go through entire object
  async goThroughNodes(node) {
    if (node.id && node.type === 'Entry') {
      if (!this.entries[node.id]) {
        console.log("goThroughNodes - start ", node)
        const data = await this.getEntry(node.id);
        this.entries[node.id] = data;
        console.log("goThroughNodes - end", data);
        return data;
      }
    }
    if (node instanceof Array) {
      node.forEach(item => {
        this.goThroughNodes(item);
      });
      return;
    }
    const keys = Object.keys(node);
    keys.forEach(key => {
      if (key === 'fields' || key === 'content' || key === 'data' || key === 'target' || key === 'sys') {
        this.goThroughNodes(node[key]);
      }
    })
  }


  // getContent -> trigger

  // TODO: findEntriesInExistingEntries
  // TODO: getContentForAllEmptyEntries -> forEach -> findEntries
  // TODO: createHTML

  private async getContentForAllEmptyEntries() {
    Object.keys(this.entries).forEach(async (entryId) => {
      // Check if entry is empty
      if (Object.keys(this.entries[entryId]).length === 0) {
        await this.http.get(`assets/contentful/dist/entries/${entryId}.json`).toPromise().then((data: any) => {
          this.entries[entryId] = data;
        });
      }
    });
  }




  private async getEntry(entryId: string): Promise<any> {

    console.log("getEntry - start - " + entryId, this.entries);
    const url = `assets/contentful/dist/entries/${entryId}.json`
    const data = await this.http.get(url).toPromise();
    this.entries[entryId] = data;
    //console.log("should have data", JSON.stringify(data));



    const val = await this.goThroughNodes(data);
    console.log("getEntry - end - " + entryId, this.entries);




    return data;


    /*return {
      title: data.fields.title,
      pageDescription: data.fields.pageDescription,
      content: documentToHtmlString(data.fields.content, this.options)
    }
  } */
}
