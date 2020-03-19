import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-checkbox-toggle-doc',
  templateUrl: './checkbox-toggle-doc.component.html',
  styleUrls: ['./checkbox-toggle-doc.component.scss']
})
export class CheckboxToggleDocComponent implements OnInit {

  componentStatus = getComponent('checkbox-toggle-doc').status;
  componentClasses = ['e-form_field', 'e-form_toggle'];

  example1 = `<div class="e-form_field">
  <span class="e-form_field_title ">Toggle Checkbox</span>
  <label class="e-form_toggle e-m-2">
    <input type="checkbox">
    <span class="e-form_toggle slider"></span>
  </label>

  <label class="e-form_toggle e-m-2">
    <input type="checkbox" checked>
    <span class="e-form_toggle slider"></span>
  </label>
</div>
`;
  //
// <label class="e-form_toggle" >
  // <input type="checkbox" checked >
  //   <span class="e-form_toggle slider" > </span>
  //     < /label>
  //     < /div>


  constructor() { }

  ngOnInit() {
  }

}
