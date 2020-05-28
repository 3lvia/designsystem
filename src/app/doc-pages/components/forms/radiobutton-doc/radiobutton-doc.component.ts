import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-radiobutton-doc',
  templateUrl: './radiobutton-doc.component.html',
  styleUrls: ['./radiobutton-doc.component.scss']
})
export class RadiobuttonDocComponent implements OnInit {

  externalUrl = getComponent('radiobutton-doc').externalUrl;
  componentStatus = getComponent('radiobutton-doc').status;
  pseudoclases = ['e-radio__mark---checked', 'e-radio__mark---disabled', 'e-radio__mark---focus', 'e-radio__mark---hover'
  , 'e-radio__mark---invalid'];
  does = ['When you only can select one option.', 'Want to visually expose all options instead of hiding them in a dropdown.'];
  // tslint:disable-next-line:max-line-length
  donts = ['If it is possible to select more than one option - use checkbox.', 'If you have more than five options in total - use dropdown.'];

  example1 = `<form class="e-form_field">
  <label class="e-radio" for="option1">
    <input type="radio" id="option1" name="example1" value="value1" checked />
    <span class="e-radio__mark"></span>
    <span class="e-radio__label">Picked option</span>
  </label>
  <label class="e-radio" for="option2">
      <input type="radio" id="option2" name="example1" value="value2"/>
      <span class="e-radio__mark"></span>
      <span class="e-radio__label">Unpicked option</span>
  </label>
  <label class="e-radio" for="option3">
      <input type="radio" id="option3" name="example1" value="value2" disabled/>
      <span class="e-radio__mark"></span>
      <span class="e-radio__label">Disabled</span>
  </label>
</form>
`;

  example2 = `<form class="e-form_field">
  <span class="e-form_field_title">Radio buttons</span>
  <label class="e-radio">
    <input type="radio"  name="example1"/>
    <span class="e-radio__mark e-radio__mark---checked" ></span>
    <span class="e-radio__label">Checked style</span>
  </label>
  <label class="e-radio">
      <input type="radio" name="example1"/>
      <span class="e-radio__mark e-radio__mark---disabled"></span>
      <span class="e-radio__label">Disabled style</span>
  </label>
  <label class="e-radio">
      <input type="radio" name="example1"/>
      <span class="e-radio__mark e-radio__mark---focus"></span>
      <span class="e-radio__label">Focus style</span>
  </label>
    <label class="e-radio">
      <input type="radio" name="example1"/>
      <span class="e-radio__mark e-radio__mark---hover"></span>
      <span class="e-radio__label">Hover style</span>
  </label>
    <label class="e-radio">
      <input type="radio" name="example1"/>
      <span class="e-radio__mark e-radio__mark---invalid"></span>
      <span class="e-radio__label">Invalid style</span>
  </label>
</form>`;



  constructor() { }

  ngOnInit() {
  }

}
