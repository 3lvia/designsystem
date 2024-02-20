import { Component } from '@angular/core';
import { sliderData } from './slider-data';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { SliderCegComponent } from './slider-ceg/slider-ceg.component';
import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';

@Component({
  selector: 'app-slider-doc',
  templateUrl: './slider-doc.component.html',
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    SliderCegComponent,
    ComponentSectionComponent,
    WhenToUseComponent,
    ComponentSubsectionComponent,
  ],
})
export class SliderDocComponent {
  componentData = sliderData;
  does = ['When the specific value does not matter but approximate is good enough.'];
  donts = ['When the specific value is important.'];
}
