import { Component, ViewEncapsulation } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-button-doc',
  templateUrl: './button-doc.component.html',
  styleUrls: ['./button-doc.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonDocComponent {

  componentStatus = getComponent('button-doc').status;
  componentClasses = ['.e-button'];
  public clicked = false;

  example1 = `<button class="e-button">Standard</button>
<button class="e-button" disabled>Disabled</button>
`;

  example2 = `<button class="e-button is-secondary">Standard</button>
<button class="e-button is-secondary" disabled>Disabled</button>
`;

  example3 = `<div>
  <button class="e-button has-icon">
    <span class="some-icon"></span>Icon button
  </button>
  <button class="e-button has-icon" disabled>
    <span class="some-icon"></span>Icon button
  </button>
</div>
<div style="margin-top:8px;">
  <button class="e-button has-icon is-danger">
    <span class="some-icon"></span>Slett button
  </button>
  <button class="e-button has-icon is-danger" disabled>
    <span class="some-icon"></span>Slett button
  </button>
</div>
<div style="margin-top:8px;">
  <button class="e-button has-icon is-secondary">
    <span class="some-icon"></span>Icon button
  </button>
  <button class="e-button has-icon is-secondary" disabled>
    <span class="some-icon"></span>Icon button
  </button>
</div>
<div style="margin-top:8px;">
  <button class="e-button has-icon is-transparent">
    <span class="some-icon"></span>Icon button
  </button>
  <button class="e-button has-icon is-transparent" disabled>
    <span class="some-icon"></span>Icon button
  </button>
</div>
`;

  constructor() { }

}
