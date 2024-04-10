import { Component } from '@angular/core';

import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { TooltipCegComponent } from './tooltip-ceg/tooltip-ceg.component';
import { tooltipData } from './tooltip-data';

@Component({
  selector: 'app-tooltip-doc',
  templateUrl: './tooltip-doc.component.html',
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    TooltipCegComponent,
    ComponentSectionComponent,
    WhenToUseComponent,
    ComponentSubsectionComponent,
  ],
})
export class TooltipDocComponent {
  componentData = tooltipData;

  does = ['Explain the function of an user interactive element.', 'Showing full version of shortened text.'];
  donts = [
    "If you can't think of any particularly useful content in a tooltip.",
    'Don’t use tooltip to explain a concept.',
    'Don’t hide necessary information in a tooltip.',
  ];
}
