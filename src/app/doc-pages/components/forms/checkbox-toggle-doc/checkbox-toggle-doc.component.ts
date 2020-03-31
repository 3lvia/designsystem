import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-checkbox-toggle-doc',
  templateUrl: './checkbox-toggle-doc.component.html',
  styleUrls: ['./checkbox-toggle-doc.component.scss']
})
export class CheckboxToggleDocComponent implements OnInit {

  externalUrl = getComponent('checkbox-toggle-doc').externalUrl;
  componentStatus = getComponent('checkbox-toggle-doc').status;
  pseudoClasses = ['e-toggle', 'e-slider'];

  example1 = `
  <label for="onOff">Turn off or on</label>
  <label class="e-toggle e-m-2">
    <input id="onOff" type="checkbox">
    <span class="e-toggle e-slider"></span>
  </label>
  <label class="e-toggle e-m-2">
    <input id="onOff" type="checkbox" checked>
    <span class="e-toggle e-slider"></span>
  </label>
`;

  constructor() { }

  ngOnInit() {
  }

}
