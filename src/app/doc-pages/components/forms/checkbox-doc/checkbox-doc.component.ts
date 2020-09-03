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

  exampleOverview = `<label class="e-checkbox" for="elvis-checkbox">
  <input type="checkbox" id="elvis-checkbox">
  <span class="e-checkbox__mark"></span>
  <span class="e-checkbox__label">Normal</span>
</label>
`;

  exampleSizes = `<form>
  <label class="e-checkbox" for="elvis-checkbox-md">
    <input type="checkbox" id="elvis-checkbox-md">
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Medium</span>
  </label>
  <label class="e-checkbox e-checkbox--sm" for="elvis-checkbox-sm">
    <input type="checkbox" id="elvis-checkbox-sm">
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Small</span>
  </label>
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
  <span class="e-checkbox__label">Disabled</span>
</label>

<label class="e-checkbox e-checkbox---invalid" for="elvis-pseudo-checkbox-invalid">
  <input type="checkbox" id="elvis-pseudo-checkbox-invalid">
  <span class="e-checkbox__mark"></span>
  <span class="e-checkbox__label">Invalid</span>
</label>
`;
}
