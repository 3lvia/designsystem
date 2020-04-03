import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-segmented-controls-doc',
  templateUrl: './segmented-controls-doc.component.html',
  styleUrls: ['./segmented-controls-doc.component.scss']
})
export class SegmentedControlsDocComponent implements OnInit {

  externalUrl = getComponent('segmented-control-doc').externalUrl;
  componentStatus = getComponent('segmented-control-doc').status;


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
		<input type="radio" id="radio-three" name="switch-example2" value="Option1"/ checked>
		<label for="radio-three">Option 1</label>
		<input type="radio" id="radio-four" name="switch-example2" value="Option2" />
		<label for="radio-four">Option 2</label>
		<input type="radio" id="radio-five" name="switch-example2" value="Option3" />
		<label for="radio-five">Option 3</label>
	</div>
`;


  constructor() { }

  ngOnInit() {
  }

}
