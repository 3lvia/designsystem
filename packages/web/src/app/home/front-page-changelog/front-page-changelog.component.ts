import { Component } from '@angular/core';
import { createChangelogs } from './changelogs';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-front-page-changelog',
  templateUrl: './front-page-changelog.component.html',
  styleUrls: ['./front-page-changelog.component.scss'],
})
export class FrontPageChangelogComponent {
  constructor(private cmsService: CMSService, private themeService: ThemeService) {
    this.themeService.listenTheme().subscribe(() => {
      this.componentIcons = this.cmsService.getComponentIcons();
    });
  }
  changelogs = createChangelogs();
  componentIcons: ReturnType<typeof this.cmsService.getComponentIcons>;
}
