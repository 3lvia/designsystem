import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-button-doc',
  templateUrl: './button-doc.component.html',
  styleUrls: ['./button-doc.component.scss'],
})
export class ButtonDocComponent {

  componentStatus = getComponent('button-doc').status;
  componentClasses = ['e-button', 'e-button is-secondary', 'e-button has-icon', 'e-button is-loading'];
  public clicked = false;

  example1 = `<button class="e-button">Standard</button>
<button class="e-button" disabled>Disabled</button>
`;

  example2 = `<button class="e-button is-secondary">Standard</button>
<button class="e-button is-secondary" disabled>Disabled</button>
`;
  example3 = `<div>
  <button class="e-button has-icon">
    <span class="e-icon-user-white-bg"></span>Icon button
  </button>
  <button class="e-button has-icon" disabled>
    <span class="e-icon-user-white-bg"></span>Icon button
  </button>
</div>
`;

  example4 = `<div class="e-button">
    <div class="loader"></div>
  </div>`;

  constructor() { }

}
