import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/elvis-items';

@Component({
  selector: 'app-checkbox-toggle-doc',
  templateUrl: './checkbox-toggle-doc.component.html',
  styleUrls: ['./checkbox-toggle-doc.component.scss']
})
export class CheckboxToggleDocComponent implements OnInit {

  componentStatus = getComponent('checkbox-toggle-doc').status;
  componentClasses = ['.elvis-form_field', '.elvis-form_toggle'];

  example1 = `<div class="elvis-form_field">
  <span class="elvis-form_field_title">Toggle Checkbox</span>
  <label class="elvis-form_toggle">
    <input type="checkbox">
    <span class="elvis-form_toggle slider"></span>
  </label>
  <label class="elvis-form_toggle">
    <input type="checkbox" checked>
    <span class="elvis-form_toggle slider"></span>
  </label>
</div>
`;

  constructor() { }

  ngOnInit() {
  }

}
