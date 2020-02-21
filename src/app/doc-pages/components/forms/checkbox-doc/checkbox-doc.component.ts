import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/elvis-items';

@Component({
  selector: 'app-checkbox-doc',
  templateUrl: './checkbox-doc.component.html',
  styleUrls: ['./checkbox-doc.component.scss']
})
export class CheckboxDocComponent implements OnInit {

  componentStatus = getComponent('checkbox-doc').status;

  example1 = `<div class="elvis-form_field">
  <span class="elvis-form_field_title">Checkboxes</span>
  <label class="elvis-form_checkbox">
    <input type="checkbox" checked="">
    <span class="elvis-form_checkbox_mark"></span>
    <span class="elvis-form_checkbox_label">Picked checkbox</span>
  </label>
  <label class="elvis-form_checkbox">
    <input type="checkbox">
    <span class="elvis-form_checkbox_mark"></span>
    <span class="elvis-form_checkbox_label">Unpicked checkbox</span>
  </label>
  <label class="elvis-form_checkbox is-invalid">
    <input type="checkbox">
    <span class="elvis-form_checkbox_mark"></span>
    <span class="elvis-form_checkbox_label">Invalid checkbox</span>
  </label>
</div>
`;

  constructor() { }

  ngOnInit() {
  }

}
