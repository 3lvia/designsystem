import { Component, Input, OnInit, booleanAttribute } from '@angular/core';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';
import data from '@elvia/elvis/.internal/classlist.json';
import { getComponent } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-component-documentation',
  templateUrl: './component-documentation.component.html',
})
export class ComponentDocumentationComponent implements OnInit {
  @Input({ transform: booleanAttribute }) isElvis = false;
  @Input() componentData: ComponentData | undefined;
  @Input() elvisTitle: string | undefined;

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
      this.figmaUrl = getComponent(this.componentData.name.toLowerCase())?.figmaUrl;
      this.description = getComponent(this.componentData.name.toLowerCase())?.description;
      this.title = getComponent(this.componentData.name.toLowerCase())?.title;
    }
  }
}
