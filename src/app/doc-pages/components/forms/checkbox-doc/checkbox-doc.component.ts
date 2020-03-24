import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-checkbox-doc',
  templateUrl: './checkbox-doc.component.html',
  styleUrls: ['./checkbox-doc.component.scss']
})
export class CheckboxDocComponent implements OnInit {

  componentStatus = getComponent('checkbox-doc').status;
  componentClasses = ['e-form_field', 'e-form_checkbox'];

  example1 = `
  <label class="e-checkbox">
    <input type="checkbox" checked>
    <span class="e-checkbox_mark"></span>
    <span class="e-checkbox_label">Picked checkbox</span>
  </label>

  <label class="e-checkbox">
    <input type="checkbox">
    <span class="e-checkbox_mark"></span>
    <span class="e-checkbox_label">Picked checkbox</span>
  </label>

  <label class="e-checkbox">
    <input type="checkbox">
    <span class="e-checkbox_mark"></span>
    <span class="e-checkbox_label">Picked checkbox</span>
  </label>

  <label class="e-checkbox">
    <input type="checkbox">
    <span class="e-checkbox_mark"></span>
    <span class="e-checkbox_label">Picked checkbox</span>
  </label>
`;

  constructor() { }

  ngOnInit() {
  }

}
