import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-checkbox-doc',
  templateUrl: './checkbox-doc.component.html',
  styleUrls: ['./checkbox-doc.component.scss'],
})
export class CheckboxDocComponent {
  figmaUrl = getComponent('checkbox').figmaUrl;
  description = getComponent('checkbox').description;
  does = ['When user can select multiple options from a list.', 'Toggle a single option on or off.'];
  donts = ['If the user only can select one option from a list - use radio buttons.'];

  exampleOverview = `<label class="e-checkbox" for="elvis-checkbox">
  <input type="checkbox" id="elvis-checkbox">
  <span class="e-checkbox__mark"></span>
  <span class="e-checkbox__label">Standard</span>
</label>
`;

  exampleStandard = `<label class="e-checkbox" for="elvis-checkbox-standard">
  <input type="checkbox" id="elvis-checkbox-standard">
  <span class="e-checkbox__mark"></span>
  <span class="e-checkbox__label">Standard</span>
</label>
`;

  exampleNested = `<div class="e-form-field">
  <label class="e-checkbox e-checkbox--indeterminate" for="elvis-checkbox-indeterminate">
    <input type="checkbox" id="elvis-checkbox-indeterminate">
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Indeterminate</span>
  </label>
  <div class="e-form-field__nested">
    <label class="e-checkbox" for="elvis-checkbox-nested-checked">
      <input type="checkbox" id="elvis-checkbox-nested-checked" checked>
      <span class="e-checkbox__mark"></span>
      <span class="e-checkbox__label">Checked</span>
    </label>
    <label class="e-checkbox" for="elvis-checkbox-nested">
      <input type="checkbox" id="elvis-checkbox-nested">
      <span class="e-checkbox__mark"></span>
      <span class="e-checkbox__label">Not checked</span>
    </label>
  </div>
</div>
`;

  exampleSizes = `<form>
  <label class="e-form-field__label" for="nested-sm">Medium</label>
  <label class="e-checkbox e-checkbox--indeterminate" for="elvis-checkbox-indeterminate-md">
    <input type="checkbox" id="elvis-checkbox-indeterminate-md">
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Indeterminate</span>
  </label>
  <div class="e-form-field__nested">
    <label class="e-checkbox" for="elvis-checkbox-nested-checked-md">
      <input type="checkbox" id="elvis-checkbox-nested-checked-md" checked>
      <span class="e-checkbox__mark"></span>
      <span class="e-checkbox__label">Checked</span>
    </label>
    <label class="e-checkbox" for="elvis-checkbox-nested-md">
      <input type="checkbox" id="elvis-checkbox-nested-md">
      <span class="e-checkbox__mark"></span>
      <span class="e-checkbox__label">Not checked</span>
    </label>
  </div>
  <div class="e-form-field e-mt-40">
  <label class="e-form-field__label" for="nested-sm">Small</label>
  <label class="e-checkbox e-checkbox--sm e-checkbox--indeterminate" for="elvis-checkbox-indeterminate-sm">
    <input type="checkbox" id="elvis-checkbox-indeterminate-sm">
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Indeterminate</span>
  </label>
  <div class="e-form-field__nested e-form-field__nested--sm">
    <label class="e-checkbox e-checkbox--sm" for="elvis-checkbox-nested-checked-sm">
      <input type="checkbox" id="elvis-checkbox-nested-checked-sm" checked>
      <span class="e-checkbox__mark"></span>
      <span class="e-checkbox__label">Checked</span>
    </label>
    <label class="e-checkbox e-checkbox--sm" for="elvis-checkbox-nested-sm">
      <input type="checkbox" id="elvis-checkbox-nested-sm">
      <span class="e-checkbox__mark"></span>
      <span class="e-checkbox__label">Not checked</span>
    </label>
  </div>
</div>
<form>
`;

  exampleStates = `<label class="e-checkbox e-checkbox---checked" for="elvis-pseudo-checkbox-checked">
  <input type="checkbox" id="elvis-pseudo-checkbox-checked">
  <span class="e-checkbox__mark"></span>
  <span class="e-checkbox__label">Checked</span>
</label>

<label class="e-checkbox e-checkbox---focus" for="elvis-pseudo-checkbox-focus">
  <input type="checkbox" id="elvis-pseudo-checkbox-focus">
  <span class="e-checkbox__mark"></span>
  <span class="e-checkbox__label">Focus</span>
</label>

<label class="e-checkbox e-checkbox---hover" for="elvis-pseudo-checkbox-hover">
  <input type="checkbox" id="elvis-pseudo-checkbox-hover">
  <span class="e-checkbox__mark"></span>
  <span class="e-checkbox__label">Hover</span>
</label>

<label class="e-checkbox e-checkbox---disabled" for="elvis-pseudo-checkbox-disabled">
  <input type="checkbox" id="elvis-pseudo-checkbox-disabled">
  <span class="e-checkbox__mark"></span>
  <span class="e-checkbox__label">Disabled</span>
</label>

<label class="e-checkbox e-checkbox---disabled-checked" for="elvis-pseudo-checkbox-disabled-checked">
  <input type="checkbox" id="elvis-pseudo-checkbox-disabled-checked">
  <span class="e-checkbox__mark"></span>
  <span class="e-checkbox__label">Disabled checked</span>
</label>

<label class="e-checkbox e-checkbox---invalid" for="elvis-pseudo-checkbox-invalid">
  <input type="checkbox" id="elvis-pseudo-checkbox-invalid">
  <span class="e-checkbox__mark"></span>
  <span class="e-checkbox__label">Invalid</span>
</label>

<label class="e-checkbox e-checkbox--indeterminate" for="elvis-pseudo-checkbox-indeterminate">
  <input type="checkbox" id="elvis-pseudo-checkbox-indeterminate">
  <span class="e-checkbox__mark"></span>
  <span class="e-checkbox__label">Indeterminate</span>
</label>
`;
}
