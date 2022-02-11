import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-toggle-doc',
  templateUrl: './toggle-doc.component.html',
  styleUrls: ['./toggle-doc.component.scss'],
})
export class ToggleDocComponent {
  figmaUrl = getComponent('toggle').figmaUrl;
  description = getComponent('toggle').description;

  does = ['Single state that is either on or off.'];
  donts = ['Never use a switch in place of a button (actions).'];

  exampleOverview = `<div class="e-toggle" role="switch">
  <label class="e-toggle__label" for="toggle-1">Toggle</label>
  <input class="e-toggle__input" type="checkbox" id="toggle-1" />
</div>
`;

  example1 = `<div class="e-toggle" role="switch">
  <label class="e-toggle__label" for="toggle-2">Off</label>
  <input class="e-toggle__input" type="checkbox" id="toggle-2" />
</div>
<div class="e-toggle e-mt-16" role="switch">
  <label class="e-toggle__label" for="toggle-3">On</label>
  <input class="e-toggle__input" type="checkbox" id="toggle-3" checked />
</div>
<div class="e-toggle e-mt-16" role="switch">
  <label class="e-toggle__label" for="toggle-4">Disabled off</label>
  <input class="e-toggle__input" type="checkbox" id="toggle-4" disabled />
</div>
<div class="e-toggle e-mt-16" role="switch">
  <label class="e-toggle__label" for="toggle-5">Disabled on</label>
  <input class="e-toggle__input" type="checkbox" id="toggle-5" checked disabled />
</div>
`;

  exampleInverted = `<div class="e-toggle e-toggle--inverted" role="switch">
  <label class="e-toggle__label" for="toggle-2">Off</label>
  <input class="e-toggle__input" type="checkbox" id="toggle-2" />
</div>
<div class="e-toggle e-toggle--inverted e-mt-16" role="switch">
  <label class="e-toggle__label" for="toggle-3">On</label>
  <input class="e-toggle__input" type="checkbox" id="toggle-3" checked />
</div>
<div class="e-toggle e-toggle--inverted e-mt-16" role="switch">
  <label class="e-toggle__label" for="toggle-4">Disabled off</label>
  <input class="e-toggle__input" type="checkbox" id="toggle-4" disabled />
</div>
<div class="e-toggle e-toggle--inverted e-mt-16" role="switch">
  <label class="e-toggle__label" for="toggle-5">Disabled on</label>
  <input class="e-toggle__input" type="checkbox" id="toggle-5" checked disabled />
</div>
`;
}
