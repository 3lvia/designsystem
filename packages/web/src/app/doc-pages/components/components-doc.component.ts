import { AsyncPipe, CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Category, allComponents, sortedComponentsInfo } from './components-info';
import { DocPagePipe } from './docPage.pipe';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { IfViewportSizeDirective } from 'src/app/shared/viewport-size/if-viewport-size.directive';

@Component({
  selector: 'app-components-doc',
  templateUrl: './components-doc.component.html',
  styleUrls: ['./components-doc.component.scss'],
  imports: [RouterLink, AsyncPipe, IfViewportSizeDirective, DocPagePipe, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ComponentsDocComponent {
  filterValue: Category | 'all' = 'all';

  constructor(
    private cmsService: CMSService,
    themeService: ThemeService,
  ) {
    themeService.listenTheme().subscribe(() => {
      this.componentIcons = cmsService.getPageIcons();
    });
  }

  // @ts-expect-error TS2564 (LEGO-3683)
  componentIcons: ReturnType<typeof this.cmsService.getPageIcons>;
  componentsInfo = sortedComponentsInfo;
  allComponents = allComponents;
}
