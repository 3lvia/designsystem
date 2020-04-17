import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-button-doc',
  templateUrl: './button-doc.component.html',
  styleUrls: ['./button-doc.component.scss'],
})
export class ButtonDocComponent {

  externalUrl = getComponent('button-doc').externalUrl;
  componentStatus = getComponent('button-doc').status;

  eBtn: ['e-btn'];

  pseudoClasses = ['e-hover', 'e-active', 'e-focus', 'e-disabled'];
  public clicked = false;

  example1 = `<button class="e-btn e-m-16" >
  Standard
</button>
<button class="e-btn e-m-16" disabled >
  Disabled
</button>`;


  example2 = `<button class="e-btn e-btn-secondary e-m-16" >
  Standard
</button>
<button class="e-btn e-btn-secondary e-m-16" disabled >
  Disabled
</button>`;

  example3 = `
<button class="e-btn e-has-icon e-m-16" >
  <span class="e-icon-user"></span>Icon button
</button>
<button class="e-btn e-has-icon e-m-16" disabled >
  <span class="e-icon-user"></span>Icon button
</button>
<br>
<button class="e-btn e-btn-secondary e-has-icon e-m-16" >
  <span class="e-icon-search"></span>Icon button
</button>
<button class="e-btn e-btn-secondary e-has-icon e-m-16" disabled >
  <span class="e-icon-search"></span>Icon button
</button>`;

  example4 = `<button class="e-btn e-btn-loading e-m-16">
  <span></span>
  <span></span>
  <span></span>
</button>
`;

  example5 = `
<button class="e-btn e-hover e-m-16" >
  Hover
</button>

<button class="e-btn e-active e-m-16" >
  Active
</button>

<button class="e-btn e-focus e-m-16" >
  Focus
</button>

<button class="e-btn e-disabled e-m-16" >
  Disabled
</button>
`;

  constructor() { }

}
