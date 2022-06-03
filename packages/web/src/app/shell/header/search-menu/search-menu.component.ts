import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { docPagesNotFromCMS, componentsDocPages } from 'src/app/shared/doc-pages';
import packageJson from '@elvia/elvis/package.json';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { CMSMenu } from 'src/app/core/services/cms/cms.interface';
import { IDocumentationPage } from 'contentful/types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { SearchItem } from './search-menu.interface';
import { SearchService } from '../../../core/services/search.service';
import Fuse from 'fuse.js';
import { getColor } from '@elvia/elvis-colors';

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
  isPrideMonth = false;

  private onDestroy = new Subject<void>();
  private onDestroy$ = this.onDestroy.asObservable();

  private subscriptions: Subscription = new Subscription();
  private locale: Locale;

  constructor(
    private cmsService: CMSService,
    private localizationService: LocalizationService,
    private searchService: SearchService<SearchItem>,
  ) {
    this.localizationService.listenLocalization().subscribe((locale) => {
      this.locale = locale;
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

    this.initializeSearchItems();
    this.searchService.initializeSearch(this.searchItems, {
      includeScore: true,
      includeMatches: true,
      threshold: 0.4,
      minMatchCharLength: 1,
      keys: [
        { name: 'title', weight: 1 },
        { name: 'description', weight: 0.5 },
      ],
    });
    this.checkIfPrideMonth();
  }

  initializeSearchItems(): void {
    this.searchItems = this.searchItems.concat(
      componentsDocPages.map((docPage) => {
        return {
          title: docPage.title,
          description: docPage.description?.replace(/<.*?>/g, ''),
          type: docPage.type?.substring(0, docPage.type.length - (docPage.type.endsWith('s') ? 1 : 0)),
          absolutePath: docPage.absolutePath,
          fragmentPath: docPage.fragmentPath,
        };
      }),
      docPagesNotFromCMS.map((docPage) => {
        return {
          title: docPage.title,
          description: docPage.description?.replace(/<.*?>/g, ''),
          type: docPage.type?.substring(0, docPage.type.length - (docPage.type.endsWith('s') ? 1 : 0)),
          absolutePath: docPage.absolutePath,
          fragmentPath: docPage.fragmentPath,
        };
      }),
      this.getSearchItemsFromCMS(),
    );
    this.searchItems = this.removeDuplicateSearchItems(this.searchItems);
    this.searchItems = this.removeSearchItemsWithoutPath(this.searchItems);
  }

  getSearchItemsFromCMS(): SearchItem[] {
    const mappedCMSItems: SearchItem[] = [];
    this.mainMenu.pages.forEach((subMenu) => {
      subMenu.entry.fields.pages[Locale[this.locale]].forEach((documentationPage: IDocumentationPage) => {
        let description: string | undefined;
        if (documentationPage.fields.pageDescription) {
          description = documentToHtmlString(documentationPage.fields.pageDescription[Locale[this.locale]]);
          description = description.replace(/<.*?>/g, '');
        }

        if (
          !mappedCMSItems.find((item) => item.title === documentationPage.fields.title[Locale[this.locale]])
        ) {
          mappedCMSItems.push({
            title: documentationPage.fields.title[Locale[this.locale]],
            description: description,
            type: subMenu.title.substring(0, subMenu.title.length - (subMenu.title.endsWith('s') ? 1 : 0)),
            absolutePath: subMenu.path + '/' + documentationPage.fields.path[Locale[this.locale]],
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

  /**
   * Gets called every time the content of the search field is changed.
   */
  onSearch(): void {
    this.activeResults = this.searchService.search(this.searchString);

    if (this.activeResults.length !== 0 && this.searchString.length !== 0) {
      this.showResults = true;
      setTimeout(() => {
        this.highlightResultGreen();
      });
    } else {
      this.showResults = false;
    }
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
      if (matchIndices[1] - matchIndices[0] > 0) {
        newTitleString +=
          this.getHighlightTag('open') +
          title.substring(matchIndices[0], matchIndices[1] + 1) +
          this.getHighlightTag('close');
      } else {
        newTitleString += title.substring(matchIndices[0], matchIndices[1] + 1);
      }

      if (index !== match.indices.length - 1) {
        newTitleString += title.substring(matchIndices[1] + 1, items[index + 1][0]);
      }
    });
    newTitleString += title.substring(match.indices[match.indices.length - 1][1] + 1, title.length);
    const titleElement = document.getElementById('search_' + title);
    titleElement.innerHTML = newTitleString;
  }

  replaceDescriptionString(match: Fuse.FuseResultMatch, description: string): void {
    // match.indices holds two values: the start and end indices of the match.
    if (!description) {
      return;
    }
    // Add any part of the description that is before the first match
    let newDescriptionString = description.substring(0, match.indices[0][0]);
    // Add each match, and the part of the description between matches
    match.indices.forEach((matchIndices, index, items) => {
      // Only highlight if more than one character
      if (matchIndices[1] - matchIndices[0] > 0) {
        newDescriptionString +=
          this.getHighlightTag('open') +
          description.substring(matchIndices[0], matchIndices[1] + 1) +
          this.getHighlightTag('close');
      } else {
        newDescriptionString += description.substring(matchIndices[0], matchIndices[1] + 1);
      }

      // If not the last match, add the part of the description upto next match
      if (index !== match.indices.length - 1) {
        newDescriptionString += description.substring(matchIndices[1] + 1, items[index + 1][0]);
      }
    });
    // Add the part after the last match
    newDescriptionString += description.substring(
      match.indices[match.indices.length - 1][1] + 1,
      description.length,
    );

    // Limit the length of the shown description
    if (description.length > 165) {
      const descriptionPadding = 30;
      const startIndex = Math.max(match.indices[0][0] - descriptionPadding, 0);
      const endIndex = Math.max(
        match.indices[match.indices.length - 1][1] +
          match.indices.length *
            (this.getHighlightTag('open').length + this.getHighlightTag('close').length) +
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

  /**
   * Used to create IDs for the description HTML elements.
   */
  encodeHTML(txt: string): string {
    return txt
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/&/g, '&amp;')
      .replace(/'/g, '&apos;')
      .replace(/"/g, '&quot;')
      .replace(/\s/g, '-');
  }

  private getHighlightTag(pos: 'open' | 'close') {
    if (pos === 'open') {
      return `<span style='background: ${getColor('elvia-charge')}'>`;
    } else {
      return '</span>';
    }
  }

  private checkIfPrideMonth(): void {
    const currentMonth = new Date().getMonth();
    if (currentMonth === 5) {
      this.isPrideMonth = true;
    }
  }
}
