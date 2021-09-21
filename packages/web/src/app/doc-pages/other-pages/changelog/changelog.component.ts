import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss'],
})
export class ChangelogComponent {
  externalUrl = getDocPagesNotFromCMS('changelog').externalUrl;
  description = getDocPagesNotFromCMS('changelog').description;
}
