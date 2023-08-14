import { Component } from '@angular/core';
import { segmentedControlData } from './segmented-controls-data';

@Component({
  selector: 'app-segmented-controls-doc',
  templateUrl: './segmented-controls-doc.component.html',
  styleUrls: ['./segmented-controls-doc.component.scss'],
})
export class SegmentedControlsDocComponent {
  componentData = segmentedControlData;
  does = ['To display different views.'];
  donts = [
    'Do not use segmented controls if there are more than three options or the option texts are too long (then use dropdown instead)',
  ];
}
