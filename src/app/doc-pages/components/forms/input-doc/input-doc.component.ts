import { Component, OnInit, Input } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';
import { TabNames } from 'src/app/shared/tab-names.enums';

@Component({
  selector: 'app-input-doc',
  templateUrl: './input-doc.component.html',
  styleUrls: ['./input-doc.component.scss']
})
export class InputDocComponent implements OnInit {

  headerDoes = 'A input should be used';
  headerDonts = 'A badge should not be used';

  componentStatus = getComponent('input-doc').status;
  componentClasses = ['e-form_field', 'e-form_input'];

  example1 = `<div class="e-form_field">
  <label class="e-form_field_label" for="normal">Normal input field </label>
  <div class="e-form_input">
    <input id="normal" type="text" placeholder="Placeholder text">
    <i class="e-icon-email e-icon-xs"></i>
  </div>
</div>
<div class="e-form_field">
  <label class="e-form_field_label" for="disabled">Disabled input field </label>
  <div class="e-form_input is-disabled">
    <input id="disabled" type="text" placeholder="Placeholder text" disabled>
    <i class="e-icon-email e-icon-xs"></i>
  </div>
</div>
`;

  example2 = `<div class="e-form_field">
  <label class="e-form_field_label" for="phone">Phone</label>
  <div class="is-combined-field">
    <div id="phone" class="e-form_input is-small">
      <input type="text" value="+47">
    </div>
    <div class="e-form_input">
      <input type="text" placeholder="Placeholder text">
      <i class="e-icon-phone e-icon-xs"></i>
    </div>
  </div>
</div>
`;

  example3 = `<div class="is-inlined-field">
  <div class="e-form_field is-medium">
    <label class="e-form_field_label" for="zip">Zip code</label>
    <div class="e-form_input">
      <input id="zip" type="text" placeholder="Zip code">
    </div>
  </div>
  <div class="e-form_field">
    <label class="e-form_field_label" for="city">City</label>
    <div class="e-form_input">
      <input id="city" type="text" placeholder="City">
    </div>
  </div>
</div>
`;

example4 = `<div class="e-form_field">
<label class="e-form_field_label" for="password">Password input field</label>
<div class="e-form_input">
  <input id="password" type="password" placeholder="*******">
  <i class="e-icon-lock e-icon-xs"></i>
</div>
</div>
<div class="e-form_field">
<label class="e-form_field_label" for="invalid">Invalid input field with error-message</label>
<div class="e-form_input is-invalid">
  <input id="invalid" type="password" value="passord">
  <i class="e-icon-lock e-icon-xs"></i>
</div>
<span class="e-form_field_error is-active">
  <i class="e-icon-alert-circle e-icon-xs"></i>
  Passord må inneholde både bokstaver og tall
</span>
</div>
`;

example5 = `<div class="e-form_field">
  <label class="e-form_field_label is-optional" for="textarea">Textarea</label>
  <div class="e-form_input">
    <textarea id="textarea" placeholder="Placeholder text" type="text"></textarea>
  </div>
</div>
`;

  constructor() { }

  ngOnInit() {
  }

}

