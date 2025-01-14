import { AsyncPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { getDocPage } from '../../doc-pages';
import { DocPageName } from '../../shared.enum';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-component-related',
  templateUrl: './component-related.component.html',
  styleUrls: ['./component-related.component.scss'],
  imports: [RouterLink, AsyncPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentRelatedComponent {
  readonly relatedPages = input.required<DocPageName[]>();

  constructor(
    private cmsService: CMSService,
    themeService: ThemeService,
  ) {
    themeService.listenTheme().subscribe(() => {
      this.componentIcons = this.cmsService.getPageIcons();
    });
  }

  // @ts-expect-error TS2564 (LEGO-3683)
  componentIcons: ReturnType<typeof this.cmsService.getPageIcons>;

  getRelatedTitle = (docUrl: DocPageName) => {
    return getDocPage(docUrl).title;
  };

  getRelatedPath = (docUrl: DocPageName) => {
    return getDocPage(docUrl).absolutePath;
  };
}
