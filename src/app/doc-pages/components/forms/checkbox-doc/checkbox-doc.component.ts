import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-checkbox-doc',
  templateUrl: './checkbox-doc.component.html',
  styleUrls: ['./checkbox-doc.component.scss']
})
export class CheckboxDocComponent implements OnInit {

  componentStatus = getComponent('checkbox-doc').status;
  componentClasses = ['e-checkbox'];

  example1 = `<form>
  <label class="e-checkbox">
    <input type="checkbox">
    <span class="e-checkbox_mark"></span>
    <span class="e-checkbox_label">Normal checkbox</span>
  </label>

  <label class="e-checkbox">
    <input type="checkbox" checked>
    <span class="e-checkbox_mark"></span>
    <span class="e-checkbox_label">Checked checkbox</span>
  </label>

  <label class="e-checkbox">
    <input type="checkbox" disabled>
    <span class="e-checkbox_mark"></span>
    <span class="e-checkbox_label">Disabled checkbox</span>
  </label>

  <label class="e-checkbox">
    <input type="checkbox" required>
    <span class="e-checkbox_mark"></span>
    <span class="e-checkbox_label">Invalid checkbox</span>
  </label>
<form>
`;
  example2 = `
  <label class="e-checkbox">
    <input type="checkbox">
    <span class="e-checkbox_mark checked"></span>
    <span class="e-checkbox_label">Checked</span>
  </label>

  <label class="e-checkbox">
    <input type="checkbox">
    <span class="e-checkbox_mark focus"></span>
    <span class="e-checkbox_label">Focus</span>
  </label>

  <label class="e-checkbox">
    <input type="checkbox">
    <span class="e-checkbox_mark hover"></span>
    <span class="e-checkbox_label">Hover</span>
  </label>

  <label class="e-checkbox">
    <input type="checkbox">
    <span class="e-checkbox_mark disabled"></span>
    <span class="e-checkbox_label">Disabled</span>
  </label>

  <label class="e-checkbox">
    <input type="checkbox">
    <span class="e-checkbox_mark invalid"></span>
    <span class="e-checkbox_label">Invalid</span>
  </label>
`;

  constructor() { }

  ngOnInit() {
  }

}
