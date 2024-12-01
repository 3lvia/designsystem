import { Component } from '@angular/core';

import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { CarouselCegComponent } from './carousel-ceg/carousel-ceg.component';
import { carouselData } from './carousel-data';

@Component({
  selector: 'app-carousel-doc',
  templateUrl: './carousel-doc.component.html',
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    CarouselCegComponent,
    ComponentSectionComponent,
    WhenToUseComponent,
    ComponentSubsectionComponent,
  ],
})
export class CarouselDocComponent {
  componentData = carouselData;
  does = carouselData.does;
  donts = carouselData.donts;
}
