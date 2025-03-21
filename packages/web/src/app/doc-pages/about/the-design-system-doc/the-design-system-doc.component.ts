import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ComponentHeaderComponent } from '../../../shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { EasyIconComponent } from './easy-icon/easy-icon.component';
import { FlexibleIconComponent } from './flexible-icon/flexible-icon.component';
import { InnovativeIconComponent } from './innovative-icon/innovative-icon.component';
import { OpenIconComponent } from './open-icon/open-icon.component';
import { QualityIconComponent } from './quality-icon/quality-icon.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('the-design-system');
@Component({
  selector: 'app-the-design-system-doc',
  templateUrl: './the-design-system-doc.component.html',
  styleUrls: ['./the-design-system-doc.component.scss'],
  imports: [
    ComponentHeaderComponent,
    ComponentSectionComponent,
    EasyIconComponent,
    FlexibleIconComponent,
    OpenIconComponent,
    QualityIconComponent,
    InnovativeIconComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TheDesignSystemDocComponent {
  title = docPage.title;
  description = docPage.description;
  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | ' + 'Elvia design system');
  }
}
