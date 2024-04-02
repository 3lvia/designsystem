import { AsyncPipe, CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Category, allComponents, sortedComponentsInfo } from './components-info';
import { DocPagePipe } from './docPage.pipe';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { IfViewportSizeDirective } from 'src/app/shared/viewport-size/if-viewport-size.directive';

@Component({
  selector: 'app-components-doc',
  templateUrl: './components-doc.component.html',
  styleUrls: ['./components-doc.component.scss'],
  standalone: true,
  imports: [RouterLink, AsyncPipe, IfViewportSizeDirective, DocPagePipe, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ComponentsDocComponent {
  filterValue: Category | 'all' = 'all';

  componentIcons = inject(CMSService).getPageIcons();
  componentsInfo = sortedComponentsInfo;
  allComponents = allComponents;
}
