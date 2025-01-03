import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { ComponentHeaderComponent } from '../../../shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { CopyComponent } from '../../../shared/copy/copy.component';
import { utilityGroups } from './utility-groups-data';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

const docPage = getDocPagesNotFromCMS('utility-classes');
@Component({
  selector: 'app-utilities-doc',
  templateUrl: './utilities-doc.component.html',
  styleUrls: ['./utilities-doc.component.scss'],
  imports: [ComponentHeaderComponent, ComponentSubsectionComponent, RouterLink, CopyComponent],
})
export class UtilitiesDocComponent {
  description = docPage.description;
  title = docPage.title;
  utilityGroups = utilityGroups;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
