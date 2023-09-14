import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { docPagesNotFromCMS, componentsDocPages } from 'src/app/shared/doc-pages';
import { utilityGroups } from 'src/app/doc-pages/tools/utilities-doc/utility-groups-data';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { CMSMenu } from 'src/app/core/services/cms/cms.interface';
import { LOCALE_CODE } from 'contentful/types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { SearchStatus, SearchItem } from './search-menu.interface';
import Fuse from 'fuse.js';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Searcher } from 'src/app/shared/searcher';

@Component({
  selector: 'app-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.scss'],
})
export class SearchMenuComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInputElement: ElementRef<HTMLInputElement>;
  @Output() closeSearchMenu = new EventEmitter<void>();
  private mainMenu: CMSMenu;
  private searchItems: SearchItem[] = [];
  private activeResults: SearchItem[] = [];
  private locale: Locale;
  private searcher: Searcher<SearchItem>;
  searchStatus: SearchStatus = 'loading';
  searchString = '';
  resultsToDisplay: SearchItem[] = [];
  synonymComponents: SearchItem[] = [];

  constructor(
    private cmsService: CMSService,
    private localizationService: LocalizationService,
    private router: Router,
  ) {
    this.localizationService
      .listenLocalization()
      .pipe(takeUntilDestroyed())
      .subscribe((locale) => {
        this.locale = locale;
        this.cmsService.getMenu(locale).then((data) => {
          this.mainMenu = data;
        });
      });
  }

  @HostListener('document:keydown.escape')
  closeSearchMenuOnEsc(): void {
    this.closeSearch();
  }

  ngOnInit(): void {
    this.initializeSearchItems()
      .then(() => {
        this.searcher = new Searcher(this.searchItems, {
          includeScore: true,
          includeMatches: true,
          threshold: 0.35,
          minMatchCharLength: 1,
          keys: [
            { name: 'title', weight: 1 },
            { name: 'description', weight: 0.5 },
            { name: 'searchTerms', weight: 0.066 },
          ],
        });
        this.searchStatus = 'ready';
      })
      // Call search once after initialized in case someone started typing before the search was initialized.
      .then(() => this.onSearch());
  }

  ngAfterViewInit(): void {
    this.searchInputElement.nativeElement.focus();
  }

  /**
   * Gets called every time the content of the search field is changed. If the search is not yet initialized, return without performing any search.
   */
  onSearch(): void {
    if (!this.searcher?.isInitialized) {
      return;
    }

    this.activeResults = this.searcher.search(this.searchString);
    this.resultsToDisplay = this.searcher.searchResults
      .filter((result) => !result.matches?.every((match) => match.key === 'searchTerms'))
      .sort((a, b) => {
        const resultTypeA = a.item.type === 'utility class';
        const resultTypeB = b.item.type === 'utility class';

        // Move results with type "utility class" to the end, maintain original order for other results
        if (resultTypeA && !resultTypeB) {
          return 1;
        } else if (!resultTypeA && resultTypeB) {
          return -1;
        } else {
          return 0;
        }
      })
      .map((result) => result.item);

    if (this.activeResults.length !== 0 && this.searchString.length !== 0) {
      this.getComponentsWithSynonym();
      setTimeout(() => {
        this.highlightSearchMatches();
      });
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event?.code === 'Enter' && this.activeResults.length) {
      this.router.navigate([this.activeResults[0].absolutePath]);
      this.closeSearch();
      return;
    }
  }

  closeSearch(): void {
    this.closeSearchMenu.emit();
  }

  clearSearch(): void {
    this.searchString = '';
    this.activeResults = [];
    this.resultsToDisplay = [];
    this.synonymComponents = [];
    this.searchInputElement.nativeElement.focus();
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
          searchTerms: docPage.searchTerms,
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
      utilityGroups.flatMap((utilityGroup) => {
        const utilityGroupTitle = utilityGroup.title;
        return utilityGroup.classes.map((utilityClass) => {
          return {
            title: utilityClass.className,
            description: `${utilityGroupTitle}: ${utilityClass.description}`,
            absolutePath: '/tools/utility-classes',
            fragmentPath: utilityGroupTitle,
            type: 'utility class',
          };
        });
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
      subMenu.entry.fields.pages?.[Locale[this.locale] as LOCALE_CODE]?.forEach((documentationPage) => {
        let description: string | undefined;
        if (documentationPage.fields.pageDescription) {
          description = documentToHtmlString(
            documentationPage.fields.pageDescription[Locale[this.locale] as LOCALE_CODE]!,
          );
          description = description.replace(/<.*?>/g, '');
        }

        if (
          !mappedCMSItems.find(
            (item) => item.title === documentationPage.fields.title[Locale[this.locale] as LOCALE_CODE],
          )
        ) {
          mappedCMSItems.push({
            title: documentationPage.fields.title[Locale[this.locale] as LOCALE_CODE]!,
            description: description,
            type: subMenu.title.substring(0, subMenu.title.length - (subMenu.title.endsWith('s') ? 1 : 0)),
            absolutePath:
              subMenu.path + '/' + documentationPage.fields.path[Locale[this.locale] as LOCALE_CODE],
          });
        }
      });
    });
    return mappedCMSItems;
  }

  private removeDuplicateSearchItems(items: SearchItem[]): SearchItem[] {
    const seen: Record<string, boolean> = {};
    return items.filter((item) => {
      const title = item.title.replace(' ', '').toLocaleLowerCase();
      return seen[title] ? false : (seen[title] = true);
    });
  }

  private removeSearchItemsWithoutPath(items: SearchItem[]): SearchItem[] {
    return items.filter((item) => item.absolutePath);
  }

  private highlightSearchMatches(): void {
    this.searcher.searchResults.forEach((resultItem) => {
      resultItem.matches?.forEach((match) => {
        if (match.key === 'title') {
          const titleElement = document.getElementById('search_' + resultItem.item.title);
          if (titleElement) {
            this.setInnerHTML(titleElement, this.getHighlightedTitleString(match, resultItem.item.title));
          }
        } else if (match.key === 'description') {
          const descriptionElement = document.getElementById(
            this.encodeHTML(resultItem.item.description ?? ''),
          );
          if (descriptionElement && resultItem.item.description) {
            this.setInnerHTML(
              descriptionElement,
              this.getHighlightedDescriptionString(match, resultItem.item.description),
            );
          }
        }
      });
      // If there are no matches for 'description', just insert the description without any highlighting
      if (!resultItem.matches?.find((item) => item.key === 'description')) {
        if (!resultItem.item.description) {
          return;
        }
        const descriptionElement = document.getElementById(this.encodeHTML(resultItem.item.description));
        if (!descriptionElement) {
          return;
        }
        let description = resultItem.item.description;
        if (description.length > 165) {
          description = description.substring(0, 165) + '...';
        }
        this.setInnerHTML(descriptionElement, description);
      }
    });
  }

  private setInnerHTML(element: HTMLElement, innerHTML: string) {
    if (element) element.innerHTML = innerHTML;
  }

  private getHighlightedTitleString(match: Fuse.FuseResultMatch, title: string) {
    let newTitleString = title.substring(0, match.indices[0][0]);
    // match.indices holds two values: the start and end indices of the match.
    match.indices.forEach((matchIndices, index, items) => {
      newTitleString += this.searcher.addHighlightBackground(
        title.substring(matchIndices[0], matchIndices[1] + 1),
      );

      if (index !== match.indices.length - 1) {
        newTitleString += title.substring(matchIndices[1] + 1, items[index + 1][0]);
      }
    });
    newTitleString += title.substring(match.indices[match.indices.length - 1][1] + 1, title.length);
    return newTitleString;
  }

  private getHighlightedDescriptionString(match: Fuse.FuseResultMatch, description: string) {
    // Add any part of the description that is before the first match
    let newDescriptionString = description.substring(0, match.indices[0][0]);
    // Add each match, and the part of the description between matches
    // match.indices holds two values: the start and end indices of the match.
    match.indices.forEach((matchIndices, index, items) => {
      // Only highlight in description if more than one character
      if (matchIndices[1] - matchIndices[0] > 0) {
        newDescriptionString += this.searcher.addHighlightBackground(
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
          match.indices.length * this.searcher.addHighlightBackground('').length +
          descriptionPadding,
        startIndex + 165,
      );
      const prefix = startIndex > 0 ? '...' : '';
      const postfix = endIndex < newDescriptionString.length - 1 ? '...' : '';
      newDescriptionString = prefix + newDescriptionString.substring(startIndex, endIndex) + postfix;
    }
    return newDescriptionString;
  }

  /** Filters activeResults and assigns the resulting array to synonymComponents.
   * The filter condition depends on searchString:
   * - If searchString is < 3, searchString must be an element of searchTerms.
   * - If searchString is >= 3, searchString must be a substring of one searchTerm.
   *
   * Results truncate to 5. Suggest these in "looking for...?"".
   */
  private getComponentsWithSynonym(): void {
    if (this.activeResults && this.searchString) {
      this.synonymComponents = this.activeResults.filter(({ searchTerms }) => {
        if (this.searchString.length >= 3) {
          return searchTerms?.some((term) =>
            term.toLowerCase().includes(this.searchString.trim().toLowerCase()),
          );
        } else if (this.searchString.length < 3) {
          return searchTerms?.includes(this.searchString.trim().toLowerCase());
        }
        return false;
      });
      this.synonymComponents = this.synonymComponents.slice(0, 5);
    } else {
      this.synonymComponents = [];
    }
  }
}
