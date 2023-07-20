import { Component } from '@angular/core';
import { ComponentChangelog } from 'src/app/doc-pages/components/component-data.interface';
import { frontPageChangelogs } from './changelogs';

@Component({
  selector: 'app-front-page-changelog',
  templateUrl: './front-page-changelog.component.html',
  styleUrls: ['./front-page-changelog.component.scss'],
})
export class FrontPageChangelogComponent {
  changelogs = frontPageChangelogs;
}
