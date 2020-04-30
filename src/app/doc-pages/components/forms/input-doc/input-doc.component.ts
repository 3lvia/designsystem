import { Component, OnInit, Input } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-input-doc',
  templateUrl: './input-doc.component.html',
  styleUrls: ['./input-doc.component.scss']
})
export class InputDocComponent implements OnInit {

  headerDoes = 'A input should be used';
  headerDonts = 'A label should not be used';

  externalUrl = getComponent('input-doc').externalUrl;
  componentStatus = getComponent('input-doc').status;

  example1 = `<div class="e-form-field">
  <label class="e-form-field__label" for="normal">Normal input field </label>
  <div class="e-input">
    <input id="normal" type="text" placeholder="Placeholder text">
    <i class="e-icon e-icon--email e-icon--xs"></i>
  </div>
</div>
<div class="e-form-field">
  <label class="e-form-field__label" for="disabled">Disabled input field </label>
  <div class="e-input e-input---disabled">
    <input id="disabled" type="text" placeholder="Placeholder text" disabled>
    <i class="e-icon e-icon--email e-icon--xs"></i>
  </div>
</div>

</div>
`;

  example2 = `<div class="e-form-field e-form-field--combined">
  <label class="e-form-field__label" for="phone">Phone</label>
  <div class="e-form-field__input">
    <div id="phone" class="e-input e-input--small">
      <input type="text" value="+47">
    </div>
    <div class="e-input">
      <input type="text" placeholder="Placeholder text">
      <i class="e-icon e-icon--phone e-icon--xs"></i>
    </div>
  </div>
</div>
`;

  example3 = `<div class="e-inlined-field">
  <div class="e-form-field e-form-field--medium">
    <label class="e-form-field__label" for="zip">Zip code</label>
    <div class="e-input">
      <input id="zip" type="text" placeholder="Zip code">
    </div>
  </div>
  <div class="e-form-field">
    <label class="e-form-field__label" for="city">City</label>
    <div class="e-input">
      <input id="city" type="text" placeholder="City">
    </div>
  </div>
</div>
`;

example4 = `<div class="e-form-field">
  <label class="e-form-field__label" for="password">Password input field</label>
  <div class="e-input">
    <input id="password" type="password" placeholder="*******">
    <i class="e-icon e-icon--lock e-icon--xs"></i>
  </div>
</div>
<div class="e-form-field">
  <label class="e-form-field__label" for="invalid">Invalid input field with error-message</label>
  <div class="e-input e-input---invalid">
    <input id="invalid" type="password" value="passord" invalid>
    <i class="e-icon e-icon--lock e-icon--xs"></i>
  </div>
  <span class="e-form-field__error e-form-field__error--visible">
    <i class="e-icon e-icon--alert-circle e-icon--xs"></i>
    Passord må inneholde både bokstaver og tall
  </span>
</div>
`;

example5 = `<div class="e-form-field">
  <label class="e-form-field__label e-form-field__label--optional" for="textarea">Textarea</label>
  <div class="e-input">
    <textarea id="textarea" placeholder="Placeholder text" type="text"></textarea>
  </div>
</div>
`;

example6 = `
<div class="e-form-field">
  <label class="e-form-field__label" for="pseudo-focus">Focus</label>
  <div class="e-input e-input---focus">
    <input id="pseudo-focus" type="text" placeholder="Placeholder text">
  </div>
</div>
<div class="e-form-field">
  <label class="e-form-field__label" for="pseudo-invalid">Invalid</label>
  <div class="e-input e-input---invalid">
    <input id="pseudo-invalid" type="text" placeholder="Placeholder text">
  </div>
</div>
<div class="e-form-field">
  <label class="e-form-field__label" for="pseudo-disabled">Disabled</label>
  <div class="e-input e-input---disabled">
    <input id="pseudo-disabled" type="text" placeholder="Placeholder text">
  </div>
</div>
`;
  constructor() { }

  ngOnInit() {
  }

}

