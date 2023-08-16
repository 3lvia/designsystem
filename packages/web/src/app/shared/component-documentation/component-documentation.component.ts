import { Component, Input, OnInit, booleanAttribute } from '@angular/core';
import ComponentData, { ComponentChangelog } from 'src/app/doc-pages/components/component-data.interface';
import data from '@elvia/elvis/.internal/classlist.json';
import { getComponent } from 'src/app/shared/doc-pages';
import { DocPageName } from '../shared.enum';
import elvisChangelogJson from '@elvia/elvis/CHANGELOG.json';
import { createElvisFilteredChangelog } from './component-changelog/createElvisFilteredChangelog';

type ChangelogLinks = { displayName: string; url: string }[];

@Component({
  selector: 'app-component-documentation',
  templateUrl: './component-documentation.component.html',
})
export class ComponentDocumentationComponent implements OnInit {
  @Input({ transform: booleanAttribute }) isElvis = false;
  @Input() componentData: ComponentData | undefined;
  @Input() elvisTitle: DocPageName | undefined;

  title: string | undefined;
  description: string | undefined;
  figmaUrl: string | undefined;
  elvisClassName: keyof typeof data.block | undefined;

  ngOnInit() {
    if (this.isElvis && this.elvisTitle) {
      this.figmaUrl = getComponent(this.elvisTitle)?.figmaUrl;
      this.description = getComponent(this.elvisTitle)?.description;
      this.title = getComponent(this.elvisTitle)?.title;
      this.elvisClassName = ('e-' + this.elvisTitle) as keyof typeof data.block;
    } else if (!this.isElvis && this.componentData) {
      this.figmaUrl = getComponent(this.componentData.name.toLowerCase() as DocPageName)?.figmaUrl;
      this.description = getComponent(this.componentData.name.toLowerCase() as DocPageName)?.description;
      this.title = getComponent(this.componentData.name.toLowerCase() as DocPageName)?.title;
    }
  }

  getLastUpdatedDate(): string {
    if (this.isElvis && this.title) {
      return createElvisFilteredChangelog(this.title)[0].date;
    } else if (this.componentData && this.componentData.changelog) {
      return this.componentData.changelog[0].date;
    } else {
      return '';
    }
  }
}
