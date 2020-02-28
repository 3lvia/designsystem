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

  example1 = `<div class="e-form_field">
  <span class="e-form_field_title">Checkboxes</span>
  <label class="e-form_checkbox">
    <input type="checkbox" checked="">
    <span class="e-form_checkbox_mark"></span>
    <span class="e-form_checkbox_label">Picked checkbox</span>
  </label>
  <label class="e-form_checkbox">
    <input type="checkbox">
    <span class="e-form_checkbox_mark"></span>
    <span class="e-form_checkbox_label">Unpicked checkbox</span>
  </label>
  <label class="e-form_checkbox is-invalid">
    <input type="checkbox">
    <span class="e-form_checkbox_mark"></span>
    <span class="e-form_checkbox_label">Invalid checkbox</span>
  </label>
</div>
`;

  constructor() { }

  ngOnInit() {
  }

}
