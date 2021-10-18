import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { primaryColors, signalColors, dataColors, greysColors } from './color';

@Component({
  selector: 'app-color-doc',
  templateUrl: './color-doc.component.html',
  styleUrls: ['./color-doc.component.scss'],
})
export class ColorDocComponent {
  primaryColors = primaryColors;
  signalColors = signalColors;
  dataColors = dataColors;
  greysColors = greysColors;
  figmaUrl = getDocPagesNotFromCMS('color').figmaUrl;
  description = getDocPagesNotFromCMS('color').description;
  colors: string[] = ['red', 'green'];

  doCode = `<div class="e-bg-green"></div>`;
  dontCode = `<div class="e-bg-green e-text-grey"></div>`;
  doCodeCSS = `background: var(--e-green);
color: var(--e-red);`;
  dontCodeCSS = `background: var(--e-bg-green);
color: var(--e-text-red);`;
}
