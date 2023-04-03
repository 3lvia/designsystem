import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CMSTransformService } from './cms-transform.service';
import { Locale } from '../localization.service';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { IDocumentationPage, IEntry, IMainMenu, ISubMenu, LOCALE_CODE } from 'contentful/types';
import { CMSMenu, CMSNavbarItem, CMSSubMenu, TransformedDocPage } from './cms.interface';
import { extractLocale } from './extractLocale';

@Injectable({
  providedIn: 'root',
})
export class CMSService {
  private entries = {};
  private entriesToSync: string[] = [];
  private subjectAnchorsNew = new Subject<void>();
  private getMenuCache = new Map<Locale, CMSMenu>();

  constructor(
    private http: HttpClient,
    private cmsTransformService: CMSTransformService,
    private router: Router,
  ) {}

  listenContentLoadedFromCMS(): Observable<void> {
    return this.subjectAnchorsNew.asObservable();
  }

  contentLoadedFromCMS(): void {
    this.subjectAnchorsNew.next();
  }

  /**
   * Get the Contentful ID of the Contentful entry corresponding to the current path.
   *
   * If the page corresponding to the current path is not found, the client is rerouted to 'not-found' and an empty string is returned.
   * @param localization Current locale (see localization.service.ts).
   * @returns Contentful ID of the current page.
   */
  async getPageSysId(localization: Locale): Promise<string> {
    const urlFull = this.router.url.split('#')[0];
    const urlWithoutAnchor = urlFull.split('/');
    let pageId = '';
    await this.getMenu(localization).then((menu) => {
      const localeKey = (Object.keys(menu['pages'][0].entry.fields.pages)[localization] ??
        'en-GB') as LOCALE_CODE;
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
          pageId = extractLocale(subMenu.entry.fields.landingPage, localeKey).sys.id;
        } else if (subMenu.entry.fields.pages) {
          const docPage = extractLocale(subMenu.entry.fields.pages, localeKey).find(
            (page) => extractLocale(page.fields.path, localeKey) === urlWithoutAnchor[2],
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

  /**
   * Transforms a documentation page entry from Contentful to be displayed.
   *
   * @param entryId Contentful ID of documentation page entry.
   * @param localization Current localization (see localization.service.ts).
   * @returns Documentation page transformed by the cms-transform.service.
   */
  async getTransformedDocPageByEntryId(entryId: string, localization: Locale): Promise<TransformedDocPage> {
    const subMenu = await this.getSubMenu(localization);
    const cmsData = await this.getEntry<IDocumentationPage>(entryId);
    return this.cmsTransformService.transformEntryToDocPage(cmsData, subMenu, localization);
  }

  /**
   * Transforms a documentation page entry from Contentful to be displayed.
   *
   * @param cmsData Documentation page entry from Contentful.
   * @param localization Current localization (see localization.service.ts).
   * @returns Documentation page transformed by the cms-transform.service.
   */
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

  async getSubMenuList(localization: Locale): Promise<CMSNavbarItem[]> {
    const mainMenu = await this.getMenu(localization);
    const subMenuRoute = this.router.url.split('/')[1];
    const subMenuList: CMSNavbarItem[] = [];
    mainMenu.pages.forEach((element) => {
      if (element.path === subMenuRoute) {
        if (element.entry.fields.pages === undefined || element.entry.fields.pages === null) {
          return;
        }
        const localeKey = Object.keys(element.entry.fields.pages)[localization] ?? 'en-GB';
        const cmsPages: IDocumentationPage[] = element.entry.fields.pages[localeKey];
        cmsPages.forEach((cmsPage) => {
          const innerLocaleKey = (Object.keys(cmsPage.fields.title)[localization] ?? 'en-GB') as LOCALE_CODE;
          const navbarItem: CMSNavbarItem = {
            title: extractLocale(cmsPage.fields.title, innerLocaleKey),
            isMainPage: extractLocale(cmsPage.fields.isMainPage, innerLocaleKey),
            docUrl: extractLocale(cmsPage.fields.path),
            fullPath: subMenuRoute + extractLocale(cmsPage.fields.path),
          };
          subMenuList.push(navbarItem);
        });
      }
    });
    return subMenuList;
  }

  async getMenu(localization: Locale): Promise<CMSMenu> {
    // Cache menu to avoid slow loading.
    if (this.getMenuCache.has(localization)) {
      return this.getMenuCache.get(localization);
    }
    const locale = localization === Locale['nb-NO'] ? 'nb-NO' : 'en-GB';
    const entryMenu = await this.getEntry('4ufFZKPEou3mf9Tg05WZT3');

    const menu: CMSMenu = {
      title: entryMenu.fields.title['en-GB'],
      pages: [],
    };
    const subMenuEntries = extractLocale(entryMenu.fields.submenus, locale);
    for (const subMenuEntry of subMenuEntries) {
      const subEntry = await this.getEntry<ISubMenu>(subMenuEntry.sys.id);
      const subMenu: CMSSubMenu = {
        title: extractLocale(subMenuEntry.fields.title, locale),
        entry_id: subMenuEntry.sys.id,
        entry: subEntry,
        path: subMenuEntry.fields.path['en-GB'], // url path - No localization on this field
      };
      menu['pages'].push(subMenu);
    }
    this.getMenuCache.set(localization, menu);
    return menu;
  }

  /**
   * Get an entry from Contentful (not locally cached).
   *
   * The entry is given the type any by default, but should be treated as a Contentful type.
   * See packages/web/contentful/types.d.ts for possible interfaces.
   *
   * The get request to Contentful is performed using a Netlify function.
   * @param pageId
   * @returns Object from Netlify.
   */
  async getEntryFromCMS(pageId: string): Promise<any> {
    return this.http
      .get(`https://elvis-designsystem.netlify.app/.netlify/functions/services?id=${pageId}`)
      .toPromise()
      .then((entry: any) => {
        return entry;
      });
  }

  private async syncEntries(): Promise<void> {
    while (this.entriesToSync.length > 0) {
      const id = this.entriesToSync.pop();
      await this.getEntry(id);
    }
  }

  private async findEntriesWithinNode(node: Record<string, any>): Promise<void> {
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

  /**
   * Gets an entry from the locally cached Contentful entries.
   * To update the local Contentful cache, run yarn contentful in packages/web.
   *
   * The entry is given the type any by default, but should be treated as a Contentful type.
   * See packages/web/contentful/types.d.ts for possible interfaces.
   * @param entryId Contentful ID of entry.
   * @returns Object from Contentful.
   *
   * @example
   * const entryMenu = await this.getEntry<IMainMenu>('4ufFZKPEou3mf9Tg05WZT3');
   */
  private async getEntry<T extends IEntry = any>(entryId: string): Promise<T>;
  private async getEntry(entryId: '4ufFZKPEou3mf9Tg05WZT3'): Promise<IMainMenu>;
  private async getEntry(entryId: string): Promise<any> {
    const url = `assets/contentful/dist/entries/${entryId}.json`;
    this.entries[entryId] = await this.http.get(url).toPromise();

    this.findEntriesWithinNode(this.entries[entryId]);
    await this.syncEntries();

    return this.entries[entryId];
  }
}
