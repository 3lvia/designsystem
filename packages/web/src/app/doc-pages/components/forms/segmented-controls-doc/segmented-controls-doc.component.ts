import { Component } from '@angular/core';
import { segmentedControlData } from './segmented-controls-data';
import { ComponentSubsectionComponent } from '../../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../../shared/when-to-use/when-to-use.component';
import { ComponentSectionComponent } from '../../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { SegmentedControlCegComponent } from './segmented-control-ceg/segmented-control-ceg.component';
import { CegComponent } from '../../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../../shared/component-documentation/component-documentation.component';

@Component({
  selector: 'app-segmented-controls-doc',
  templateUrl: './segmented-controls-doc.component.html',
  styleUrls: ['./segmented-controls-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    SegmentedControlCegComponent,
    ComponentSectionComponent,
    WhenToUseComponent,
    ComponentSubsectionComponent,
  ],
})
export class SegmentedControlsDocComponent {
  componentData = segmentedControlData;
  does = ['To display different views.'];
  donts = [
    'Do not use segmented controls if there are more than three options or the option texts are too long (then use dropdown instead)',
  ];
}
