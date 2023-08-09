import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { segmentedControlData } from './segmented-controls-data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-segmented-controls-doc',
  templateUrl: './segmented-controls-doc.component.html',
  styleUrls: ['./segmented-controls-doc.component.scss'],
})
export class SegmentedControlsDocComponent {
  componentData = segmentedControlData;
  title = getComponent('segmented-control')?.title;
  does = ['To display different views.'];
  donts = [
    'Do not use segmented controls if there are more than three options or the option texts are too long (then use dropdown instead)',
  ];

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
