import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { CegComponent } from '../../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../../shared/when-to-use/when-to-use.component';
import { SegmentedControlCegComponent } from './segmented-control-ceg/segmented-control-ceg.component';
import { segmentedControlData } from './segmented-controls-data';

@Component({
    selector: 'app-segmented-controls-doc',
    templateUrl: './segmented-controls-doc.component.html',
    styleUrls: ['./segmented-controls-doc.component.scss'],
    imports: [
        ComponentDocumentationComponent,
        CegComponent,
        SegmentedControlCegComponent,
        ComponentSectionComponent,
        WhenToUseComponent,
        ComponentSubsectionComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SegmentedControlsDocComponent {
  componentData = segmentedControlData;
  does = ['To display different views.'];
  donts = [
    'Do not use segmented controls if there are more than three options or the option texts are too long (then use dropdown instead)',
  ];
}
