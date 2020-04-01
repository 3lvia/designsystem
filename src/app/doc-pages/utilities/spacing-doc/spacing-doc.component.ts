import { Component, OnInit, Input } from '@angular/core';
import { TabNames } from 'src/app/shared/tab-names.enums';
import { getUtilities } from 'src/app/shared/e-items';
import { spacingItems } from './spacing';

@Component({
  selector: 'app-spacing-doc',
  templateUrl: './spacing-doc.component.html',
  styleUrls: ['./spacing-doc.component.scss']
})
export class SpacingDocComponent implements OnInit {

  @Input() selected = TabNames.Overview;

  spacingItems = spacingItems;
  tabNames = TabNames;
  tabs = [TabNames.Overview, TabNames.Code, TabNames.Guidelines];
  componentClasses = ['e-p', 'e-m'];
  componentStatus = getUtilities('spacing-doc').status;
  externalUrl = getUtilities('spacing-doc').externalUrl;

  doCodeCSS = `padding: var(--e-spacing-2);
margin: var(--e-spacing-6);`;
  dontCodeCSS = `padding: var(--e-p-2);
margin:  var(--e-m-6);`;
  example1 = `<span class="e-p-1 e-mt-2 e-mb-2 e-bg-green example-box unset"></span>
<span class="e-p-2 e-mt-2 e-mb-2 e-bg-green example-box unset"></span>
<span class="e-p-3 e-mt-2 e-mb-2 e-bg-green example-box unset"></span>
<span class="e-p-4 e-mt-2 e-mb-2 e-bg-orange example-box unset"></span>
<span class="e-p-5 e-mt-2 e-mb-2 e-bg-orange example-box unset"></span>
<span class="e-p-6 e-mt-2 e-mb-2 e-bg-orange example-box unset"></span>`;

  constructor() { }

  ngOnInit() {
  }

}
