import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-input-doc',
  templateUrl: './input-doc.component.html',
  styleUrls: ['./input-doc.component.scss']
})
export class InputDocComponent {

  headerDoes = 'A input should be used';
  headerDonts = 'A label should not be used';

  externalUrl = getComponent('input-doc').externalUrl;
  componentStatus = getComponent('input-doc').status;
  does = ['Text fields should be used in forms where the user has to fill in something that is not from a set of choices.'];
  donts = ['If the user can choose from a set of options, use dropdown, radio buttons, checkboxes, or auto-complete fields instead.'];

  example1 = `<div class="e-form-field">
  <label class="e-form-field__label" for="normal">Normal input field </label>
  <div class="e-input">
    <span><i class="e-icon e-icon--mail e-icon--xs"></i></span>
    <input id="normal" type="text" placeholder="Placeholder text">
  </div>
</div>
<div class="e-form-field">
  <label class="e-form-field__label" for="disabled">Disabled input field </label>
  <div class="e-input e-input---disabled">
    <span><i class="e-icon e-icon--mail e-icon--xs e-icon--color-disabled"></i></span>
    <input id="disabled" type="text" placeholder="Placeholder text" disabled>
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
      <span><i class="e-icon e-icon--phone e-icon--xs"></i></span>
      <input type="text" placeholder="Placeholder text">
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
    <span><i class="e-icon e-icon--lock e-icon--xs"></i></span>
    <input id="password" type="password" placeholder="*******">
  </div>
</div>
<div class="e-form-field">
  <label class="e-form-field__label" for="invalid">Invalid input field with error-message</label>
  <div class="e-input e-input---invalid">
    <span><i class="e-icon e-icon--lock e-icon--xs"></i></span>
    <input id="invalid" type="password" value="passord" invalid>
  </div>
  <span class="e-form-field__error e-form-field__error--visible">
    <span>
      <i class="e-icon e-icon--warning_circle e-icon--xs"></i>
    </span>
    <span>
      Passord må inneholde både bokstaver og tall
    </span>
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

}

