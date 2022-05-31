import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { docPagesNotFromCMS, componentsDocPages } from 'src/app/shared/doc-pages';
import packageJson from '@elvia/elvis/package.json';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { CMSMenu } from 'src/app/core/services/cms/cms.interface';
import { IDocumentationPage } from 'contentful/types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { SearchItem } from './search-menu.interface';
import { SearchService } from './search.service';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.scss'],
})
export class SearchMenuComponent implements OnInit, OnDestroy {
  mainMenu: CMSMenu;
  version = packageJson.version;
  showResults = false;
  resultOfMoreThanTwo = false;
  searchString = '';
  searchItems: SearchItem[] = [];
  activeResults: SearchItem[] = [];

  private onDestroy = new Subject<void>();

  private onDestroy$ = this.onDestroy.asObservable();

  private subscriptions: Subscription = new Subscription();

  constructor(
    private cmsService: CMSService,
    private localizationService: LocalizationService,
    private searchService: SearchService,
  ) {
    this.localizationService.listenLocalization().subscribe((locale) => {
      this.cmsService.getMenu(locale).then((data) => {
        this.mainMenu = data;
      });
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  closeSearch(): void {
    this.onDestroy.next();
  }

  ngOnInit(): void {
    const search = document.getElementById('search-field');
    search.focus();

    this.getSearchOptionsFromCMS()
      .then((cmsItems) => {
        this.searchItems = this.searchItems.concat(
          componentsDocPages.map((docPage) => {
            return {
              title: docPage.title,
              description: docPage.description,
              type: docPage.type,
              absolutePath: docPage.absolutePath,
              fragmentPath: docPage.fragmentPath,
            };
          }),
          docPagesNotFromCMS.map((docPage) => {
            return {
              title: docPage.title,
              description: docPage.description,
              type: docPage.type,
              absolutePath: docPage.absolutePath,
              fragmentPath: docPage.fragmentPath,
            };
          }),
          cmsItems,
        );
      })
      .then(() => {
        this.searchItems = this.removeDuplicateSearchItems(this.searchItems);
        this.searchItems = this.removeSearchItemsWithoutPath(this.searchItems);
      })
      .then(() => {
        this.searchService.initializeSearch(this.searchItems);
      });
  }

  async getSearchOptionsFromCMS(): Promise<SearchItem[]> {
    const items = await this.cmsService.getMenu(0);
    const mappedCMSItems: SearchItem[] = [];
    items.pages.forEach((subMenu) => {
      subMenu.entry.fields.pages['en-GB'].forEach((documentationPage: IDocumentationPage) => {
        let description: string | undefined;
        if (documentationPage.fields.pageDescription) {
          description = documentToHtmlString(documentationPage.fields.pageDescription['en-GB']);
          description = description.replace(/<.*?>/g, '');
        }

        if (!this.searchItems.find((item) => item.title === documentationPage.fields.title['en-GB'])) {
          mappedCMSItems.push({
            title: documentationPage.fields.title['en-GB'],
            description: description,
            type: subMenu.title,
            absolutePath: subMenu.path + '/' + documentationPage.fields.path['en-GB'],
          });
        }
      });
    });
    return mappedCMSItems;
  }

  removeDuplicateSearchItems(items: SearchItem[]): SearchItem[] {
    const seen = {};
    return items.filter((item) => {
      const title = item.title.replace(' ', '').toLocaleLowerCase();
      return seen[title] ? false : (seen[title] = true);
    });
  }

  removeSearchItemsWithoutPath(items: SearchItem[]): SearchItem[] {
    return items.filter((item) => item.absolutePath);
  }

  onSearch(): void {
    this.searchService.search(this.searchString);
    this.activeResults = this.searchService.getSearchItems();

    if (this.activeResults.length !== 0 && this.searchString.length !== 0) {
      this.showResults = true;
      setTimeout(() => {
        this.highlightResultGreen();
      });
    } else {
      this.showResults = false;
    }
  }

  encodeHTML(txt: string): string {
    return txt
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/&/g, '&amp;')
      .replace(/'/g, '&apos;')
      .replace(/"/g, '&quot;');
  }

  createHTMLElement(txt: string): HTMLDivElement {
    const div = document.createElement('div');
    div.innerHTML = txt;
    return div;
  }

  highlightResultGreen(): void {
    this.searchService.searchResults.forEach((resultItem) => {
      resultItem.matches.forEach((match) => {
        if (match.key === 'title') {
          this.replaceTitleString(match, resultItem.item.title);
        } else if (match.key === 'description') {
          this.replaceDescriptionString(match, resultItem.item.description);
        }
      });
      // If there are no matches for 'description', just insert the description without any highlighting
      if (!resultItem.matches.find((item) => item.key === 'description')) {
        if (!resultItem.item.description) {
          return;
        }
        const descriptionElement = document.getElementById(this.encodeHTML(resultItem.item.description));
        let description = resultItem.item.description;
        if (description.length > 165) {
          description = description.substring(0, 165) + '...';
        }
        descriptionElement.innerHTML = description;
      }
    });
  }

  replaceTitleString(match: Fuse.FuseResultMatch, title: string): void {
    let newTitleString = title.substring(0, match.indices[0][0]);
    match.indices.forEach((matchIndices, index, items) => {
      newTitleString +=
        "<span style='background: #29d305'>" +
        title.substring(matchIndices[0], matchIndices[1] + 1) +
        '</span>';

      if (index !== match.indices.length - 1) {
        newTitleString += title.substring(matchIndices[1] + 1, items[index + 1][0]);
      }
    });
    newTitleString += title.substring(match.indices[match.indices.length - 1][1] + 1, title.length);
    const titleElement = document.getElementById('search_' + title);
    titleElement.innerHTML = newTitleString;
  }

  replaceDescriptionString(match: Fuse.FuseResultMatch, description: string): void {
    if (!description) {
      return;
    }
    // Add any part of the description that is before the first match
    let newDescriptionString = description.substring(0, match.indices[0][0]);
    // Add each match, and the part of the description between matches
    match.indices.forEach((matchIndices, index, items) => {
      newDescriptionString +=
        "<span style='background: #29d305'>" +
        description.substring(matchIndices[0], matchIndices[1] + 1) +
        '</span>';

      if (index !== match.indices.length - 1) {
        newDescriptionString += description.substring(matchIndices[1] + 1, items[index + 1][0]);
      }
    });
    // Add the part after the last match
    newDescriptionString += description.substring(
      match.indices[match.indices.length - 1][1] + 1,
      description.length,
    );

    if (description.length > 165) {
      const descriptionPadding = 30;
      const startIndex = Math.max(match.indices[0][0] - descriptionPadding, 0);
      const endIndex = Math.max(
        match.indices[match.indices.length - 1][1] +
          match.indices.length * ("<span style='background: #29d305'>".length + '</span>'.length) +
          descriptionPadding,
        startIndex + 165,
      );
      const prefix = startIndex > 0 ? '...' : '';
      const postfix = endIndex < newDescriptionString.length - 1 ? '...' : '';
      newDescriptionString = prefix + newDescriptionString.substring(startIndex, endIndex) + postfix;
    }

    const descriptionElement = document.getElementById(this.encodeHTML(description));
    descriptionElement.innerHTML = newDescriptionString;
  }

  removeSearch(): void {
    this.searchString = '';
    this.activeResults = [];
  }
}
