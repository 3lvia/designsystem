import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { eGetStarted, eComponents, eIdentity, eCommunity, eTools } from 'src/app/shared/e-items';
import { EItems } from 'src/app/shared/e-items.interface';

@Component({
  selector: 'app-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.scss'],
})
export class SearchMenuComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  version = require('../../../../../style/elvis/package.json').version;
  showResults = false;
  resultOfMoreThanTwo = false;
  searchString = '';
  elvisItems: EItems[] = [];
  activeResults: EItems[] = [];

  indexOfResultDescription = 0;
  indexStartLimit = 0;
  maxTotalCharacters = 0;
  charactersBeforeEllipses = 0;


  private onDestroy = new Subject();

  private onDestroy$ = this.onDestroy.asObservable();

  private subscriptions: Subscription = new Subscription();


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  closeSearch(): void {
    this.onDestroy.next();
  }

  ngOnInit(): void {
    const search = document.getElementById('search-field');
    search.focus();
    this.elvisItems = this.elvisItems.concat(eComponents, eGetStarted, eIdentity, eCommunity, eTools);
  }

  onSearch(): void {
    // Adding all titles that contain searchString to results
    this.activeResults = this.elvisItems.filter((item) =>
      item.title.toLocaleLowerCase().includes(this.searchString.toLocaleLowerCase()),
    );
    // Adding all descriptions that contain searchString to results
    this.activeResults = this.activeResults.concat(this.elvisItems.filter((item) =>
      this.containsSearchString(item),
    ));

    if (this.activeResults.length !== 0 && this.searchString.length !== 0) {
      this.showResults = true;
      setTimeout(() => { this.highlightResultGreen(); });
    } else {
      this.showResults = false;
    }
  }

  containsSearchString(item): boolean {
    return !item.title.toLocaleLowerCase().includes(this.searchString.toLocaleLowerCase()) &&
      item.description.toLocaleLowerCase().includes(this.searchString.toLocaleLowerCase());
  }

  removeSearch(): void {
    this.searchString = '';
    this.activeResults = [];
  }

  encodeHTML(txt: string): string {
    txt = txt.replace(/</g, '&lt;');
    txt = txt.replace(/>/g, '&gt;');
    txt = txt.replace(/&/g, '&amp;');
    txt = txt.replace(/'/g, '&apos;');
    txt = txt.replace(/"/g, '&quot;');
    return txt;
  }

  createHTMLElement(txt: string): any {
    const div = document.createElement('div');
    div.innerHTML = txt;
    return div;
  }

  highlightResultGreen(): void {
    this.activeResults.forEach(resultItem => {
      this.replaceTitleString(resultItem);
      this.replaceDescriptionString(resultItem);
    });
  }

  replaceTitleString(resultItem: EItems): void {
    const indexOfResult = resultItem.title.toLocaleLowerCase().indexOf(this.searchString.toLocaleLowerCase());
    if (indexOfResult < 0) {
      return;
    }
    const newTitleString = resultItem.title.substring(0, indexOfResult) +
      '<span style=\'background: #29d305\'>' + resultItem.title.substring(indexOfResult, indexOfResult + this.searchString.length) +
      '</span>' + resultItem.title.substring(indexOfResult + this.searchString.length);
    const title = document.getElementById('search_' + resultItem.title);
    title.innerHTML = newTitleString;
  }

  replaceDescriptionString(resultItem: EItems): void {
    this.setDescriptionResultStringIndices(resultItem);
    const description = document.getElementById(this.encodeHTML(resultItem.description));
    description.innerHTML = '';
    if (this.indexOfResultDescription < 0) {
      description.appendChild(this.createHTMLElement(resultItem.description.substring(0, this.maxTotalCharacters)));
      return;
    }
    const newDescriptionString = this.constructHighlightedString(resultItem);
    description.appendChild(this.createHTMLElement(newDescriptionString));
  }

  constructHighlightedString(resultItem: EItems): string {
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
    newDescriptionString = newDescriptionString +
      resultItem.description.substring(startOfString, startOfColor) +
      '<span style=\'background: #29d305\'>' + resultItem.description.substring(startOfColor, endOfColor) + '</span>' +
      resultItem.description.substring(endOfColor, endOfString);
    if (resultItem.description.length > endOfString) {
      newDescriptionString = newDescriptionString + '...';
    }

    return newDescriptionString;
  }

  setDescriptionResultStringIndices(resultItem: EItems): void {
    // If string contains link, adding all characters of link and not cutting it off
    const indexOfLinkStart = resultItem.description.toLocaleLowerCase().indexOf('<a');
    const indexOfLinkEnd = resultItem.description.toLocaleLowerCase().indexOf('>', indexOfLinkStart);
    const numberOfLinkCharacter = indexOfLinkEnd - indexOfLinkStart;

    this.indexOfResultDescription = resultItem.description.toLocaleLowerCase().indexOf(this.searchString.toLocaleLowerCase());
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
      this.indexOfResultDescription = resultItem.description.toLocaleLowerCase().indexOf(this.searchString.toLocaleLowerCase(), indexOfLinkEnd);
      if (screen.width < 770) {
        this.charactersBeforeEllipses = 28 + numberOfLinkCharacter + this.searchString.length;
      } else {
        this.charactersBeforeEllipses = 48 + numberOfLinkCharacter + this.searchString.length;
      }
    }
  }

}
