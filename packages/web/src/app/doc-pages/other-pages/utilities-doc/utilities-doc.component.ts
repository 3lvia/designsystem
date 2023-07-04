import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';
import { utilityGroups } from './utility-groups';

@Component({
  selector: 'app-utilities-doc',
  templateUrl: './utilities-doc.component.html',
  styleUrls: ['./utilities-doc.component.scss'],
})
export class UtilitiesDocComponent {
  description = getDocPagesNotFromCMS('utility-classes')?.description;
  title = getDocPagesNotFromCMS('utility-classes')?.title;
  utilityGroups = utilityGroups;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
