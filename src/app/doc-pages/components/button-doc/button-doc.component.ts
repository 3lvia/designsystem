import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-button-doc',
  templateUrl: './button-doc.component.html',
  styleUrls: ['./button-doc.component.scss'],
})
export class ButtonDocComponent {

  componentStatus = getComponent('button-doc').status;
  componentClasses = ['e-btn', 'e-btn btn-secondary', 'e-btn has-icon', 'e-btn btn-loading'];
  public clicked = false;

  example1 = `<!-- Style tags are only for examples -->
  <button class="e-btn" style="margin: 10px">
    Standard
  </button>
<button class="e-btn" disabled style="margin: 10px">
  Disabled
</button>
`;

  example2 = `<!-- Style tags are only for examples -->
  <button class="e-btn btn-secondary" style="margin: 10px">
    Standard
  </button>
<button class="e-btn btn-secondary" disabled style="margin: 10px">
  Disabled
</button>
`;

  example3 = `<div>
  <!-- Style tags are only for examples -->
  <button class="e-btn has-icon" style="margin: 10px">
    <span class="e-icon-user-white-bg"></span>Icon button
  </button>
  <button class="e-btn has-icon" disabled style="margin: 10px">
    <span class="e-icon-user-white-bg"></span>Icon button
  </button>
  <br>
  <button class="e-btn btn-secondary has-icon" style="margin: 10px">
    <span class="e-icon-search"></span>Icon button
  </button>
  <button class="e-btn btn-secondary has-icon" disabled style="margin: 10px">
    <span class="e-icon-search-white"></span>Icon button
  </button>
</div>
`;

  example4 = `
  <button class="e-btn btn-loading">
    <span></span>
    <span></span>
    <span></span>
  </button>
  `
  ;

  constructor() { }

}
