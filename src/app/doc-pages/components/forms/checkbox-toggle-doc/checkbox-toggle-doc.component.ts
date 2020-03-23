import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-checkbox-toggle-doc',
  templateUrl: './checkbox-toggle-doc.component.html',
  styleUrls: ['./checkbox-toggle-doc.component.scss']
})
export class CheckboxToggleDocComponent implements OnInit {

  componentStatus = getComponent('checkbox-toggle-doc').status;
  componentClasses = ['e-toggle', 'e-toggle slider'];

  example1 = `
  <label for="onOff">Turn off or on</label>
  <label class="e-toggle e-m-2">
    <input id="onOff" type="checkbox">
    <span class="e-toggle slider"></span>
  </label>
  <label class="e-toggle e-m-2">
    <input id="onOff" type="checkbox" checked>
    <span class="e-toggle slider"></span>
  </label>
`;

  constructor() { }

  ngOnInit() {
  }

}
