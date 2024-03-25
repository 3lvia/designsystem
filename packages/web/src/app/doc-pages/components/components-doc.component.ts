import { AsyncPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Category, allComponents, componentsInfo } from './components-info';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { getDocPage } from 'src/app/shared/doc-pages';
import { DocPageName } from 'src/app/shared/shared.enum';
import { IfViewportSizeDirective } from 'src/app/shared/viewport-size/if-viewport-size.directive';

@Component({
  selector: 'app-components-doc',
  templateUrl: './components-doc.component.html',
  styleUrls: ['./components-doc.component.scss'],
  standalone: true,
  imports: [RouterLink, AsyncPipe, IfViewportSizeDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsDocComponent {
  filterValue: Category | 'all' = 'all';

  componentIcons = inject(CMSService).getPageIcons();
  componentsInfo = componentsInfo;
  allComponents = allComponents;

  getComponentTitle = (docUrl: DocPageName) => {
    return getDocPage(docUrl)?.title;
  };

  getComponentPath = (docUrl: DocPageName) => {
    return getDocPage(docUrl)?.absolutePath;
  };
}
