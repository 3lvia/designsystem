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

  constructor(private http: HttpClient, private cmsTransformService: CMSTransformService) { }

  getDocumentationPageByEntryId(entryId: string, localization: Locale): Promise<any> {
    let locale = 'en-GB';
    if (localization === Locale['nb-NO']) {
      locale = 'nb-NO';
    }

    return this.getEntry(entryId).then((data) => {
      return {
        title: data.fields.title[locale],
        pageDescription: data.fields.pageDescription[locale],
        content: this.cmsTransformService.getHTML(data, locale, this.entries),
      };
    });
  }
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

  async getMenu(localization: Locale) {
    let locale = 'en-GB';
    if (localization === Locale['nb-NO']) {
      locale = 'nb-NO';
    }
    const entryMenu = await this.getEntry('31WPcyslzeoeVLtVXjXju1');
    const menu = {};
    menu['title'] = entryMenu.fields.title['en-GB'];
    menu['pages'] = [];
    const subMenuEntries = entryMenu.fields.submenus['en-GB'];
    for (let i = 0; i < subMenuEntries.length; i++) {
      const subEntry = await this.getEntry(subMenuEntries[i].sys.id);
      const subMenu = {
        title: subMenuEntries[i].fields.title[locale],
        entry_id: subMenuEntries[i].sys.id,
        entry: subEntry,
        path: subMenuEntries[i].fields.path['en-GB'], // url path - No localization on this field
      };
      menu['pages'].push(subMenu);

    }
    return menu;
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
