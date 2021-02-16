import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';
import { exampleContents } from 'src/app/shared/example-contents';

@Component({
  selector: 'app-label-doc',
  templateUrl: './label-doc.component.html',
  styleUrls: ['./label-doc.component.scss'],
})
export class LabelDocComponent {
  examples = exampleContents;
  figmaUrl = getComponent('label').figmaUrl;
  description = getComponent('label').description;
  headerDoes = ['When you need to categorize or view the status of items.'];
  headerDonts = [
    'Do not use label alone without pairing it with an item.',
    "Don't show numeric values ​​in a label, then you should use data labels instead.",
  ];

  exampleOverview = `<label class="e-label">Label</label>
`;

  example1 =
    `<label class="e-label e-m-8">` +
    this.examples.words.categories['eng-GBR'][0] +
    `</label>
<label class="e-label e-m-8">` +
    this.examples.words.categories['eng-GBR'][1] +
    `</label>
<label class="e-label e-m-8">` +
    this.examples.words.categories['eng-GBR'][2] +
    `</label>
`;

  example2 = `<label class="e-label e-label--green e-m-8">New</label>
<label class="e-label e-label--red e-m-8">Dangerous</label>
<label class="e-label e-label--orange e-m-8">Warning</label>
<label class="e-label e-label--blue-berry e-m-8">Info</label>
`;
}
