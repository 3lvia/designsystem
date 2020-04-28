import { Component, OnInit, Input } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-label-doc',
  templateUrl: './label-doc.component.html',
  styleUrls: ['./label-doc.component.scss']
})
export class LabelDocComponent implements OnInit {

  externalUrl = getComponent('label-doc').externalUrl;
  componentStatus = getComponent('label-doc').status;
  headerDoes = 'Use labels with the item they represent, so its clear which item is indicated.';
  headerDonts = 'Labels are not used alone. Not if there are numeric values in a label, then data-labels should be used.';

  example1 = `<label class="e-label e-m-8">Skjema</label>
<label class="e-label e-m-8">Artikkel</label>
<label class="e-label e-m-8">Rapport</label>
`;

  example2 = `<label class="e-label e-safe e-m-8">Ny</label>
<label class="e-label e-danger e-m-8">Farlig</label>
<label class="e-label e-warn e-m-8">Advarsel</label>
<label class="e-label e-info e-m-8">Info</label>
`;

  constructor() { }

  ngOnInit() {
  }

}
