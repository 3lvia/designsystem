import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-checkbox-doc',
  templateUrl: './checkbox-doc.component.html',
  styleUrls: ['./checkbox-doc.component.scss']
})
export class CheckboxDocComponent implements OnInit {

  externalUrl = getComponent('checkbox-doc').externalUrl;
  componentStatus = getComponent('checkbox-doc').status;
  pseudoClasses = ['checked', 'focus', 'hover', 'disabled', 'invalid'];
  does = ['- When user can select multiple options from a list.', 'Toggle a single option on or off.'];
  donts = ['If the user only can select one option from a list - use radio buttons.'];

  example1 = `<form>
  <label class="e-checkbox" for="elvis-checkbox">
    <input type="checkbox" id="elvis-checkbox">
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Normal checkbox</span>
  </label>

  <label class="e-checkbox" for="elvis-checkbox-checked">
    <input type="checkbox" id="elvis-checkbox-checked" checked>
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Checked checkbox</span>
  </label>

  <label class="e-checkbox" for="elvis-checkbox-disabled">
    <input type="checkbox" id="elvis-checkbox-disabled" disabled>
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Disabled checkbox</span>
  </label>

  <label class="e-checkbox" for="elvis-checkbox-invalid">
    <input type="checkbox" id="elvis-checkbox-invalid" required>
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Invalid checkbox</span>
  </label>
<form>
`;
  example2 = `
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

  <label class="e-checkbox e-checkbox---invalid" for="elvis-pseudo-checkbox-invalid">
    <input type="checkbox" id="elvis-pseudo-checkbox-invalid">
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">Invalid</span>
  </label>
`;

  constructor() { }

  ngOnInit() {
  }

}
