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

  // @ts-expect-error TS2564 (LEGO-3683)
  does: [
    'Many items to display and the user only needs to focus on a few at once',
    'Collection of related items',
  ];
  // @ts-expect-error TS2564 (LEGO-3683)
  donts: [
    'Should not be used on non-visual items such as links or paragraphs',
    'More than five frames - It’s unlikely users will engage with more than that (Use a list instead)',
  ];
}
