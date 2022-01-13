import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CMSTransformService } from './cms-transform.service';
import { Locale } from '../localization.service';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CMSService {
  private entries = {};
  private entriesToSync = [];
  private subjectAnchorsNew = new Subject<any>();

  constructor(
    private http: HttpClient,
    private cmsTransformService: CMSTransformService,
    private router: Router,
  ) {}

  listenContentLoadedFromCMS(): Observable<any> {
    return this.subjectAnchorsNew.asObservable();
  }

  contentLoadedFromCMS(): void {
    this.subjectAnchorsNew.next();
  }

  async getPageSysId(locale: number): Promise<string> {
    const urlFull = this.router.url.split('#')[0];
    const urlWithoutAnchor = urlFull.split('/');
    let pageId = '';
    await this.getMenu(locale).then((menu) => {
      const localeKey = Object.keys(menu['pages'][0].entry.fields.pages)[locale];
      const subMenu = menu['pages'].find((subMenu) => subMenu.path === urlWithoutAnchor[1]);
      if (urlWithoutAnchor[1] === 'preview' && urlWithoutAnchor[2]) {
        pageId = urlWithoutAnchor[2];
        return;
      }
      if (!subMenu) {
        console.error('FOUND NO SUBMENU WITH THAT PATH');
      }
      if (!urlWithoutAnchor[2] && subMenu.entry.fields.landingPage) {
        pageId = subMenu.entry.fields.landingPage[localeKey].sys.id;
      } else if (subMenu.entry.fields.pages) {
        const docPage = subMenu.entry.fields.pages[localeKey].find(
          (page) => page.fields.path[localeKey] === urlWithoutAnchor[2],
        );
        if (!docPage) {
          console.error('FOUND NO PAGE WITH THAT PATH');
        }
        pageId = docPage.sys.id;
      }
    });
    return pageId;
  }

  async getDocumentationPageByEntryId(entryId: string, localization: Locale): Promise<any> {
    let locale = 'en-GB';
    if (localization === Locale['nb-NO']) {
      locale = 'nb-NO';
    }

    const subMenu = await this.getSubMenu(localization);
    const data = await this.getEntry(entryId);
    let subMenuRoute = '';
    if (this.router.url.split('/')[2]) {
      subMenuRoute = this.router.url.split('/')[1] + '/';
    }
    const description = data.fields.pageDescription
      ? this.cmsTransformService.getHTML(data, locale, subMenu, 'pageDescription')
      : '';
    const content = data.fields.content
      ? this.cmsTransformService.getHTML(data, locale, subMenu, 'content')
      : '';
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
    };
  }

  async getSubMenu(localization: Locale): Promise<any> {
    const mainMenu = await this.getMenu(localization);
    return mainMenu.pages;
  }

  async getSubMenuList(localization: Locale): Promise<any> {
    const mainMenu = await this.getMenu(localization);
    const subMenuRoute = this.router.url.split('/')[1];
    const subMenuList = [];
    mainMenu.pages.forEach((element) => {
      if (element.path === subMenuRoute) {
        if (element.entry.fields.pages === undefined || element.entry.fields.pages === null) {
          return;
        }
        const localeKey = Object.keys(element.entry.fields.pages)[localization];
        const cmsPages = element.entry.fields.pages[localeKey];
        cmsPages.forEach((element) => {
          const navbarItem = {
            title: element.fields.title[localeKey],
            isMainPage: element.fields.isMainPage,
            docUrl: element.fields.path[localeKey],
            fullPath: subMenuRoute + element.fields.path[localeKey],
          };
          subMenuList.push(navbarItem);
        });
      }
    });
    return subMenuList;
  }

  async getMenu(localization: Locale): Promise<any> {
    let locale = 'en-GB';
    if (localization === Locale['nb-NO']) {
      locale = 'nb-NO';
    }
    const entryMenu = await this.getEntry('4ufFZKPEou3mf9Tg05WZT3');
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

  async syncEntries(): Promise<any> {
    while (this.entriesToSync.length > 0) {
      const id = this.entriesToSync.pop();
      await this.getEntry(id);
    }
  }

  async findEntriesWithinNode(node: Record<string, any>): Promise<any> {
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
