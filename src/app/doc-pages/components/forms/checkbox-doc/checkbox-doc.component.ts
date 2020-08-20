import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-checkbox-doc',
  templateUrl: './checkbox-doc.component.html',
  styleUrls: ['./checkbox-doc.component.scss'],
})
export class CheckboxDocComponent {
  figmaUrl = getComponent('checkbox-doc').figmaUrl;
  description = getComponent('checkbox-doc').description;
  does = ['When user can select multiple options from a list.', 'Toggle a single option on or off.'];
  donts = ['If the user only can select one option from a list - use radio buttons.'];

  example1 = `<form>
  <label class="e-checkbox" for="elvis-checkbox">
    <input type="checkbox" id="elvis-checkbox">
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Normal</span>
  </label>

  <label class="e-checkbox" for="elvis-checkbox-checked">
    <input type="checkbox" id="elvis-checkbox-checked" checked>
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Checked</span>
  </label>

  <label class="e-checkbox" for="elvis-checkbox-disabled">
    <input type="checkbox" id="elvis-checkbox-disabled" disabled>
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Disabled</span>
  </label>

  <label class="e-checkbox" for="elvis-checkbox-disabled-checked">
    <input type="checkbox" id="elvis-checkbox-disabled-checked" checked disabled>
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Disabled checked</span>
  </label>

  <label class="e-checkbox" for="elvis-checkbox-invalid">
    <input type="checkbox" id="elvis-checkbox-invalid" required>
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Invalid</span>
  </label>
<form>
`;
  example2 = `<form>
  <label class="e-checkbox e-checkbox--sm" for="elvis-checkbox-sm">
    <input type="checkbox" id="elvis-checkbox-sm">
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Normal</span>
  </label>

  <label class="e-checkbox e-checkbox--sm" for="elvis-checkbox-checked-sm">
    <input type="checkbox" id="elvis-checkbox-checked-sm" checked>
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Checked</span>
  </label>

  <label class="e-checkbox e-checkbox--sm" for="elvis-checkbox-disabled-sm">
    <input type="checkbox" id="elvis-checkbox-disabled-sm" disabled>
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Disabled</span>
  </label>

  <label class="e-checkbox e-checkbox--sm" for="elvis-checkbox-disabled-checked-sm">
    <input type="checkbox" id="elvis-checkbox-disabled-checked-sm" checked disabled>
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Disabled checked</span>
  </label>

  <label class="e-checkbox e-checkbox--sm" for="elvis-checkbox-invalid-sm">
    <input type="checkbox" id="elvis-checkbox-invalid-sm" required>
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Invalid</span>
  </label>
<form>
`;
  example3 = `
  <h3>For normal checkboxes</h3>
  <label class="e-checkbox e-checkbox---checked" for="elvis-pseudo-checkbox-checked">
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
    <span class="e-checkbox__label">Disabled</span>
  </label>

  <label class="e-checkbox e-checkbox---invalid" for="elvis-pseudo-checkbox-invalid">
    <input type="checkbox" id="elvis-pseudo-checkbox-invalid">
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Invalid</span>
  </label>

    <h3>For small checkboxes</h3>
  <label class="e-checkbox e-checkbox--sm e-checkbox---checked" for="elvis-pseudo-checkbox-checked-sm">
    <input type="checkbox" id="elvis-pseudo-checkbox-checked-sm">
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Checked</span>
  </label>

  <label class="e-checkbox e-checkbox--sm e-checkbox---focus" for="elvis-pseudo-checkbox-focus-sm">
    <input type="checkbox" id="elvis-pseudo-checkbox-focus-sm">
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Focus</span>
  </label>

  <label class="e-checkbox e-checkbox--sm e-checkbox---hover" for="elvis-pseudo-checkbox-hover-sm">
    <input type="checkbox" id="elvis-pseudo-checkbox-hover-sm">
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Hover</span>
  </label>

  <label class="e-checkbox e-checkbox--sm e-checkbox---disabled" for="elvis-pseudo-checkbox-disabled-sm">
    <input type="checkbox" id="elvis-pseudo-checkbox-disabled-sm">
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Disabled</span>
  </label>

  <label class="e-checkbox e-checkbox--sm e-checkbox---disabled-checked" for="elvis-pseudo-checkbox-disabled-checked-sm">
    <input type="checkbox" id="elvis-pseudo-checkbox-disabled-checked-sm">
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Disabled</span>
  </label>

  <label class="e-checkbox e-checkbox--sm e-checkbox---invalid" for="elvis-pseudo-checkbox-invalid-sm">
    <input type="checkbox" id="elvis-pseudo-checkbox-invalid-sm">
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Invalid</span>
  </label>
`;
}
