import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-radiobutton-doc',
  templateUrl: './radiobutton-doc.component.html',
  styleUrls: ['./radiobutton-doc.component.scss']
})
export class RadiobuttonDocComponent implements OnInit {

  componentStatus = getComponent('radiobutton-doc').status;
  componentClasses = ['.e-form_field', '.e-form_radiobutton'];

  example1 = `<form class="e-form_field">
  <span class="e-form_field_title">Radio buttons</span>
  <label class="e-form_radiobutton">
      <input type="radio" name="formname" checked />
      <span class="e-form_radiobutton_mark"></span>
      <span class="e-form_radiobutton_label">Picked</span>
  </label>
  <label class="e-form_radiobutton">
      <input type="radio" name="formname" />
      <span class="e-form_radiobutton_mark"></span>
      <span class="e-form_radiobutton_label">Unpicked</span>
  </label>
</form>
`;

  constructor() { }

  ngOnInit() {
  }

}
