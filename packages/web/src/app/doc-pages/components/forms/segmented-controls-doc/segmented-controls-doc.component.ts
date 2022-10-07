import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { segmentedControlData } from './segmented-controls-data';
import { segmentedControlIconCode } from './segmented-controls-icon-code';
import { segmentedControlTextCode } from './segmented-controls-text-code';

@Component({
  selector: 'app-segmented-controls-doc',
  templateUrl: './segmented-controls-doc.component.html',
  styleUrls: ['./segmented-controls-doc.component.scss'],
})
export class SegmentedControlsDocComponent {
  componentData = segmentedControlData;
  segmentedControlTextCode = segmentedControlTextCode;
  segmentedControlIconCode = segmentedControlIconCode;
  typesData = [segmentedControlTextCode, segmentedControlIconCode];
  figmaUrl = getComponent('segmented-control').figmaUrl;
  description = getComponent('segmented-control').description;
  does = ['To display different views.'];
  donts = [
    'Do not use segmented controls if there are more than three options or the option texts are too long (then use dropdown instead)',
  ];
}
