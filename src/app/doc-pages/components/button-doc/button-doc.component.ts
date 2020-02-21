import { Component, ViewEncapsulation } from '@angular/core';
import { getComponent } from 'src/app/shared/elvis-items';

@Component({
  selector: 'app-button-doc',
  templateUrl: './button-doc.component.html',
  styleUrls: ['./button-doc.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonDocComponent {

  componentStatus = getComponent('button-doc').status;
  componentClasses = ['.elvis-button'];
  public clicked = false;

  example1 = `<button class="elvis-button">Standard</button>
<button class="elvis-button" disabled>Disabled</button>
`;

  example2 = `<button class="elvis-button is-secondary">Standard</button>
<button class="elvis-button is-secondary" disabled>Disabled</button>
`;

  example3 = `<div>
  <button class="elvis-button has-icon">
    <span class="some-icon"></span>Icon button
  </button>
  <button class="elvis-button has-icon" disabled>
    <span class="some-icon"></span>Icon button
  </button>
</div>
<div style="margin-top:8px;">
  <button class="elvis-button has-icon is-danger">
    <span class="some-icon"></span>Slett button
  </button>
  <button class="elvis-button has-icon is-danger" disabled>
    <span class="some-icon"></span>Slett button
  </button>
</div>
<div style="margin-top:8px;">
  <button class="elvis-button has-icon is-secondary">
    <span class="some-icon"></span>Icon button
  </button>
  <button class="elvis-button has-icon is-secondary" disabled>
    <span class="some-icon"></span>Icon button
  </button>
</div>
<div style="margin-top:8px;">
  <button class="elvis-button has-icon is-transparent">
    <span class="some-icon"></span>Icon button
  </button>
  <button class="elvis-button has-icon is-transparent" disabled>
    <span class="some-icon"></span>Icon button
  </button>
</div>
`;

  constructor() { }

}
