import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/elvis-items';

@Component({
  selector: 'app-input-doc',
  templateUrl: './input-doc.component.html',
  styleUrls: ['./input-doc.component.scss']
})
export class InputDocComponent implements OnInit {

  componentStatus = getComponent('input-doc').status;
  componentClasses = ['.elvis-form_field', '.elvis-form_input'];

  example1 = `<div class="elvis-form_field">
  <label class="elvis-form_field_label" for="title">Normal input field </label>
  <div class="elvis-form_input">
    <input id="title" placeholder="Placeholdertext">
  </div>
</div>
`;
  example2 = `<div class="elvis-form_field">
  <label class="elvis-form_field_label" for="title">Normal input field with icon</label>
  <div class="elvis-form_input">
    <i class="fal fa-info-circle elvis-form_input_icon"></i>
    <input id="title" placeholder="Placeholdertext">
  </div>
</div>
`;

  example3 = `<div class="elvis-form_field">
  <label class="elvis-form_field_label" for="title">Active input field </label>
  <div class="elvis-form_input is-focus">
    <input id="title" placeholder="Placeholdertext" value="Kari Nordmenn">
  </div>
</div>
`;

  example4 = `<div class="elvis-form_field">
  <label class="elvis-form_field_label" for="title">Disabled input field</label>
  <div class="elvis-form_input is-disabled">
    <input id="title" placeholder="Placeholdertext" disabled>
  </div>
</div>
`;

  example5 = `<div class="elvis-form_field">
  <label class="elvis-form_field_label" for="title">Invalid input field with field errormessage</label>
  <div class="elvis-form_input is-invalid">
    <input id="title" value="ola.hafslund.no">
  </div>
  <span class="elvis-form_field_error is-active"><i class="fal fa-info-circle"></i>The email must contain @</span>
</div>
`;

  example6 = `<div class="elvis-form_field">
  <label class="elvis-form_field_label" for="title">Textarea</label>
  <div class="elvis-form_input">
    <textarea placeholder="Placeholdertext"></textarea>
  </div>
</div>
`;

  constructor() { }

  ngOnInit() {
  }

}

