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
    this.componentIcons = this.cmsService.getIcons();
  }
  changelogs = createChangelogs();
  componentIcons: ReturnType<typeof this.cmsService.getIcons>;
}
