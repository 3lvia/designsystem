import { Component, Input } from '@angular/core';
import { TabNames } from 'src/app/shared/tab-names.enums';
import { getUtilities } from 'src/app/shared/e-items';
import { primaryColors, signalColors, dataColors, greysColors } from './color';

@Component({
  selector: 'app-color-doc',
  templateUrl: './color-doc.component.html',
  styleUrls: ['./color-doc.component.scss']
})
export class ColorDocComponent {

  @Input() selected = TabNames.Overview;

  primaryColors = primaryColors;
  signalColors = signalColors;
  dataColors = dataColors;
  greysColors = greysColors;
  externalUrl = getUtilities('color-doc').externalUrl;
  componentStatus = getUtilities('color-doc').status;
  tabNames = TabNames;
  tabs = [TabNames.Overview, TabNames.Code, TabNames.Guidelines];
  colors: string[] = ['red', 'green'];

  doCode = `<div class="e-bg-green"></div>`;
  dontCode = `<div class="e-bg-green e-text-grey"></div>`;
  doCodeCSS = `background: var(--e-green);
color: var(--e-red);`;
  dontCodeCSS = `background: var(--e-bg-green);
color: var(--e-text-red);`;
  example1 = `<span class="e-bg-green e-mb-16 e-mt-16 e-p-16 example-box">Text</span>
<span class="e-bg-yellow e-mb-16 e-mt-16 e-p-16 example-box">Text</span>
<span class="e-bg-orange e-mb-16 e-mt-16 e-p-16 example-box">Text</span>
<span class="e-bg-red e-mb-16 e-mt-16 e-p-16 example-box">Text</span>
<span class="e-bg-black e-mb-16 e-mt-16 e-p-16 example-box">Text</span>`;

}
