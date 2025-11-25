import { NgClass, NgTemplateOutlet } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Category, allComponents, sortedComponentsInfo } from './components-info';
import { DocPagePipe } from './docPage.pipe';
import { InlineSvgComponent } from 'src/app/shared/inline-svg/inline-svg.component';
import { IfViewportSizeDirective } from 'src/app/shared/viewport-size/if-viewport-size.directive';

@Component({
  selector: 'app-components-doc',
  templateUrl: './components-doc.component.html',
  styleUrls: ['./components-doc.component.scss'],
  imports: [RouterLink, IfViewportSizeDirective, DocPagePipe, InlineSvgComponent, NgClass, NgTemplateOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ComponentsDocComponent {
  filterValue: Category | 'all' = 'all';

  componentsInfo = sortedComponentsInfo;
  allComponents = allComponents;
}
