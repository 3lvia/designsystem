import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/elvis-items';

@Component({
  selector: 'app-radiobutton-doc',
  templateUrl: './radiobutton-doc.component.html',
  styleUrls: ['./radiobutton-doc.component.scss']
})
export class RadiobuttonDocComponent implements OnInit {

  componentStatus = getComponent('radiobutton-doc').status;
  componentClasses = ['.elvis-form_field', '.elvis-form_radiobutton'];

  example1 = `<form class="elvis-form_field">
  <span class="elvis-form_field_title">Radio buttons</span>
  <label class="elvis-form_radiobutton">
      <input type="radio" name="formname" checked />
      <span class="elvis-form_radiobutton_mark"></span>
      <span class="elvis-form_radiobutton_label">Picked</span>
  </label>
  <label class="elvis-form_radiobutton">
      <input type="radio" name="formname" />
      <span class="elvis-form_radiobutton_mark"></span>
      <span class="elvis-form_radiobutton_label">Unpicked</span>
  </label>
</form>
`;

  constructor() { }

  ngOnInit() {
  }

}
