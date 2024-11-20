import { Component } from '@angular/core';

import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSubsubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { CardCegComponent } from './card-ceg/card-ceg.component';
import { cardData } from './card-data';
import { CardLinksCegComponent } from './card-links-ceg/card-links-ceg.component';

@Component({
    selector: 'app-card-doc',
    templateUrl: './card-doc.component.html',
    styleUrls: ['./card-doc.component.scss'],
    imports: [
        ComponentDocumentationComponent,
        CegComponent,
        CardCegComponent,
        ComponentSectionComponent,
        WhenToUseComponent,
        ComponentSubsectionComponent,
        ComponentSubsubsectionComponent,
        StaticCegComponent,
        CardLinksCegComponent,
    ]
})
export class CardDocComponent {
  componentData = cardData;
  doesCard = [
    'When you want a more visual representation of content than a list view.',
    'When users need to browse through options.',
  ];
  dontsCard = [
    'If the text is more describable than the icon, consider using Action link group instead.',
    'Do not use different types of cards on the same page. The same goes for the description version, use description on all or none.',
  ];
}
