import {Component} from '@angular/core';
import {getComponent} from 'src/app/shared/e-items';

@Component({
  selector: 'app-segmented-controls-doc',
  templateUrl: './segmented-controls-doc.component.html',
  styleUrls: ['./segmented-controls-doc.component.scss'],
})
export class SegmentedControlsDocComponent {
  externalUrl = getComponent('segmented-control-doc').externalUrl;
  componentStatus = getComponent('segmented-control-doc').status;
  does = ['To display different views.', 'Instead of radio buttons.'];
  donts = [
    'Do not use segmented controls if there are more than three options or the option texts are too long.',
  ];

  example1 = `
	<div class="e-segmented-controls">
		<input type="radio" id="radio-one" name="switch-example1" value="Option1" checked/>
		<label for="radio-one">Option 1</label>
		<input type="radio" id="radio-two" name="switch-example1" value="Option2" />
		<label for="radio-two">Option 2</label>
	</div>
`;
  example2 = `
	<div class="e-segmented-controls">
		<input type="radio" id="radio-five" name="switch-example2" value="Option1"/ checked>
		<label for="radio-five">Option 1</label>
		<input type="radio" id="radio-six" name="switch-example2" value="Option2" />
		<label for="radio-six">Option 2</label>
		<input type="radio" id="radio-seven" name="switch-example2" value="Option3" />
		<label for="radio-seven">Option 3</label>
	</div>
`;

  example3 = `
	<div class="e-segmented-controls e-segmented-controls---focus">
		<input type="radio" id="sc-focus1" name="switch-example3" value="Option1"/ checked>
		<label for="sc-focus1">Option 1</label>
		<input type="radio" id="sc-focus2" name="switch-example3" value="Option2" />
		<label for="sc-focus2">Option 2</label>
		<input type="radio" id="sc-focus3" name="switch-example3" value="Option3" />
		<label for="sc-focus3">Option 3</label>
	</div>
`;
}
