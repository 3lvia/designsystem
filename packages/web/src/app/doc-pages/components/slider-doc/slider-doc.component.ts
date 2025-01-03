import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { SliderCegComponent } from './slider-ceg/slider-ceg.component';
import { sliderData } from './slider-data';

@Component({
  selector: 'app-slider-doc',
  templateUrl: './slider-doc.component.html',
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    SliderCegComponent,
    ComponentSectionComponent,
    WhenToUseComponent,
    ComponentSubsectionComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderDocComponent {
  componentData = sliderData;
  does = ['When the specific value does not matter but approximate is good enough.'];
  donts = ['When the specific value is important.'];
}
