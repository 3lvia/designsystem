import { Component, Input, OnInit } from '@angular/core';
import { getColor } from '@elvia/elvis-colors';
import Fuse from 'fuse.js';
import { SearchService } from 'src/app/core/services/search.service';
import ComponentData, { AttributeType } from 'src/app/doc-pages/components/component-data.interface';

interface ComponentProp extends AttributeType {
  attribute: string;
}

@Component({
  selector: 'app-component-properties-table',
  templateUrl: './component-properties-table.component.html',
  styleUrls: ['./component-properties-table.component.scss'],
  providers: [SearchService],
})
export class ComponentPropertiesTableComponent implements OnInit {
  @Input() componentData: ComponentData;
  componentProps: ComponentProp[] = [];
  filteredComponentProps: ComponentProp[] = [];
  searchTerm = '';

  constructor(private searchService: SearchService<ComponentProp>) {}

  ngOnInit(): void {
    this.createPropArray();
    this.initializeSearchService();
    this.searchProps();
    setTimeout(() => {
      this.highlightSearchMatches();
    });
  }

  createPropArray(): void {
    Object.keys(this.componentData.attributes).forEach((attribute) => {
      const componentProp: ComponentProp = {
        attribute,
        ...this.componentData.attributes[attribute],
      };
      this.componentProps.push(componentProp);
    });
  }

  searchProps(): void {
    if (!this.searchService.isInitialized) {
      return;
    }
    if (this.searchTerm !== '') {
      this.filteredComponentProps = this.searchService.search(this.searchTerm);
    } else {
      this.searchService.search(this.searchTerm);
      this.filteredComponentProps = this.componentProps;
    }
    setTimeout(() => {
      this.highlightSearchMatches();
    });
  }

  clearSearchField(): void {
    this.searchTerm = '';
    this.searchProps();
  }

  private highlightSearchMatches(): void {
    this.resetHighlightedHTML();
    this.searchService.searchResults.forEach((resultItem) => {
      resultItem.matches?.forEach((match) => {
        try {
          const element = document.getElementById(`property-row-${resultItem.item.attribute}-${match.key}`);
          if (element && match.key && match.key in resultItem.item) {
            element.innerHTML = this.getHighlightedHTMLString(
              match,
              resultItem.item[match.key as keyof ComponentProp] as string,
            );
          }
        } catch (error) {
          console.log('id:', `property-row-${resultItem.item.attribute}-${match.key}`, error);
        }
        try {
          const element = document.getElementById(
            `property-row-${resultItem.item.attribute}-${match.key}-mobile`,
          );
          if (element && match.key && match.key in resultItem.item) {
            element.innerHTML = this.getHighlightedHTMLString(
              match,
              resultItem.item[match.key as keyof ComponentProp] as string,
            );
          }
        } catch (error) {
          console.log('id:', `property-row-${resultItem.item.attribute}-${match.key}-mobile`, error);
        }
      });
    });
  }

  private getHighlightedHTMLString(match: Fuse.FuseResultMatch, value: string): string {
    const usedIndices: Fuse.RangeTuple[] = [];
    // Add any part of the description that is before the first match
    let highlightedValue = value.substring(0, match.indices[0][0]);
    // Add each match, and the part of the description between matches
    match.indices
      // Filter out any duplicate matches (happens if you search the exact name of a long prop)
      .filter((matchIndices) => {
        if (usedIndices.find((used) => used[0] === matchIndices[0] && used[1] === matchIndices[1])) {
          return false;
        }
        usedIndices.push(matchIndices);
        return true;
      })
      .forEach((matchIndices, index, items) => {
        const [matchStart, matchEnd] = matchIndices;
        // Only highlight in description if more than one character
        if (matchEnd - matchStart > 0) {
          highlightedValue += this.addHighlightBackground(
            this.encodeHTML(value.substring(matchStart, matchEnd + 1)),
          );
        } else {
          highlightedValue += this.encodeHTML(value.substring(matchStart, matchEnd + 1));
        }

        // If not the last match, add the part of the description upto next match
        if (index !== items.length - 1) {
          highlightedValue += this.encodeHTML(value.substring(matchEnd + 1, items[index + 1][0]));
        }
      });
    // Add the part after the last match
    highlightedValue += this.encodeHTML(
      value.substring(match.indices[match.indices.length - 1][1] + 1, value.length),
    );
    return highlightedValue;
  }

  private addHighlightBackground(str: string): string {
    return `<span style='background: ${getColor('elvia-charge')}'>${str}</span>`;
  }

  private resetHighlightedHTML(): void {
    this.filteredComponentProps.forEach((prop) => {
      (['attribute', 'type', 'description', 'default'] as const).forEach((key) => {
        const element = document.getElementById(`property-row-${prop.attribute}-${key}`);
        const elementMobile = document.getElementById(`property-row-${prop.attribute}-${key}-mobile`);
        if (key === 'default') {
          if (element) element.innerHTML = prop[key] ? this.encodeHTML(prop[key]!.toString()) : '-';
          if (elementMobile)
            elementMobile.innerHTML = prop[key] ? this.encodeHTML(prop[key]!.toString()) : '-';
        } else {
          if (element) element.innerHTML = this.encodeHTML(prop[key]);
          if (elementMobile) elementMobile.innerHTML = this.encodeHTML(prop[key]);
        }
      });
    });
  }

  private encodeHTML(txt: string): string {
    return txt.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  private initializeSearchService(): void {
    this.searchService.initializeSearch(this.componentProps, {
      threshold: 0.4,
      includeMatches: true,
      keys: [
        { name: 'attribute', weight: 1 },
        { name: 'description', weight: 0.5 },
        { name: 'type', weight: 0.4 },
        { name: 'default', weight: 0.01 },
      ],
    });
  }
}
