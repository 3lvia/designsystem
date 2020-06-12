import {Component} from '@angular/core';
import {getComponent} from 'src/app/shared/e-items';

@Component({
  selector: 'app-checkbox-toggle-doc',
  templateUrl: './checkbox-toggle-doc.component.html',
  styleUrls: ['./checkbox-toggle-doc.component.scss'],
})
export class CheckboxToggleDocComponent {
  externalUrl = getComponent('checkbox-toggle-doc').externalUrl;
  componentStatus = getComponent('checkbox-toggle-doc').status;

  example1 = `<div>
  <h3>Normal toggle</h3>
  <label class="e-toggle">
    <input class="e-toggle__input" type="checkbox">
    <span class="e-toggle__slider"></span>
  </label>
</div>
<div class="e-mt-16">
  <h3>Normal toggle checked</h3>
  <label class="e-toggle">
    <input class="e-toggle__input" type="checkbox" checked>
    <span class="e-toggle__slider"></span>
  </label>
</div>
`;
}
