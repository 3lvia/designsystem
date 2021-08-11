import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

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

  exampleOverview = `<label class="e-toggle">
  <input class="e-toggle__input" type="checkbox">
  <span class="e-toggle__slider"></span>
</label>
`;

  example1 = `<div>
  <div class="e-title-caps e-mb-16">Off</div>
  <label class="e-toggle">
    <input class="e-toggle__input" type="checkbox" />
    <span class="e-toggle__slider"></span>
  </label>
</div>
<div class="e-mt-16">
  <div class="e-title-caps e-mb-16">On</div>
  <label class="e-toggle">
    <input class="e-toggle__input" type="checkbox" checked />
    <span class="e-toggle__slider"></span>
  </label>
</div>
<div class="e-mt-16">
  <div class="e-title-caps e-mb-16">Disabled off</div>
  <label class="e-toggle e-toggle---disabled">
    <input class="e-toggle__input" type="checkbox" disabled />
    <span class="e-toggle__slider"></span>
  </label>
</div>
<div class="e-mt-16">
  <div class="e-title-caps e-mb-16">Disabled on</div>
  <label class="e-toggle e-toggle---disabled">
    <input class="e-toggle__input" type="checkbox" checked disabled />
    <span class="e-toggle__slider"></span>
  </label>
</div>
`;

  exampleInverted = `<div>
  <div class="e-text-caps e-mb-16 e-text-white">Off</div>
  <label class="e-toggle e-toggle--inverted">
    <input class="e-toggle__input" type="checkbox">
    <span class="e-toggle__slider"></span>
  </label>
</div>
<div class="e-mt-16">
  <div class="e-text-caps e-mb-16 e-text-white">On</div>
  <label class="e-toggle e-toggle--inverted">
    <input class="e-toggle__input" type="checkbox" checked>
    <span class="e-toggle__slider"></span>
  </label>
</div>
<div class="e-mt-16">
  <div class="e-text-caps e-mb-16 e-text-white">Disabled off</div>
  <label class="e-toggle e-toggle---disabled e-toggle--inverted">
    <input class="e-toggle__input" type="checkbox" disabled>
    <span class="e-toggle__slider"></span>
  </label>
</div>
<div class="e-mt-16">
  <div class="e-text-caps e-mb-16 e-text-white">Disabled on</div>
  <label class="e-toggle e-toggle---disabled e-toggle--inverted">
    <input class="e-toggle__input" type="checkbox" checked disabled>
    <span class="e-toggle__slider"></span>
  </label>
</div>
`;
}
