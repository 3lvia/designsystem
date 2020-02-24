import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/elvis-items';

@Component({
  selector: 'app-select-doc',
  templateUrl: './select-doc.component.html',
  styleUrls: ['./select-doc.component.scss']
})
export class SelectDocComponent implements OnInit {

  componentStatus = getComponent('select-doc').status;
  componentClasses = ['.elvis-form_field', '.elvis-form_select'];

  example1 = `<div class="elvis-form_field">
  <label class="elvis-form_field_label" for="select-alt1">Select Option</label>
  <div class="elvis-form_select">
    <select id="select-alt1" placeholder="Placeholder text">
      <option>Alternative 1</option>
      <option>Alternative 2</option>
    </select>
    <i class="fal fa-angle-down"></i>
  </div>
</div>
`;

  example2 = `<div class="elvis-form_field">
  <label class="elvis-form_field_label" for="select-alt1">Select Option with icon</label>
  <div class="elvis-form_select has-icon">
    <i class="fal fa-info-circle elvis-form_select_icon"></i>
    <select id="select-alt1" placeholder="Placeholder text">
      <option>Alternative 1</option>
      <option>Alternative 2</option>
    </select>
    <i class="fal fa-angle-down"></i>
  </div>
</div>
`;

  example3 = `<div class="elvis-form_field">
  <label class="elvis-form_field_label" for="select-alt2">Select Option (Disabled)</label>
  <div class="elvis-form_select is-disabled">
    <select id="select-alt2" placeholder="Placeholder text" disabled>
      <option>Alternative 1</option>
      <option>Alternative 2</option>
    </select>
    <i class="fal fa-angle-down"></i>
  </div>
</div>
`;

  example4 = `<div class="elvis-form_field">
  <label class="elvis-form_field_label" for="select-alt2">Select Option (Invalid)</label>
  <div class="elvis-form_select is-invalid">
    <select id="select-alt2" placeholder="Placeholder text">
      <option>Alternative 1</option>
      <option>Alternative 2</option>
    </select>
    <i class="fal fa-angle-down"></i>
  </div>
</div>
`; 

  constructor() { }

  ngOnInit() {
  }

}
