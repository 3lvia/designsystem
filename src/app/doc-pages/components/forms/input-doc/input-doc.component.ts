import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-input-doc',
  templateUrl: './input-doc.component.html',
  styleUrls: ['./input-doc.component.scss'],
})
export class InputDocComponent {
  headerDoes = 'A input should be used';
  headerDonts = 'A label should not be used';

  figmaUrl = getComponent('input-doc').figmaUrl;
  description = getComponent('input-doc').description;

  showPassword = false;

  does = [
    'Text fields should be used in forms where the user has to fill in something that is not from a set of choices.',
  ];
  donts = [
    'If the user can choose from a set of options, use dropdown, radio buttons, checkboxes, or auto-complete fields instead.',
  ];

  overviewExample = `<div class="e-form-field">
  <label class="e-form-field__label" for="normal">Input field </label>
  <div class="e-input">
    <input id="normal" type="text" placeholder="Placeholder text">
  </div>
</div>
`;

  exampleCompactInput = `<div style="width: 240px;">
  <div class="e-form-field e-form-field--compact">
    <label class="e-form-field__label" for="compact">Label </label>
    <div class="e-input">
      <input id="compact" type="text" placeholder="Placeholder text">
    </div>
  </div>
</div>
`;

  example1 = `<div class="e-form-field">
  <label class="e-form-field__label" for="normal">Normal input field </label>
  <div class="e-input">
    <input id="normal" type="text" placeholder="Placeholder text">
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

  example4 = `<div class="e-form-field e-w-50">
  <label class="e-form-field__label" for="invalid">Invalid input field with error-message</label>
  <div class="e-input e-input---invalid">
    <i
      *ngIf="!showPassword"
      class="e-icon e-icon--view_on e-icon--xs"
      (click)="showMockPassword()"
    ></i>
    <i
      *ngIf="showPassword"
      class="e-icon e-icon--view_off e-icon--xs"
      (click)="showMockPassword()"
    ></i>
    <input id="validationExample" type="password" value="Passord" invalid />
  </div>
  <span class="e-form-field__error e-form-field__error--visible">
    <span>
      <i class="e-icon e-icon--remove_circle e-icon--color-red e-icon--xs"></i>
    </span>
    <span>
      Passord må inneholde både bokstaver og tall
    </span>
  </span>
</div>
`;

  example4TS = `showPassword = false;

showMockPassword() {
  const validationExample = document.getElementById('validationExample');
  if (validationExample.type === 'password') {
    validationExample.type = 'text';
    this.showPassword = true;
  } else {
    validationExample.type = 'password';
    this.showPassword = false;
  }
}`;

  example5 = `<div class="e-form-field">
  <label class="e-form-field__label e-form-field__label--optional" for="textarea">Textarea</label>
  <div class="e-input">
    <textarea id="textarea" placeholder="Placeholder text" type="text"></textarea>
  </div>
</div>
`;

  showMockPassword() {
    const validationExample = document.getElementById('validationExample');
    if (validationExample.type === 'password') {
      validationExample.type = 'text';
      this.showPassword = true;
    } else {
      validationExample.type = 'password';
      this.showPassword = false;
    }
  }
}
