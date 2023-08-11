import { Component, Input, OnInit, booleanAttribute } from '@angular/core';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';
import data from '@elvia/elvis/.internal/classlist.json';
import { getComponent } from 'src/app/shared/doc-pages';
import { DocPageName } from '../shared.enum';

@Component({
  selector: 'app-component-documentation',
  templateUrl: './component-documentation.component.html',
})
export class ComponentDocumentationComponent implements OnInit {
  @Input() docUrl: DocPageName;
  @Input({ transform: booleanAttribute }) isElvis = false;
  @Input() componentData: ComponentData | undefined;

  title: string | undefined;
  description: string | undefined;
  figmaUrl: string | undefined;
  elvisClassName: keyof typeof data.block | undefined;

  ngOnInit() {
    this.title = getComponent(this.docUrl)?.title;
    this.description = getComponent(this.docUrl)?.description;
    this.figmaUrl = getComponent(this.docUrl)?.figmaUrl;
    if (this.isElvis) {
      this.elvisClassName = getComponent(this.docUrl)?.elvisClassName;
      if (!this.elvisClassName) {
        this.elvisClassName = ('e-' + this.docUrl) as keyof typeof data.block;
      }
    }
  }
}
