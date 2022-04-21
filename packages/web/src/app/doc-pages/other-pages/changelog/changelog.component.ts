import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import changelogJson from 'src/assets/changelogs/elvis/CHANGELOG.json';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss'],
})
export class ChangelogComponent {
  externalUrl = getDocPagesNotFromCMS('changelog').externalUrl;
  description = getDocPagesNotFromCMS('changelog').description;
  componentData = new Object({ changelog: changelogJson.content });
}
