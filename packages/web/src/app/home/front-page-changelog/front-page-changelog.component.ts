import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { createChangelogs } from './changelogs';
import { FrontPageChangelogDatePipe } from './front-page-changelog-date-pipe';
import { FrontPageChangelogNamePipe } from './front-page-changelog-name-pipe';
import { FrontPageChangelogUrlPipe } from './front-page-changelog-url-pipe';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  imports: [
    CommonModule,
    RouterModule,
    FrontPageChangelogDatePipe,
    FrontPageChangelogNamePipe,
    FrontPageChangelogUrlPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-front-page-changelog',
  templateUrl: './front-page-changelog.component.html',
  styleUrls: ['./front-page-changelog.component.scss'],
})
export class FrontPageChangelogComponent {
  constructor(
    private cmsService: CMSService,
    themeService: ThemeService,
  ) {
    themeService.listenTheme().subscribe(() => {
      this.componentIcons = this.cmsService.getPageIcons();
    });
  }
  changelogs = createChangelogs();
  // @ts-expect-error TS2564 (LEGO-3683)
  componentIcons: ReturnType<typeof this.cmsService.getPageIcons>;
}
