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
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchResult, Searcher } from 'src/app/shared/searcher';

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
  private locale: Locale;
  private searcher: Searcher<SearchItem>;
  searchStatus: SearchStatus = 'loading';
  searchString = '';
  filteredResults: SearchResult<SearchItem>[] = [];
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

    this.filteredResults = this.searcher.search(this.searchString).sort((a, b) => {
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
    });

    if (this.filteredResults.length !== 0 && this.searchString.length !== 0) {
      this.getComponentsWithSynonym();
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event?.code === 'Enter' && this.filteredResults.length) {
      this.router.navigate([this.filteredResults[0].item.absolutePath]);
      this.closeSearch();
    }
  }

  closeSearch(): void {
    this.closeSearchMenu.emit();
  }

  clearSearch(): void {
    this.searchString = '';
    this.filteredResults = [];
    this.filteredResults = [];
    this.synonymComponents = [];
    this.searchInputElement.nativeElement.focus();
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

  /** Filters filteredResults and assigns the resulting array to synonymComponents.
   * The filter condition depends on searchString:
   * - If searchString is < 3, searchString must be an element of searchTerms.
   * - If searchString is >= 3, searchString must be a substring of one searchTerm.
   *
   * Results truncate to 5. Suggest these in "looking for...?"".
   */
  private getComponentsWithSynonym(): void {
    if (this.filteredResults && this.searchString) {
      this.synonymComponents = this.filteredResults
        .filter(({ item }) => {
          const searchTerms = item.searchTerms;
          if (this.searchString.length >= 3) {
            return searchTerms?.some((term) =>
              term.toLowerCase().includes(this.searchString.trim().toLowerCase()),
            );
          } else if (this.searchString.length < 3) {
            return searchTerms?.includes(this.searchString.trim().toLowerCase());
          }
          return false;
        })
        .map((result) => result.item);
      this.synonymComponents = this.synonymComponents.slice(0, 5);
    } else {
      this.synonymComponents = [];
    }
  }
}
