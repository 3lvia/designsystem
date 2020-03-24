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
`;

  example2 = `<button class="e-btn btn-secondary e-m-2" >
  Standard
</button>
<button class="e-btn btn-secondary e-m-2" disabled >
  Disabled
</button>
`;

  example3 = `<div>
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
</div>
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
