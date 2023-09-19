import { Component, Input, OnInit, booleanAttribute } from '@angular/core';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';
import data from '@elvia/elvis/.internal/classlist.json';
import { getComponent } from 'src/app/shared/doc-pages';
import { DocPageName } from '../shared.enum';
import { createElvisFilteredChangelog } from './component-changelog/createElvisFilteredChangelog';
import { Title } from '@angular/platform-browser';

/**
 * Builds a standard documentation page for a component.
 * It uses Multi-slot content projection to select and order the different documentation sections.
 *
 * @example
 * ```
 * <app-component-documentation [componentData]="componentData">
 *   <app-component-section size [sectionTitle]="'Size'"> //notice the size attribute here
 *     <ng-container ngProjectAs="sectionContent">
 *       lorem ipsum...
 *     </ng-container>
 *   </app-component-section>
 * </app-component-documentation>
 * ```
 *
 * @see [Angular Content Projection Guide](https://angular.io/guide/content-projection)
 */
@Component({
  selector: 'app-component-documentation',
  templateUrl: './component-documentation.component.html',
})
export class ComponentDocumentationComponent implements OnInit {
  @Input({ required: true }) docUrl: DocPageName;
  @Input({ transform: booleanAttribute }) isElvis = false;
  @Input() componentData: ComponentData | undefined;

  title: string | undefined;
  description: string | undefined;
  figmaUrl: string | undefined;
  elvisClassName: keyof typeof data.block | undefined;
  relatedPages: DocPageName[] | undefined;

  constructor(private titleService: Title) {}

  ngOnInit() {
    this.title = getComponent(this.docUrl)?.title;
    this.description = getComponent(this.docUrl)?.description;
    this.figmaUrl = getComponent(this.docUrl)?.figmaUrl;
    this.relatedPages = getComponent(this.docUrl)?.relatedPages;
    if (this.isElvis) {
      this.elvisClassName = getComponent(this.docUrl)?.elvisClassName;
      if (!this.elvisClassName) {
        this.elvisClassName = ('e-' + this.docUrl) as keyof typeof data.block;
      }
    }

    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  get lastUpdatedDate(): string {
    if (this.isElvis && this.title) {
      return createElvisFilteredChangelog(this.title)[0].date;
    } else if (this.componentData && this.componentData.changelog) {
      return this.componentData.changelog[0].date;
    } else {
      return '';
    }
  }
}
