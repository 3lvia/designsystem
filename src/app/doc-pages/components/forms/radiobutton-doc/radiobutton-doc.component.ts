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

  example1 = `<form class="e-form_field">
  <span class="e-form_field_title">Radio buttons</span>
  <label class="e-radio">
    <input type="radio" name="formname" checked />
    <span class="e-radio__mark"></span>
    <span class="e-radio__label">Picked</span>
  </label>


  <label class="e-radio">
      <input type="radio" name="formname" checked />
      <span class="e-radio__mark"></span>
      <span class="e-radio__label">Picked</span>
  </label>
 <label class="e-radio">
      <input type="radio" name="formname" checked />
      <span class="e-radio__mark"></span>
      <span class="e-radio__label">Picked</span>
  </label>
</form>
`;

  constructor() { }

  ngOnInit() {
  }

}
