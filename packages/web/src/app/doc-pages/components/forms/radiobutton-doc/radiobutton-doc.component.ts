import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-radiobutton-doc',
  templateUrl: './radiobutton-doc.component.html',
  styleUrls: ['./radiobutton-doc.component.scss'],
})
export class RadiobuttonDocComponent {
  figmaUrl = getComponent('radiobutton').figmaUrl;
  description = getComponent('radiobutton').description;
  does = [
    'When you only can select one option.',
    'Want to visually expose all options instead of hiding them in a dropdown.',
  ];
  // tslint:disable-next-line:max-line-length
  donts = [
    'If it is possible to select more than one option - use checkbox.',
    'If you have more than five options in total - use dropdown.',
  ];

  overviewExample = `<form class="e-form_field">
  <label class="e-radio" for="optionOverview1">
    <input type="radio" id="optionOverview1" name="example1" value="value1" checked />
    <span class="e-radio__mark"></span>
    <span class="e-radio__label">Radio button option 1</span>
  </label>
  <label class="e-radio" for="optionOverview2">
    <input type="radio" id="optionOverview2" name="example1" value="value2" />
    <span class="e-radio__mark"></span>
    <span class="e-radio__label">Radio button option 2</span>
  </label>
</form>`;

  example1 = `<form class="e-form_field">
  <label class="e-radio" for="ex1_1">
    <input type="radio" id="ex1_1" name="example1_1" value="value1" checked />
    <span class="e-radio__mark"></span>
    <span class="e-radio__label">Selected</span>
  </label>
  <label class="e-radio" for="ex1_2">
    <input type="radio" id="ex1_2" name="example1_1" value="value2"/>
    <span class="e-radio__mark"></span>
    <span class="e-radio__label">Normal</span>
  </label>
</form>`;

  example2 = `<form class="e-form_field">
  <label class="e-radio e-radio--sm" for="optionSmall1">
    <input type="radio" id="optionSmall1" name="example2_1" value="value1" checked />
    <span class="e-radio__mark"></span>
    <span class="e-radio__label">Selected</span>
  </label>
  <label class="e-radio e-radio--sm" for="optionSmall2">
    <input type="radio" id="optionSmall2" name="example2_1" value="value2"/>
    <span class="e-radio__mark"></span>
    <span class="e-radio__label">Normal</span>
  </label>
</form>`;

  example3 = `<form class="e-form_field">
  <label class="e-radio e-radio---hover">
    <input type="radio" name="hover"/>
    <span class="e-radio__mark"></span>
    <span class="e-radio__label">Hover</span>
  </label>
  <label class="e-radio e-radio---checked">
    <input type="radio"  name="checked"/>
    <span class="e-radio__mark" ></span>
    <span class="e-radio__label">Checked</span>
  </label>
  <label class="e-radio e-radio---disabled" style="pointer-events: none;">
      <input type="radio" name="disabled"/>
      <span class="e-radio__mark"></span>
      <span class="e-radio__label">Disabled</span>
  </label>
  <label class="e-radio e-radio---disabled-checked" style="pointer-events: none;">
    <input type="radio" name="disabled-checked"/>
    <span class="e-radio__mark"></span>
    <span class="e-radio__label">Disabled checked</span>
  </label>
  <label class="e-radio e-radio---focus">
    <input type="radio" name="focus"/>
    <span class="e-radio__mark"></span>
    <span class="e-radio__label">Focus</span>
  </label>
  <label class="e-radio e-radio---invalid">
    <input type="radio" name="invalid"/>
    <span class="e-radio__mark"></span>
    <span class="e-radio__label">Invalid</span>
  </label>
</form>
`;
}
