import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { getDocPage } from '../../doc-pages';
import { DocPageName } from '../../shared.enum';
import { CMSService } from 'src/app/core/services/cms/cms.service';

@Component({
  selector: 'app-component-related',
  templateUrl: './component-related.component.html',
  styleUrls: ['./component-related.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, AsyncPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentRelatedComponent {
  @Input({ required: true }) relatedPages: DocPageName[];

  constructor(private cmsService: CMSService) {
    this.componentIcons = this.cmsService.getPageIcons();
  }

  componentIcons: ReturnType<typeof this.cmsService.getPageIcons>;

  getRelatedTitle = (docUrl: DocPageName) => {
    return getDocPage(docUrl)?.title;
  };

  getRelatedPath = (docUrl: DocPageName) => {
    return getDocPage(docUrl)?.absolutePath;
  };
}
