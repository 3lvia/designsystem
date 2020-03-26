import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-table-doc',
  templateUrl: './table-doc.component.html',
  styleUrls: ['./table-doc.component.scss']
})
export class TableDocComponent implements OnInit {

  componentStatus = getComponent('table-doc').status;
  componentClasses = ['e-table', 'e-table-phone'];

  example1 = `<table class="e-table">
  <tr class="e-table_header">
    <th>Gebyr for ikke-automatiske strømmålere</th>
    <th>Nok</th>
  </tr>
  <tr>
    <td>Administrativt arbeid i kundesystemet</td>
    <td>420</td>
  </tr>
  <tr>
    <td>Informasjon og purring til kunder</td>
    <td>65</td>
  </tr>
  <tr>
    <td>Arbeid relatert til booking av avlesning</td>
    <td>140</td>
  </tr>
  <tr>
    <td>Årlig kontrollavlesning hos kunde, inkl. kjøring</td>
    <td>850</td>
  </tr>
  <tr>
    <td>Arbeidsledelse og planlegging</td>
    <td>150</td>
  </tr>
  <tr>
    <td>Fradrag for besparelser i AMS-kostnader</td>
    <td>-25</td>
  </tr>
  <tr>
    <td>Årlig gebyr eks. MVA</td>
    <td>1600</td>
  </tr>
  <tr>
    <td>Merverdiavgift (25%)</td>
    <td>400</td>
  </tr>
  <tr>
    <td>Årlig gebyr inkl. MVA</td>
    <td>2000</td>
  </tr>
</table>
`;

  example2 = `<table class="e-table">
  <tr class="e-table_header">
    <th>Sikringsstørrelse</th>
    <th>230 V (2-fase)</th>
    <th>230 V (3-fase)</th>
    <th>400 V (1-fase)</th>
    <th>400 V (3-fase)</th>
  </tr>
  <tr>
    <td>16 A</td>
    <td>340 kr/mnd</td>
    <td>1065 kr/mnd</td>
    <td>900 kr/mnd</td>
    <td>900 kr/mnd</td>
  </tr>
  <tr>
    <td>32 A</td>
    <td>150 kr/kW/mnd</td>
    <td>150 kr/kW/mnd</td>
    <td>122 kr/kW/mnd</td>
    <td>122 kr/kW/mnd</td>
  </tr>
  <tr>
    <td>40 A</td>
    <td>80 kr/kW/mnd</td>
    <td>80 kr/kW/mnd</td>
    <td>52 kr/kW/mnd</td>
    <td>52 kr/kW/mnd</td>
  </tr>
  <tr>
    <td>50 A</td>
    <td>23 kr/kW/mnd</td>
    <td>23 kr/kW/mnd</td>
    <td>17 kr/kW/mnd</td>
    <td>17 kr/kW/mnd</td>
  </tr>
  <tr>
    <td>63 A</td>
    <td>7,00 øre/kWh</td>
    <td>7,00 øre/kWh</td>
    <td>3,50 øre/kWh</td>
    <td>3,50 øre/kWh</td>
  </tr>
  <tr>
    <td>80 A</td>
    <td>23 kr/kW/mnd</td>
    <td>23 kr/kW/mnd</td>
    <td>17 kr/kW/mnd</td>
    <td>17 kr/kW/mnd</td>
  </tr>
  <tr>
    <td>125 A</td>
    <td>7,00 øre/kWh</td>
    <td>7,00 øre/kWh</td>
    <td>3,50 øre/kWh</td>
    <td>3,50 øre/kWh</td>
  </tr>
</table>
`;

  example3 = `<table class="e-table-mobile">
  <tbody>
    <tr class="e-table_header">
      <th>Sikringsstørrelse</th>
      <th></th>
    </tr>
  </tbody>
  <tbody>
    <tr class="e-table_header-row">
      <th>16 A</th>
      <th></th>
    </tr>
    <tr>
      <td>230 V (2-fase)</td>
      <td>340 kr/mnd</td>
    </tr>
    <tr>
      <td>230 V (3-fase)</td>
      <td>1065 kr/mnd</td>
    </tr>
    <tr>
      <td>400 V (1-fase)</td>
      <td>900 kr/mnd</td>
    </tr>
  </tbody>
  <tbody>
    <tr class="e-table_header-row">
      <th>16 A</th>
      <th></th>
    </tr>
    <tr>
      <td>230 V (2-fase)</td>
      <td>340 kr/mnd</td>
    </tr>
    <tr>
      <td>230 V (3-fase)</td>
      <td>1065 kr/mnd</td>
    </tr>
    <tr>
      <td>400 V (1-fase)</td>
      <td>900 kr/mnd</td>
    </tr>
  </tbody>
  <tbody>
    <tr class="e-table_header-row">
      <th>16 A</th>
      <th></th>
    </tr>
    <tr>
      <td>230 V (2-fase)</td>
      <td>340 kr/mnd</td>
    </tr>
    <tr>
      <td>230 V (3-fase)</td>
      <td>1065 kr/mnd</td>
    </tr>
    <tr>
      <td>400 V (1-fase)</td>
      <td>900 kr/mnd</td>
    </tr>
  </tbody>
</table>
`;

  constructor() { }

  ngOnInit() {
  }

}
