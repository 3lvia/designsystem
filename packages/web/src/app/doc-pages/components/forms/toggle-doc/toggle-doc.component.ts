import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-toggle-doc',
  templateUrl: './toggle-doc.component.html',
  styleUrls: ['./toggle-doc.component.scss'],
})
export class ToggleDocComponent {
  figmaUrl = getComponent('toggle')?.figmaUrl;
  description = getComponent('toggle')?.description;
  title = getComponent('toggle')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  does = ['Single state that is either on or off.'];
  donts = ['Never use a switch in place of a button (actions).'];

  exampleOverview = `<label class="e-toggle">Label
  <input class="e-toggle__input" type="checkbox" role="switch" aria-checked="false" />
</label>`;

  example1 = `<label class="e-toggle e-mt-8">
  Label
  <input class="e-toggle__input" type="checkbox" role="switch" aria-checked="false" />
</label>
<label class="e-toggle e-mt-8">
  Label
  <input class="e-toggle__input" type="checkbox" checked />
</label>
<label class="e-toggle e-mt-8">
  Label
  <input class="e-toggle__input e-toggle---disabled" type="checkbox" role="switch" aria-checked="false" disabled />
</label>
<label class="e-toggle e-mt-8">
  Label
  <input class="e-toggle__input e-toggle---checked e-toggle---disabled" type="checkbox" role="switch" aria-checked="true" checked disabled />
</label>`;

  exampleLabelPosition = `<label class="e-toggle">
  <!-- place the label text _before_ the input element -->
  Week number
  <input class="e-toggle__input" type="checkbox" role="switch" aria-checked="false" />
</label>

<label class="e-toggle e-mt-16">
  <input class="e-toggle__input" type="checkbox" role="switch" aria-checked="false" />
  Week number
  <!-- place the label text _after_ the input element -->
</label>
  `;

  exampleToggleSizeNormal = `<label class="e-toggle">Normal size
  <input class="e-toggle__input" type="checkbox" role="switch" aria-checked="false" />
</label>`;

  exampleToggleSizeCompact = `<label class="e-toggle e-toggle--compact">Compact size
  <input class="e-toggle__input" type="checkbox" role="switch" aria-checked="false" />
</label>`;

  exampleInverted = `<label class="e-toggle e-toggle--inverted" role="switch">
  Label
  <input class="e-toggle__input" type="checkbox" />
</label>
<label class="e-toggle e-toggle--inverted" role="switch">
  Label
  <input class="e-toggle__input" type="checkbox" checked />
</label>
<label class="e-toggle e-toggle--inverted" role="switch">
  Label
  <input class="e-toggle__input" type="checkbox" disabled />
</label>
<label class="e-toggle e-toggle--inverted" role="switch">
  Label
  <input class="e-toggle__input" type="checkbox" checked disabled />
</label>
`;
}
