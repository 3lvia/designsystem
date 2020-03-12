import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-button-doc',
  templateUrl: './button-doc.component.html',
  styleUrls: ['./button-doc.component.scss'],
})
export class ButtonDocComponent {

  componentStatus = getComponent('button-doc').status;
  componentClasses = ['e-button', 'e-button is-secondary', 'e-button has-icon', 'e-button loading'];
  public clicked = false;

  example1 = `<!-- Style tags are only for examples -->
  <button class="e-button" style="margin: 10px">
    Standard
  </button>
<button class="e-button" disabled style="margin: 10px">
  Disabled
</button>
`;

  example2 = `<!-- Style tags are only for examples -->
  <button class="e-button is-secondary" style="margin: 10px">
    Standard
  </button>
<button class="e-button is-secondary" disabled style="margin: 10px">
  Disabled
</button>
`;

  example3 = `<div>
  <!-- Style tags are only for examples -->
  <button class="e-button has-icon" style="margin: 10px">
    <span class="e-icon-user-white-bg"></span>Icon button
  </button>
  <button class="e-button has-icon" disabled style="margin: 10px">
    <span class="e-icon-user-white-bg"></span>Icon button
  </button>
  <button class="e-button is-secondary has-icon" style="margin: 10px">
    <span class="e-icon-search"></span>Icon button
  </button>
  <button class="e-button is-secondary has-icon" disabled style="margin: 10px">
    <span class="e-icon-search"></span>Icon button
  </button>
</div>
`;

  example4 = `
  <button class="e-button loading">
    <span></span>
    <span></span>
    <span></span>
  </button>
  `
  ;

  constructor() { }

}
