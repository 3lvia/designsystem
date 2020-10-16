import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-segmented-controls-doc',
  templateUrl: './segmented-controls-doc.component.html',
  styleUrls: ['./segmented-controls-doc.component.scss'],
})
export class SegmentedControlsDocComponent {
  figmaUrl = getComponent('segmented-control-doc').figmaUrl;
  description = getComponent('segmented-control-doc').description;
  does = ['To display different views.', 'Instead of radio buttons.'];
  donts = [
    'Do not use segmented controls if there are more than three options or the option texts are too long.',
  ];

  exampleOverview = `<div class="e-segmented-controls">
  <input type="radio" name="so-1-1" id="so-1-1" checked>
  <input type="radio" name="so-1-1" id="so-1-2">
  <label for="so-1-1" data-value="Option 1"><span class="e-segmented-controls__title">Option 1</span></label>
  <label for="so-1-2" data-value="Option 2"><span class="e-segmented-controls__title">Option 2</span></label>
</div>
`;

  example1 = `<div class="e-segmented-controls">
  <input type="radio" name="sc-1-1" id="sc-1-1" checked>
  <input type="radio" name="sc-1-1" id="sc-1-2">
  <label for="sc-1-1" data-value="Option 1"><span class="e-segmented-controls__title">Option 1</span></label>
  <label for="sc-1-2" data-value="Option 2"><span class="e-segmented-controls__title">Option 2</span></label>
</div>
`;

  example2 = `<div class="e-segmented-controls">
  <input type="radio" name="sc-1-2" id="sc-1-1-1" checked>
  <input type="radio" name="sc-1-2" id="sc-1-1-2">
  <input type="radio" name="sc-1-2" id="sc-1-1-3">
  <label for="sc-1-1-1" data-value="Option 1"><span class="e-segmented-controls__title">Option 1</span></label>
  <label for="sc-1-1-2" data-value="Option 2"><span class="e-segmented-controls__title">Option 2</span></label>
  <label for="sc-1-1-3" data-value="Option 3"><span class="e-segmented-controls__title">Option 3</span></label>
</div>
`;
}
