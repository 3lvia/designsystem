import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

import { ComponentHeaderComponent } from '../../../shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { CopyComponent } from '../../../shared/copy/copy.component';
import { utilityGroups } from './utility-groups-data';

@Component({
  selector: 'app-utilities-doc',
  templateUrl: './utilities-doc.component.html',
  styleUrls: ['./utilities-doc.component.scss'],
  standalone: true,
  imports: [ComponentHeaderComponent, ComponentSubsectionComponent, NgFor, NgIf, RouterLink, CopyComponent],
})
export class UtilitiesDocComponent {
  description = getDocPagesNotFromCMS('utility-classes')?.description;
  title = getDocPagesNotFromCMS('utility-classes')?.title;
  utilityGroups = utilityGroups;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
