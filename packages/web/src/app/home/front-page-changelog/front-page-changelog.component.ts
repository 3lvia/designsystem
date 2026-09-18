import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { createChangelogs } from './changelogs';
import { FrontPageChangelogDatePipe } from './front-page-changelog-date-pipe';
import { FrontPageChangelogNamePipe } from './front-page-changelog-name-pipe';

@Component({
  imports: [RouterModule, FrontPageChangelogDatePipe, FrontPageChangelogNamePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-front-page-changelog',
  templateUrl: './front-page-changelog.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./front-page-changelog.component.scss'],
})
export class FrontPageChangelogComponent {
  changelogs = createChangelogs();
}
