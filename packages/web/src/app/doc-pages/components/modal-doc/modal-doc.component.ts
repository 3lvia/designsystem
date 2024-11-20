import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSubsubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { ModalCegComponent } from './modal-ceg/modal-ceg.component';
import { ModalInitialFocusCegComponent } from './modal-initial-focus-ceg/modal-initial-focus-ceg.component';
import { ModalMultiplePagesCegComponent } from './modal-multiple-pages-ceg/modal-multiple-pages-ceg.component';
import { modalData } from 'src/app/doc-pages/components/modal-doc/modal-data';

@Component({
    selector: 'app-modal-doc',
    templateUrl: './modal-doc.component.html',
    styleUrls: ['./modal-doc.component.scss'],
    imports: [
        ComponentDocumentationComponent,
        CegComponent,
        ModalCegComponent,
        ComponentSectionComponent,
        ComponentSubsectionComponent,
        RouterLink,
        ModalMultiplePagesCegComponent,
        ModalInitialFocusCegComponent,
        WhenToUseComponent,
        ComponentSubsubsectionComponent,
    ]
})
export class ModalDocComponent {
  componentData = modalData;
  does = [
    'Where we need the user to make an active choice before continuing, or when a wrong decision can be critical.',
  ];
  donts = [
    'Be careful with the use of modals, as it can be disruptive to have something lying across the screen many times in a row.',
  ];
}
