import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { DocPageName } from '../../shared.enum';
import { getDocPage } from '../../doc-pages';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

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
