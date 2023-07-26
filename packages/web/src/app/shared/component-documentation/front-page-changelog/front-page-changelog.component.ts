import { Component } from '@angular/core';
import { createChangelogs } from './changelogs';
import { CMSService } from 'src/app/core/services/cms/cms.service';

@Component({
  selector: 'app-front-page-changelog',
  templateUrl: './front-page-changelog.component.html',
  styleUrls: ['./front-page-changelog.component.scss'],
})
export class FrontPageChangelogComponent {
  constructor(private cmsService: CMSService) {
    const icons = this.cmsService.getComponentIcons();
    this.componentIcons = icons;
  }
  changelogs = createChangelogs();
  componentIcons: ReturnType<typeof this.cmsService.getComponentIcons>;
}
