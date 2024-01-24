import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { createChangelogs } from './changelogs';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { FrontPageChangelogDatePipe } from './front-page-changelog-date-pipe';
import { FrontPageChangelogNamePipe } from './front-page-changelog-name-pipe';
import { FrontPageChangelogUrlPipe } from './front-page-changelog-url-pipe';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
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
    private themeService: ThemeService,
  ) {
    this.themeService.listenTheme().subscribe(() => {
      this.componentIcons = this.cmsService.getPageIcons();
    });
  }
  changelogs = createChangelogs();
  componentIcons: ReturnType<typeof this.cmsService.getPageIcons>;
}
