import { Injectable } from '@angular/core';
import * as ContentConfig from '../../../../../contentful/content.config';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { HttpClient } from '@angular/common/http';
import { CMSTransformService } from './cms-transform.service';

@Injectable({
  providedIn: 'root',
})

export class CMSService {

  private entries = {};
  private entriesToSync = [];

  constructor(private http: HttpClient, private cmsTransformService: CMSTransformService) { }


  getDocumentationPage(pageName: String): Promise<any> {
    const contentMetadata = ContentConfig[pageName];

    if (!contentMetadata) {
      console.error("ERROR: getContent - No content found for that string");
    }

    return this.getEntry(contentMetadata.contentful.entry_id).then(data => {
      return {
        title: data.fields.title,
        pageDescription: data.fields.pageDescription,
        content: this.cmsTransformService.getHTML(data, this.entries) //documentToHtmlString(data.fields.content, this.options)
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
}
