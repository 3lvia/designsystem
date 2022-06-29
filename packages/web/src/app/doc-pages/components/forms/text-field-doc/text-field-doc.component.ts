import { Component, ElementRef, ViewChild } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-text-field-doc',
  templateUrl: './text-field-doc.component.html',
  styleUrls: ['./text-field-doc.component.scss'],
})
export class TextFieldDocComponent {
  @ViewChild('validationExample') validationExample: ElementRef;

  showPassword = false;
  figmaUrl = getComponent('text-field').figmaUrl;
  description = getComponent('text-field').description;

  does = [
    'Text fields should be used in forms where the user has to fill in something that is not from a set of choices.',
  ];
  donts = [
    'If the user can choose from a set of options, use dropdown, radio buttons, checkboxes, or auto-complete fields instead.',
  ];

  overviewExample = `<div class="e-form-field">
  <label class="e-form-field__label" for="normal">Label</label>
  <div class="e-text-field">
    <input id="normal" type="text" placeholder="Placeholder text" />
  </div>
</div>
`;

  exampleCompactInput = `<div style="width: 240px;">
  <div class="e-form-field e-form-field--compact">
    <label class="e-form-field__label" for="compact">Label </label>
    <div class="e-text-field">
      <input id="compact" type="text" placeholder="Placeholder text">
    </div>
  </div>
</div>
`;

  exampleInputNoLabel = `<div style="width: 240px;">
  <div class="e-text-field">
    <input id="compact" type="text" placeholder="Placeholder text">
  </div>
</div>
`;

  example1 = `<div class="e-form-field">
  <label class="e-form-field__label" for="normal">Label</label>
  <div class="e-text-field">
    <input id="normal" type="text" placeholder="Placeholder text">
  </div>
</div>
`;

  example2 = `<div class="e-form-field e-form-field--combined">
  <label class="e-form-field__label" for="phone">Phone</label>
  <div class="e-form-field__input">
    <div id="phone" class="e-text-field e-text-field--small">
      <input type="text" value="+47">
    </div>
    <div class="e-text-field">
      <input type="text" placeholder="99 99 99 99">
    </div>
  </div>
</div>

<div class="e-inlined-field e-mt-24">
  <div class="e-form-field e-form-field--medium">
    <label class="e-form-field__label" for="zip">Zip code
    </label>
    <div class="e-text-field">
      <input id="zip" type="text" placeholder="Zip code">
    </div>
  </div>
  <div class="e-form-field">
    <label class="e-form-field__label" for="city">City</label>
    <div class="e-text-field">
      <input id="city" type="text" placeholder="City">
    </div>
  </div>
</div>
`;

  example4 = ` <div class="e-form-field">
  <label class="e-form-field__label" for="invalid">Invalid input field with error-message</label>
  <div class="e-text-field e-text-field---invalid">
    <button class="e-btn e-btn--icon" (click)="showMockPassword()" aria-label="Vis/skjul passord">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--view_on"  aria-hidden="true"></i>
      </span>
    </button>
    <input id="validationExample" type="password" value="Passord" required invalid #validationExample />
  </div>
  <span class="e-form-field__error e-form-field__error--visible">
    <span>
      <i class="e-icon e-icon--remove_circle e-icon--color-red e-icon--xs"  aria-hidden="true"></i>
    </span>
    <span>Passord må inneholde både bokstaver og tall</span>
  </span>
</div>
`;

  example4TS = `@ViewChild('validationExample') validationExample: ElementRef;
showPassword = false;
showMockPassword() {
  if (this.validationExample.nativeElement.type === 'password') {
    this.validationExample.nativeElement.type = 'text';
    this.showPassword = true;
  } else {
    this.validationExample.nativeElement.type = 'password';
    this.showPassword = false;
  }
}`;

  example5 = `<div class="e-form-field">
  <label class="e-form-field__label e-form-field__label--optional" for="textarea">Label</label>
  <div class="e-text-field">
    <textarea id="textarea" placeholder="Placeholder text" type="text"></textarea>
  </div>
</div>
`;

  exampleOptional = `<div class="e-form-field">
  <label class="e-form-field__label e-form-field__label--optional" for="normal">Label</label>
  <div class="e-text-field">
    <input id="normal" type="text" placeholder="Placeholder text" />
  </div>
</div>
`;

  exampleIcon = ` <div class="e-form-field">
  <label class="e-form-field__label" for="iconExample">Password</label>
  <div class="e-text-field">
    <button class="e-btn e-btn--icon" aria-label="Vis/skjul passord">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--view_on"  aria-hidden="true"></i>
      </span>
    </button>
    <input id="iconExample" type="password" value="Passord" />
  </div>
</div>
`;

  showMockPassword(): void {
    if (this.validationExample.nativeElement.type === 'password') {
      this.validationExample.nativeElement.type = 'text';
      this.showPassword = true;
    } else {
      this.validationExample.nativeElement.type = 'password';
      this.showPassword = false;
    }
  }
}
