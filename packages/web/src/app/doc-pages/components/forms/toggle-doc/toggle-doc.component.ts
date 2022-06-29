import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-toggle-doc',
  templateUrl: './toggle-doc.component.html',
})
export class ToggleDocComponent {
  figmaUrl = getComponent('toggle').figmaUrl;
  description = getComponent('toggle').description;

  does = ['Single state that is either on or off.'];
  donts = ['Never use a switch in place of a button (actions).'];

  exampleOverview = `<label class="e-toggle" role="switch">Label
  <input class="e-toggle__input" type="checkbox" />
</label>
`;

  example1 = `<div class="e-title-caps">Off</div>
<label class="e-toggle" role="switch">
  Label
  <input class="e-toggle__input" type="checkbox" />
</label>
<div class="e-title-caps e-mt-24 e-mb-8">On</div>
<label class="e-toggle" role="switch">
  Label
  <input class="e-toggle__input" type="checkbox" checked />
</label>
<div class="e-title-caps e-mt-24 e-mb-8">Disabled off</div>
<label class="e-toggle" role="switch">
  Label
  <input class="e-toggle__input" type="checkbox" disabled />
</label>
<div class="e-title-caps e-mt-24 e-mb-8">Disabled on</div>
<label class="e-toggle" role="switch">
  Label
  <input class="e-toggle__input" type="checkbox" checked disabled />
</label>
`;

  exampleInverted = `<div class="e-title-caps">Off</div>
<label class="e-toggle e-toggle--inverted" role="switch">
  Label
  <input class="e-toggle__input" type="checkbox" />
</label>
<div class="e-title-caps e-mt-24 e-mb-8">On</div>
<label class="e-toggle e-toggle--inverted" role="switch">
  Label
  <input class="e-toggle__input" type="checkbox" checked />
</label>
<div class="e-title-caps e-mt-24 e-mb-8">Disabled off</div>
<label class="e-toggle e-toggle--inverted" role="switch">
  Label
  <input class="e-toggle__input" type="checkbox" disabled />
</label>
<div class="e-title-caps e-mt-24 e-mb-8">Disabled on</div>
<label class="e-toggle e-toggle--inverted" role="switch">
  Label
  <input class="e-toggle__input" type="checkbox" checked disabled />
</label>
`;
}
