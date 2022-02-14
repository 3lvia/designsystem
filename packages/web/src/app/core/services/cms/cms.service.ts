import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CMSTransformService } from './cms-transform.service';
import { Locale } from '../localization.service';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { IDocumentationPage, IMainMenu, ISubMenu } from 'contentful/__generated__/types';
import { CMSMenu, CMSSubMenu, TransformedDocPage } from './cms.interface';

@Injectable({
  providedIn: 'root',
})
export class CMSService {
  private entries = {};
  private entriesToSync = [];
  private subjectAnchorsNew = new Subject<void>();

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
        return pageId;
      } else {
        if (!subMenu) {
          console.error('Can´t find this submenu: ' + urlWithoutAnchor[1]);
          this.router.navigate(['not-found']);
        }
        if (!urlWithoutAnchor[2] && subMenu.entry.fields.landingPage) {
          pageId = subMenu.entry.fields.landingPage[localeKey].sys.id;
        } else if (subMenu.entry.fields.pages) {
          const docPage = subMenu.entry.fields.pages[localeKey].find(
            (page) => page.fields.path[localeKey] === urlWithoutAnchor[2],
          );
          if (!docPage) {
            console.error('Can´t find this docPage: ' + urlWithoutAnchor[2]);
            this.router.navigate(['not-found']);
          }
          pageId = docPage.sys.id;
        }
      }
    });
    return pageId;
  }

  async getTransformedDocPageByEntryId(entryId: string, localization: Locale): Promise<TransformedDocPage> {
    const subMenu = await this.getSubMenu(localization);
    const cmsData = await this.getEntry(entryId);
    return this.cmsTransformService.transformEntryToDocPage(cmsData, subMenu, localization);
  }

  async getTransformedDocPageByEntry(
    cmsData: IDocumentationPage,
    localization: Locale,
  ): Promise<TransformedDocPage> {
    const subMenu = await this.getSubMenu(localization);
    return this.cmsTransformService.transformEntryToDocPage(cmsData, subMenu, localization);
  }

  async getSubMenu(localization: Locale): Promise<CMSSubMenu[]> {
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
        const cmsPages: IDocumentationPage[] = element.entry.fields.pages[localeKey];
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

  async getMenu(localization: Locale): Promise<CMSMenu> {
    let locale = 'en-GB';
    if (localization === Locale['nb-NO']) {
      locale = 'nb-NO';
    }
    const entryMenu: IMainMenu = await this.getEntry('4ufFZKPEou3mf9Tg05WZT3');
    const menu: CMSMenu = {
      title: entryMenu.fields.title['en-GB'],
      pages: [],
    };
    const subMenuEntries: ISubMenu[] = entryMenu.fields.submenus['en-GB'];
    for (let i = 0; i < subMenuEntries.length; i++) {
      const subEntry = await this.getEntry(subMenuEntries[i].sys.id);
      const subMenu: CMSSubMenu = {
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
