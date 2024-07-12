import { Component } from '@angular/core';

import { RadioPanelCegComponent } from './radio-panel-ceg/radio-panel.component';
import { RadioPanelDetailedCegComponent } from './radio-panel-detailed-ceg/radio-panel-detailed.component';
import { RadioPanelSimpleCegComponent } from './radio-panel-simple-ceg/radio-panel-simple.component';
import { StaticCegComponent } from 'src/app/shared/component-documentation/ceg';
import { ComponentDocumentationComponent } from 'src/app/shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from 'src/app/shared/when-to-use/when-to-use.component';

@Component({
  selector: 'app-radio-panel-doc',
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    RadioPanelCegComponent,
    RadioPanelDetailedCegComponent,
    RadioPanelSimpleCegComponent,
    StaticCegComponent,
    WhenToUseComponent,
  ],
  templateUrl: './radio-panel-doc.component.html',
})
export class RadioPanelDocComponent {
  does = [
    'When you want to describe or visualize a radio button.',
    'When users need to browse through options of an object.',
  ];
  donts = [
    'If it is possible to select more than one option - use checkbox.',
    'If you have more than five options in total - use dropdown.',
  ];
}
