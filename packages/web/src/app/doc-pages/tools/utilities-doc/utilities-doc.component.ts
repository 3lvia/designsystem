import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ComponentHeaderComponent } from '../../../shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { CopyComponent } from '../../../shared/copy/copy.component';
import { utilityGroups } from './utility-groups-data';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('utility-classes');
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
}
