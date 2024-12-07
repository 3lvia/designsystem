import { AsyncPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
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
  // TODO: Skipped for migration because:
  //  This input is used in a control flow expression (e.g. `@if` or `*ngIf`)
  //  and migrating would break narrowing currently.
  @Input({ required: true }) relatedPages: DocPageName[];

  constructor(
    private cmsService: CMSService,
    themeService: ThemeService,
  ) {
    themeService.listenTheme().subscribe(() => {
      this.componentIcons = this.cmsService.getPageIcons();
    });
  }

  componentIcons: ReturnType<typeof this.cmsService.getPageIcons>;

  getRelatedTitle = (docUrl: DocPageName) => {
    return getDocPage(docUrl).title;
  };

  getRelatedPath = (docUrl: DocPageName) => {
    return getDocPage(docUrl).absolutePath;
  };
}
