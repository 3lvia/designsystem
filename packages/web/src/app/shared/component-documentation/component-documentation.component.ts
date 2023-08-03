import { Component, Input, OnInit, booleanAttribute } from '@angular/core';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';
import data from '@elvia/elvis/.internal/classlist.json';
import { getComponent } from 'src/app/shared/doc-pages';
import { DocPageName } from '../shared.enum';
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
}
