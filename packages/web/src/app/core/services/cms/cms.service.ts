import { Injectable } from '@angular/core';
import * as ContentConfig from '../../../../../contentful/content.config';
import { HttpClient } from '@angular/common/http';
import { CMSTransformService } from './cms-transform.service';
import { Locale } from '../localization.service';

@Injectable({
  providedIn: 'root',
})
export class CMSService {
  private entries = {};
  private entriesToSync = [];

  constructor(private http: HttpClient, private cmsTransformService: CMSTransformService) {}

  getDocumentationPage(pageName: string, localization: Locale): Promise<any> {
    let locale = 'en-GB';
    if (localization === Locale['nb-NO']) {
      locale = 'nb-NO';
    }
    const contentMetadata = ContentConfig[pageName];

    if (!contentMetadata) {
      console.error('ERROR: getContent - No content found for that string');
    }

    return this.getEntry(contentMetadata.contentful.entry_id).then((data) => {
      return {
        title: data.fields.title[locale],
        pageDescription: data.fields.pageDescription[locale],
        content: this.cmsTransformService.getHTML(data, locale, this.entries),
      };
    });
  }

  getMenu(localization: Locale) {
    let locale = 'en-GB';
    if (localization === Locale['nb-NO']) {
      locale = 'nb-NO';
    }
    return this.getEntry('31WPcyslzeoeVLtVXjXju1').then((data) => {
      const menu = {};
      menu['title'] = data.fields.title['en-GB'];
      const submenus = [];

      data.fields.submenus['en-GB'].map((item) => {
        // No localization on submenu list. We show the same things for both languages.
        submenus.push({
          title: item.fields.title[locale],
          entry_id: item.sys.id,
          path: item.fields.path['en-GB'], // url path - No localization on this field
        });
      });

      menu['pages'] = submenus;
      return menu;
    });
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
      node.forEach((item) => {
        this.findEntriesWithinNode(item);
      });
      return;
    }
    const keys = Object.keys(node);
    keys.forEach((key) => {
      if (key === 'fields' || key === 'content' || key === 'data' || key === 'target' || key === 'sys') {
        this.findEntriesWithinNode(node[key]);
      }
    });
  }

  private async getEntry(entryId: string): Promise<any> {
    const url = `assets/contentful/dist/entries/${entryId}.json`;
    this.entries[entryId] = await this.http.get(url).toPromise();

    this.findEntriesWithinNode(this.entries[entryId]);
    await this.syncEntries(); // getAllEntries();

    return this.entries[entryId];
  }
}
