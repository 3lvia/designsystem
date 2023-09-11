import { Component, Input, OnInit } from '@angular/core';
import Fuse from 'fuse.js';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';
import { ComponentProp } from './types';
import { Searcher } from '../../searcher';

@Component({
  selector: 'app-component-properties-table',
  templateUrl: './component-properties-table.component.html',
  styleUrls: ['./component-properties-table.component.scss'],
})
export class ComponentPropertiesTableComponent implements OnInit {
  @Input() componentData: ComponentData;
  componentProps: ComponentProp[] = [];
  filteredComponentProps: ComponentProp[] = [];

  private searcher: Searcher<ComponentProp>;

  ngOnInit(): void {
    this.createPropArray();
    this.initializeSearch();
    this.searchProps('');
    setTimeout(() => {
      this.highlightSearchMatches();
    });
  }

  createPropArray(): void {
    Object.keys(this.componentData.attributes).forEach((prop) => {
      const propData = this.componentData.attributes[prop];
      const componentProp: ComponentProp = {
        attribute: prop,
        ...propData,
        description: propData.description ?? '',
      };
      this.componentProps.push(componentProp);
    });
  }

  searchProps(searchTerm: string): void {
    if (!this.searcher.isInitialized) {
      return;
    }
    if (searchTerm !== '') {
      this.filteredComponentProps = this.searcher.search(searchTerm);
    } else {
      this.searcher.search(searchTerm);
      this.filteredComponentProps = this.componentProps;
    }
    setTimeout(() => {
      this.highlightSearchMatches();
    });
  }

  private highlightSearchMatches(): void {
    this.resetHighlightedHTML();
    this.searcher.searchResults.forEach((resultItem) => {
      resultItem.matches?.forEach((match) => {
        try {
          const element = document.getElementById(`property-row-${resultItem.item.attribute}-${match.key}`);
          if (element && match.key && match.key in resultItem.item) {
            element.innerHTML = this.getHighlightedHTMLString(
              match,
              resultItem.item[match.key as keyof ComponentProp]?.toString() ?? '',
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
              resultItem.item[match.key as keyof ComponentProp]?.toString() ?? '',
            );
          }
        } catch (error) {
          console.log('id:', `property-row-${resultItem.item.attribute}-${match.key}-mobile`, error);
        }
      });
    });
  }

  private getHighlightedHTMLString(match: Fuse.FuseResultMatch, value: string): string {
    // Add any part of the description that is before the first match
    let highlightedValue = value.substring(0, match.indices[0][0]);
    // Add each match, and the part of the description between matches
    match.indices
      // Filter out any duplicate matches (happens if you search the exact name of a long prop)
      .reduce((usedIndices, current) => {
        if (usedIndices.find((used) => used[0] === current[0] && used[1] === current[1])) {
          return usedIndices;
        }
        return [...usedIndices, current];
      }, [] as Fuse.RangeTuple[])
      .forEach((matchIndices, index, items) => {
        const [matchStart, matchEnd] = matchIndices;
        // Only highlight in description if more than one character
        if (matchEnd - matchStart > 0) {
          highlightedValue += this.searcher.addHighlightBackground(
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

  private resetHighlightedHTML(): void {
    this.filteredComponentProps.forEach((prop) => {
      (['attribute', 'type', 'description', 'default'] as const).forEach((key) => {
        const element = document.getElementById(`property-row-${prop.attribute}-${key}`);
        const elementMobile = document.getElementById(`property-row-${prop.attribute}-${key}-mobile`);

        if (key === 'default') {
          if (element)
            element.innerHTML = prop[key] !== undefined ? this.encodeHTML(prop[key]!.toString()) : '-';
          if (elementMobile)
            elementMobile.innerHTML = prop[key] !== undefined ? this.encodeHTML(prop[key]!.toString()) : '-';
        } else {
          if (element) element.innerHTML = this.encodeHTML(prop[key] as string);
          if (elementMobile) elementMobile.innerHTML = this.encodeHTML(prop[key] as string);
        }
      });
    });
  }

  private encodeHTML(txt: string): string {
    return txt.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  private initializeSearch(): void {
    this.searcher = new Searcher(this.componentProps, {
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
