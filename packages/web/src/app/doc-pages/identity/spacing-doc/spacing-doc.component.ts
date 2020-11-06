import { Component } from '@angular/core';
import { getIdentity } from 'src/app/shared/e-items';
import { spacingItems } from './spacing';

@Component({
  selector: 'app-spacing-doc',
  templateUrl: './spacing-doc.component.html',
  styleUrls: ['./spacing-doc.component.scss'],
})
export class SpacingDocComponent {

  spacingItems = spacingItems;
  figmaUrl = getIdentity('spacing').figmaUrl;
  description = getIdentity('spacing').description;

  doCodeCSS = `padding: var(--e-spacing-16);
margin: var(--e-spacing-48);`;
  dontCodeCSS = `padding: var(--e-p-16);
margin:  var(--e-m-48);`;
  example1 = `<span class="e-p-8 e-my-16 e-bg-green example-box unset"></span>
<span class="e-p-16 e-my-16 e-bg-green example-box unset"></span>
<span class="e-p-24 e-my-16 e-bg-green example-box unset"></span>
<span class="e-p-32 e-my-16 e-bg-orange example-box unset"></span>
<span class="e-p-40 e-my-16 e-bg-orange example-box unset"></span>
<span class="e-p-48 e-my-16 e-bg-orange example-box unset"></span>
<span class="e-p-56 e-my-16 e-bg-red example-box unset"></span>
<span class="e-p-64 e-my-16 e-bg-red example-box unset"></span>
<span class="e-p-72 e-my-16 e-bg-red example-box unset"></span>`;
}
