import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-toggle-doc',
  templateUrl: './toggle-doc.component.html',
  styleUrls: ['./toggle-doc.component.scss'],
})
export class ToggleDocComponent {
  figmaUrl = getComponent('toggle').figmaUrl;
  description = getComponent('toggle').description;
  title = getComponent('toggle').title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  does = ['Single state that is either on or off.'];
  donts = ['Never use a switch in place of a button (actions).'];

  exampleOverview = `<label class="e-toggle">Label
  <input class="e-toggle__input" type="checkbox" role="switch" aria-checked="false" />
</label>`;

  example1 = `<div class="e-title-caps">Off</div>
<label class="e-toggle">
  Label
  <input class="e-toggle__input" type="checkbox" role="switch" aria-checked="false" />
</label>
<div class="e-title-caps e-mt-24 e-mb-8">On</div>
<label class="e-toggle">
  Label
  <input class="e-toggle__input" type="checkbox" checked />
</label>
<div class="e-title-caps e-mt-24 e-mb-8">Disabled off</div>
<label class="e-toggle">
  Label
  <input class="e-toggle__input e-toggle---disabled" type="checkbox" role="switch" aria-checked="false" disabled />
</label>
<div class="e-title-caps e-mt-24 e-mb-8">Disabled on</div>
<label class="e-toggle">
  Label
  <input class="e-toggle__input e-toggle---checked e-toggle---disabled" type="checkbox" role="switch" aria-checked="true" checked disabled />
</label>`;

  exampleLabelPosition = `<div class="e-title-caps e-mb-8">Label left</div>
<label class="e-toggle">
  <!-- place the label text _before_ the input element -->
  Week number
  <input class="e-toggle__input" type="checkbox" role="switch" aria-checked="false" />
</label>

<div class="e-title-caps e-mt-24 e-mb-8">Label right</div>
<label class="e-toggle">
  <input class="e-toggle__input" type="checkbox" role="switch" aria-checked="false" />
  Week number
  <!-- place the label text _after_ the input element -->
</label>
  `;

  exampleNoLabel = `<div class="e-title-caps e-mb-8">No label</div>
<label class="e-toggle">
  <input class="e-toggle__input" type="checkbox" role="switch" aria-checked="false" aria-label="bryter uten etikett" />
</label>`;

  exampleToggleSizeNormal = `<label class="e-toggle">Normal size
  <input class="e-toggle__input" type="checkbox" role="switch" aria-checked="false" />
</label>`;

  exampleToggleSizeCompact = `<label class="e-toggle e-toggle--compact">Compact size
  <input class="e-toggle__input" type="checkbox" role="switch" aria-checked="false" />
</label>`;

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
