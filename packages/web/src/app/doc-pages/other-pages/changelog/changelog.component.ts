import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import changelogJson from 'src/assets/changelogs/elvis/CHANGELOG.json';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss'],
})
export class ChangelogComponent {
  description = getDocPagesNotFromCMS('changelog').description;
  title = getDocPagesNotFromCMS('changelog').title;
  externalUrl = getDocPagesNotFromCMS('changelog').externalUrl;
  changelog = changelogJson.content;

  constructor(private titleService: Title) {
    this.titleService.setTitle(`${this.title} | Elvia design system`);
  }
}
