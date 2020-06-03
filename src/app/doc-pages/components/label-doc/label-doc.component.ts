import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-label-doc',
  templateUrl: './label-doc.component.html',
  styleUrls: ['./label-doc.component.scss']
})
export class LabelDocComponent {

  externalUrl = getComponent('label-doc').externalUrl;
  componentStatus = getComponent('label-doc').status;
  headerDoes = ['When you need to categorize or view the status of items.'];
  headerDonts = ['Do not use label alone without pairing it with an item.',
  'Don\'t show numeric values ​​in a label, then you should use data labels instead.'];

  example1 = `<label class="e-label e-m-8">Skjema</label>
<label class="e-label e-m-8">Artikkel</label>
<label class="e-label e-m-8">Rapport</label>
`;

  example2 = `<label class="e-label e-label--green-apple e-m-8">Green apple</label>
<label class="e-label e-label--red-tomato e-m-8">Red Tomato</label>
<label class="e-label e-label--orange-mango e-m-8">Orange Mango</label>
<label class="e-label e-label--purple-plum e-m-8">Purple Plum</label>
<label class="e-label e-label--violet-grape e-m-8">Violet Grape</label>
<label class="e-label e-label--blue-berry e-m-8">Blue Berry</label>
`;

}
