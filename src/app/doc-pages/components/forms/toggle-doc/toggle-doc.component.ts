import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-toggle-doc',
  templateUrl: './toggle-doc.component.html',
  styleUrls: ['./toggle-doc.component.scss'],
})
export class ToggleDocComponent {
  figmaUrl = getComponent('toggle-doc').figmaUrl;

  does = ['Single state that is either on or off.'];
  donts = ['Never use a switch in place of a button (actions).'];

  example1 = `<div>
  <h3>Off</h3>
  <label class="e-toggle">
    <input class="e-toggle__input" type="checkbox">
    <span class="e-toggle__slider"></span>
  </label>
</div>
<div class="e-mt-16">
  <h3>On</h3>
  <label class="e-toggle">
    <input class="e-toggle__input" type="checkbox" checked>
    <span class="e-toggle__slider"></span>
  </label>
</div>
<div class="e-mt-16">
  <h3>Disabled off</h3>
  <label class="e-toggle e-toggle--disabled">
    <input class="e-toggle__input" type="checkbox" disabled>
    <span class="e-toggle__slider"></span>
  </label>
</div>
<div class="e-mt-16">
  <h3>Disabled on</h3>
  <label class="e-toggle e-toggle--disabled">
    <input class="e-toggle__input" type="checkbox" checked disabled>
    <span class="e-toggle__slider"></span>
  </label>
</div>
`;
}
