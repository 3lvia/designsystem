import { Component } from '@angular/core';
import { createChangelogs } from './changelogs';

@Component({
  selector: 'app-front-page-changelog',
  templateUrl: './front-page-changelog.component.html',
  styleUrls: ['./front-page-changelog.component.scss'],
})
export class FrontPageChangelogComponent {
  changelogs = createChangelogs();
}
