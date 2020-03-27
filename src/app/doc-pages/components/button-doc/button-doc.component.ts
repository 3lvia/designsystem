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

  example1 = `<button class="e-btn e-m-2" >
  Standard
</button>
<button class="e-btn e-m-2" disabled >
  Disabled
</button>

<h3>Pseudo-classes</h3>

<button class="e-btn hover e-m-2" >
  Hover
</button>

<button class="e-btn active e-m-2" >
  Active
</button>

<button class="e-btn focus e-m-2" >
  Focus
</button>

<button class="e-btn disabled e-m-2" >
  Disabled
</button>
`;


  example2 = `<button class="e-btn btn-secondary e-m-2" >
  Standard
</button>
<button class="e-btn btn-secondary e-m-2" disabled >
  Disabled
</button>

<h3>Pseudo-classes</h3>

<button class="e-btn btn-secondary hover e-m-2" >
  hover
</button>

<button class="e-btn btn-secondary active e-m-2" >
  Active
</button>

<button class="e-btn btn-secondary focus e-m-2" >
  Focus
</button>

<button class="e-btn btn-secondary disabled e-m-2" >
  Disabled
</button>
`;

  example3 = `
<button class="e-btn has-icon e-m-2" >
  <span class="e-icon-user-white-bg"></span>Icon button
</button>
<button class="e-btn has-icon e-m-2" disabled >
  <span class="e-icon-user-white-bg"></span>Icon button
</button>
<br>
<button class="e-btn btn-secondary has-icon e-m-2" >
  <span class="e-icon-search"></span>Icon button
</button>
<button class="e-btn btn-secondary has-icon e-m-2" disabled >
  <span class="e-icon-search-white"></span>Icon button
</button>

<h3>Pseudo-classes</h3>

<button class="e-btn has-icon hover e-m-2">
  <span class="e-icon-user-white-bg"></span>hover
</button>
<button class="e-btn has-icon active e-m-2">
  <span class="e-icon-user-white-bg"></span>active
</button>
<br>
<button class="e-btn has-icon focus e-m-2">
  <span class="e-icon-user-white-bg"></span>focus
</button>
<button class="e-btn has-icon disabled e-m-2">
  <span class="e-icon-user-white-bg"></span>disabled
</button>
<br>
<button class="e-btn btn-secondary has-icon hover e-m-2">
  <span class="e-icon-user"></span>hover
</button>
<button class="e-btn btn-secondary has-icon active e-m-2">
  <span class="e-icon-user"></span>active
</button>
<br>
<button class="e-btn btn-secondary has-icon focus e-m-2">
  <span class="e-icon-user"></span>focus
</button>
<button class="e-btn btn-secondary has-icon disabled e-m-2">
  <span class="e-icon-user-white-bg"></span>disabled
</button>
`;

  example4 = `<button class="e-btn btn-loading e-m-2">
  <span></span>
  <span></span>
  <span></span>
</button>
`
  ;

  constructor() { }

}
