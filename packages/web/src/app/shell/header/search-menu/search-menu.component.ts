import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';
import { DocPageType } from '../../../shared/shared.enum';

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
  searchPrefix = '';
  prefixedSearchString = '';
  isPrideMonth = false;

  private onDestroy = new Subject<void>();
  private onDestroy$ = this.onDestroy.asObservable();

  private subscriptions: Subscription = new Subscription();
  private locale: Locale;

  constructor(
    private cmsService: CMSService,
    private localizationService: LocalizationService,
    private searchService: SearchService<SearchItem>,
    private router: Router,
  ) {
    this.localizationService.listenLocalization().subscribe((locale) => {
      this.locale = locale;
      this.cmsService.getMenu(locale).then((data) => {
        this.mainMenu = data;
      });
    });
  }

  @HostListener('document:keydown.enter')
  navigateToFirstSearchResultOnEnter(): void {
    if (this.activeResults.length === 0) {
      return;
    }
    // If any link is focused, navigate to it instead of first search result
    if (document.activeElement instanceof HTMLAnchorElement) {
      const newHref = document.activeElement.href.split(window.location.origin)[1];
      this.router.navigate([newHref]);
      this.closeSearch();
      return;
    }
    // If the clear search-button is focused, click it instead of the first search result
    if (document.activeElement === document.getElementById('search-clear-button')) {
      document.getElementById('search-clear-button').click();
      return;
    }
    this.router.navigate([this.activeResults[0].absolutePath]);
    this.closeSearch();
  }

  @HostListener('document:keydown.escape')
  closeSearchMenuOnEsc(): void {
    this.closeSearch();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    const search = document.getElementById('search-field');
    search.focus();

    this.initializeSearchItems()
      .then(() => {
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
      })
      // Call search once after initialized in case someone started typing before the search was initialized.
      .then(() => this.onSearch());
    this.checkIfPrideMonth();
  }

  /**
   * Gets called every time the content of the search field is changed. If the search is not yet initialized, return without performing any search.
   */
  onSearch(): void {
    if (!this.searchService.isInitialized) {
      return;
    }

    if (this.checkIfSearchIsPrefixed()) {
      this.activeResults = this.searchService
        .search(this.prefixedSearchString)
        .filter((result) => result.type?.toLocaleLowerCase() === this.searchPrefix.toLocaleLowerCase());
    } else {
      this.activeResults = this.searchService.search(this.searchString);
    }

    if (this.activeResults.length !== 0 && this.searchString.length !== 0) {
      this.showResults = true;
      setTimeout(() => {
        this.highlightSearchMatches();
      });
    } else {
      this.showResults = false;
    }
  }

  closeSearch(): void {
    this.onDestroy.next();
  }

  clearSearch(): void {
    this.searchString = '';
    this.activeResults = [];
    const search = document.getElementById('search-field');
    search.focus();
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

  private async initializeSearchItems(): Promise<void> {
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
      await this.getSearchItemsFromCMS(),
    );
    this.searchItems = this.removeDuplicateSearchItems(this.searchItems);
    this.searchItems = this.removeSearchItemsWithoutPath(this.searchItems);
  }

  private async getSearchItemsFromCMS(): Promise<SearchItem[]> {
    await this.cmsService.getMenu(this.locale).then((data) => {
      this.mainMenu = data;
    });

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

  private removeDuplicateSearchItems(items: SearchItem[]): SearchItem[] {
    const seen = {};
    return items.filter((item) => {
      const title = item.title.replace(' ', '').toLocaleLowerCase();
      return seen[title] ? false : (seen[title] = true);
    });
  }

  private removeSearchItemsWithoutPath(items: SearchItem[]): SearchItem[] {
    return items.filter((item) => item.absolutePath);
  }

  private highlightSearchMatches(): void {
    this.searchService.searchResults.forEach((resultItem) => {
      resultItem.matches.forEach((match) => {
        if (match.key === 'title') {
          const titleElement = document.getElementById('search_' + resultItem.item.title);
          const innerHTML = this.getHighlightedTitleString(match, resultItem.item.title);
          this.setHTML(titleElement, innerHTML);
        } else if (match.key === 'description') {
          const descriptionElement = document.getElementById(this.encodeHTML(resultItem.item.description));
          const innerHTML = this.getHighlightedDescriptionString(match, resultItem.item.description);
          this.setHTML(descriptionElement, innerHTML);
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
        this.setHTML(descriptionElement, description);
      }
    });
  }

  private setHTML(element: HTMLElement, innerHTML: string) {
    if (element) element.innerHTML = innerHTML;
  }

  private getHighlightedTitleString(match: Fuse.FuseResultMatch, title: string): string {
    let newTitleString = title.substring(0, match.indices[0][0]);
    // match.indices holds two values: the start and end indices of the match.
    match.indices.forEach((matchIndices, index, items) => {
      newTitleString += this.addHighlightBackground(title.substring(matchIndices[0], matchIndices[1] + 1));

      if (index !== match.indices.length - 1) {
        newTitleString += title.substring(matchIndices[1] + 1, items[index + 1][0]);
      }
    });
    newTitleString += title.substring(match.indices[match.indices.length - 1][1] + 1, title.length);
    return newTitleString;
  }

  private getHighlightedDescriptionString(match: Fuse.FuseResultMatch, description: string): string {
    if (!description) {
      return;
    }
    // Add any part of the description that is before the first match
    let newDescriptionString = description.substring(0, match.indices[0][0]);
    // Add each match, and the part of the description between matches
    // match.indices holds two values: the start and end indices of the match.
    match.indices.forEach((matchIndices, index, items) => {
      // Only highlight in description if more than one character
      if (matchIndices[1] - matchIndices[0] > 0) {
        newDescriptionString += this.addHighlightBackground(
          description.substring(matchIndices[0], matchIndices[1] + 1),
        );
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
          match.indices.length * this.addHighlightBackground('').length +
          descriptionPadding,
        startIndex + 165,
      );
      const prefix = startIndex > 0 ? '...' : '';
      const postfix = endIndex < newDescriptionString.length - 1 ? '...' : '';
      newDescriptionString = prefix + newDescriptionString.substring(startIndex, endIndex) + postfix;
    }
    return newDescriptionString;
  }

  private addHighlightBackground(str: string) {
    return `<span style='background: ${getColor('elvia-charge')}'>${str}</span>`;
  }

  private checkIfSearchIsPrefixed(): boolean {
    if (this.searchString.includes(':')) {
      this.searchPrefix = this.searchString.split(':')[0].toLocaleLowerCase();
      this.prefixedSearchString = this.searchString.split(':')[1];

      const types = Object.values<string>(DocPageType).map((type) => type.toLocaleLowerCase());

      return types.includes(this.searchPrefix);
    }
    return false;
  }

  private checkIfPrideMonth(): void {
    const currentMonth = new Date().getMonth();
    if (currentMonth === 5) {
      this.isPrideMonth = true;
    }
  }
}
