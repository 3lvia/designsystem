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
import { compareTwoStrings } from 'string-similarity';

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
  elvisItems: SearchItem[] = [];
  activeResults: SearchItem[] = [];

  indexOfResultDescription = 0;
  indexStartLimit = 0;
  maxTotalCharacters = 0;
  charactersBeforeEllipses = 0;

  private onDestroy = new Subject<void>();

  private onDestroy$ = this.onDestroy.asObservable();

  private subscriptions: Subscription = new Subscription();

  constructor(private cmsService: CMSService, private localizationService: LocalizationService) {
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
        this.elvisItems = this.elvisItems.concat(
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
        this.elvisItems = this.removeDuplicateSearchOptions(this.elvisItems);
        this.elvisItems = this.removeSearchOptionsWithoutPath(this.elvisItems);
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
        }

        if (!this.elvisItems.find((item) => item.title === documentationPage.fields.title['en-GB'])) {
          mappedCMSItems.push({
            title: documentationPage.fields.title['en-GB'],
            description: description,
            type: subMenu.title.toLowerCase(),
            absolutePath: subMenu.path + '/' + documentationPage.fields.path['en-GB'],
          });
        }
      });
    });
    return mappedCMSItems;
  }

  removeDuplicateSearchOptions(items: SearchItem[]): SearchItem[] {
    const seen = {};
    return items
      .filter((item) => {
        const title = item.title.replace(' ', '').toLocaleLowerCase();
        return seen[title] ? false : (seen[title] = true);
      })
      .filter((item) => item.absolutePath != undefined);
  }

  removeSearchOptionsWithoutPath(items: SearchItem[]): SearchItem[] {
    return items.filter((item) => item.absolutePath);
  }

  onSearch(): void {
    // Adding all titles that contain searchString to results
    this.activeResults = this.elvisItems.filter((item) =>
      item.title.toLocaleLowerCase().includes(this.searchString.toLocaleLowerCase()),
    );
    // Adding all descriptions that contain searchString to results
    this.activeResults = this.activeResults.concat(
      this.elvisItems.filter((item) => this.containsSearchString(item)),
    );

    // Rank what results have a title closest to the searched phrase
    this.activeResults = this.activeResults
      .map((item) => {
        return { ...item, similarity: compareTwoStrings(this.searchString, item.title) };
      })
      .sort((a, b) => {
        return b.similarity - a.similarity;
      });

    if (this.activeResults.length !== 0 && this.searchString.length !== 0) {
      this.showResults = true;
      setTimeout(() => {
        this.highlightResultGreen();
      });
    } else {
      this.showResults = false;
    }
  }

  containsSearchString(item: SearchItem): boolean {
    if (!item.description) {
      return;
    }
    return (
      !item.title.toLocaleLowerCase().includes(this.searchString.toLocaleLowerCase()) &&
      item.description.toLocaleLowerCase().includes(this.searchString.toLocaleLowerCase())
    );
  }

  removeSearch(): void {
    this.searchString = '';
    this.activeResults = [];
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
    this.activeResults.forEach((resultItem) => {
      this.replaceTitleString(resultItem);
      this.replaceDescriptionString(resultItem);
    });
  }

  replaceTitleString(resultItem: SearchItem): void {
    const indexOfResult = resultItem.title.toLocaleLowerCase().indexOf(this.searchString.toLocaleLowerCase());
    if (indexOfResult < 0) {
      return;
    }
    const newTitleString =
      resultItem.title.substring(0, indexOfResult) +
      "<span style='background: #29d305'>" +
      resultItem.title.substring(indexOfResult, indexOfResult + this.searchString.length) +
      '</span>' +
      resultItem.title.substring(indexOfResult + this.searchString.length);
    const title = document.getElementById('search_' + resultItem.title);
    title.innerHTML = newTitleString;
  }

  replaceDescriptionString(resultItem: SearchItem): void {
    if (!resultItem.description) {
      return;
    }
    this.setDescriptionResultStringIndices(resultItem);
    const description = document.getElementById(this.encodeHTML(resultItem.description));
    description.innerHTML = '';
    if (this.indexOfResultDescription < 0) {
      description.appendChild(
        this.createHTMLElement(resultItem.description.substring(0, this.maxTotalCharacters)),
      );
      return;
    }
    const newDescriptionString = this.constructHighlightedString(resultItem);
    description.appendChild(this.createHTMLElement(newDescriptionString));
  }

  constructHighlightedString(resultItem: SearchItem): string {
    let newDescriptionString = '';
    let startOfString = 0;
    let endOfString = this.maxTotalCharacters;
    const startOfColor = this.indexOfResultDescription;
    const endOfColor = this.indexOfResultDescription + this.searchString.length;

    if (this.indexOfResultDescription >= 0 && this.indexOfResultDescription > this.indexStartLimit) {
      newDescriptionString = '...';
      startOfString = this.indexOfResultDescription - this.charactersBeforeEllipses;
      endOfString = this.indexOfResultDescription + this.maxTotalCharacters - this.charactersBeforeEllipses;
    }
    newDescriptionString =
      newDescriptionString +
      resultItem.description.substring(startOfString, startOfColor) +
      "<span style='background: #29d305'>" +
      resultItem.description.substring(startOfColor, endOfColor) +
      '</span>' +
      resultItem.description.substring(endOfColor, endOfString);
    if (resultItem.description.length > endOfString) {
      newDescriptionString = newDescriptionString + '...';
    }

    return newDescriptionString;
  }

  setDescriptionResultStringIndices(resultItem: SearchItem): void {
    // If string contains link, adding all characters of link and not cutting it off
    const indexOfLinkStart = resultItem.description.toLocaleLowerCase().indexOf('<a');
    const indexOfLinkEnd = resultItem.description.toLocaleLowerCase().indexOf('>', indexOfLinkStart);
    const numberOfLinkCharacter = indexOfLinkEnd - indexOfLinkStart;

    this.indexOfResultDescription = resultItem.description
      .toLocaleLowerCase()
      .indexOf(this.searchString.toLocaleLowerCase());
    this.indexStartLimit = 50;
    this.maxTotalCharacters = 165 + numberOfLinkCharacter;
    this.charactersBeforeEllipses = 48 + numberOfLinkCharacter;
    if (screen.width < 770) {
      this.indexStartLimit = 30;
      this.maxTotalCharacters = 80 + numberOfLinkCharacter;
      this.charactersBeforeEllipses = 28 + numberOfLinkCharacter;
    } else if (screen.width < 1022) {
      this.maxTotalCharacters = 170 + numberOfLinkCharacter;
    }

    // If the search result is in the link skip marking inside the link
    if (this.indexOfResultDescription > indexOfLinkStart && this.indexOfResultDescription < indexOfLinkEnd) {
      // tslint:disable-next-line: max-line-length
      this.indexOfResultDescription = resultItem.description
        .toLocaleLowerCase()
        .indexOf(this.searchString.toLocaleLowerCase(), indexOfLinkEnd);
      if (screen.width < 770) {
        this.charactersBeforeEllipses = 28 + numberOfLinkCharacter + this.searchString.length;
      } else {
        this.charactersBeforeEllipses = 48 + numberOfLinkCharacter + this.searchString.length;
      }
    }
  }
}
