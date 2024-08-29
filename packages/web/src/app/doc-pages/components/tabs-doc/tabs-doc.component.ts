import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { TabsCegComponent } from './tabs-ceg/tabs-ceg.component';
import { tabsData } from './tabs-data';

@Component({
  selector: 'app-tabs-doc',
  templateUrl: './tabs-doc.component.html',
  styleUrls: ['./tabs-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    TabsCegComponent,
    ComponentSectionComponent,
    WhenToUseComponent,
    ComponentSubsectionComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabsDocComponent {
  componentData = tabsData;

  does = ['If you have sub-sections of a page and can not display everything at once'];
  donts = [
    'If the content can be displayed at once.',
    'Don’t use tab in tab.',
    'Primary navigation that links to other pages',
  ];
}
