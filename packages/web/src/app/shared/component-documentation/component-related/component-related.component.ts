import { Component, Input } from '@angular/core';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { DocPageName } from '../../shared.enum';
import { getDocPage } from '../../doc-pages';

@Component({
  selector: 'app-component-related',
  templateUrl: './component-related.component.html',
  styleUrls: ['./component-related.component.scss'],
})
export class ComponentRelatedComponent {
  @Input() relatedPages: DocPageName[];

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
