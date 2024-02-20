import { Component } from '@angular/core';
import { boxData } from './box-data';
import { ComponentSubsubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { BoxCegComponent } from './box-ceg/box-ceg.component';
import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';

@Component({
    selector: 'app-box-doc',
    templateUrl: './box-doc.component.html',
    standalone: true,
    imports: [
        ComponentDocumentationComponent,
        CegComponent,
        BoxCegComponent,
        ComponentSectionComponent,
        WhenToUseComponent,
        ComponentSubsectionComponent,
        ComponentSubsubsectionComponent,
    ],
})
export class BoxDocComponent {
  componentData = boxData;
  does = ['Grouping content', 'To separate information from the rest of the page'];
}
