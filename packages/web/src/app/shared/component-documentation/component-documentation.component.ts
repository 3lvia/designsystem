import { Component, OnInit, booleanAttribute, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import data from '@elvia/elvis/.internal/classlist.json';

import { DocPageName } from '../shared.enum';
import { ComponentChangelogComponent } from './component-changelog/component-changelog.component';
import { createElvisFilteredChangelog } from './component-changelog/createElvisFilteredChangelog';
import { ComponentInstallationComponent } from './component-installation/component-installation.component';
import { ComponentPropertiesTableComponent } from './component-properties-table/component-properties-table.component';
import { ComponentPropertiesComponent } from './component-properties/component-properties.component';
import { ComponentRelatedComponent } from './component-related/component-related.component';
import { ComponentHeaderComponent } from './component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from './component-structure/component-section/component-section.component';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';
import { getComponent } from 'src/app/shared/doc-pages';

/**
 * Builds a standard documentation page for a component.
 * It uses Multi-slot content projection to select and order the different documentation sections.
 *
 * @example
 * ```
 * <app-component-documentation [componentData]="componentData">
 *   <app-component-section size [sectionTitle]="'Size'"> //notice the size attribute here
 *     lorem ipsum...
 *   </app-component-section>
 * </app-component-documentation>
 * ```
 *
 * @see [Angular Content Projection Guide](https://angular.io/guide/content-projection)
 */
@Component({
  selector: 'app-component-documentation',
  templateUrl: './component-documentation.component.html',
  imports: [
    ComponentHeaderComponent,
    ComponentSectionComponent,
    ComponentInstallationComponent,
    RouterLink,
    ComponentPropertiesTableComponent,
    ComponentPropertiesComponent,
    ComponentChangelogComponent,
    ComponentRelatedComponent,
  ],
})
export class ComponentDocumentationComponent implements OnInit {
  readonly docUrl = input.required<DocPageName>();
  readonly isElvis = input(false, { transform: booleanAttribute });
  readonly componentData = input<ComponentData>();

  title: string | undefined;
  description: string | undefined;
  figmaUrl: string | undefined;
  elvisClassName: keyof typeof data.block | undefined;
  relatedPages: DocPageName[] | undefined;

  constructor(private titleService: Title) {}

  ngOnInit() {
    const docPage = getComponent(this.docUrl());
    this.title = docPage.title;
    this.description = docPage.description;
    this.figmaUrl = docPage.figmaUrl;
    this.relatedPages = docPage.relatedPages;
    if (this.isElvis()) {
      this.elvisClassName = docPage.elvisClassName;
      if (!this.elvisClassName) {
        this.elvisClassName = ('e-' + this.docUrl()) as keyof typeof data.block;
      }
    }

    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  get lastUpdatedDate(): string {
    const componentData = this.componentData();
    if (this.isElvis() && this.title) {
      return createElvisFilteredChangelog(this.title)[0].date;
    } else if (componentData?.changelog?.length) {
      return componentData.changelog[0].date;
    } else {
      return '';
    }
  }
}
