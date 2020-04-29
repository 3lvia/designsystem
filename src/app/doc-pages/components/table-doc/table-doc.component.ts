import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-table-doc',
  templateUrl: './table-doc.component.html',
  styleUrls: ['./table-doc.component.scss']
})
export class TableDocComponent implements OnInit {

  externalUrl = getComponent('table-doc').externalUrl;
  componentStatus = getComponent('table-doc').status;

  example1 = `<table class="e-table">
  <thead>
    <tr>
      <th scope="col">Gebyr for ikke-automatiske strømmålere</th>
      <th scope="col">Nok</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Administrativt arbeid i kundesystemet</th>
      <td>420</td>
    </tr>
    <tr>
      <th scope="row">Informasjon og purring til kunder</th>
      <td>65</td>
    </tr>
    <tr>
      <th scope="row">Arbeid relatert til booking av avlesning</th>
      <td>140</td>
    </tr>
    <tr>
      <th scope="row">Årlig kontrollavlesning hos kunde, inkl. kjøring</th>
      <td>850</td>
    </tr>
    <tr>
      <th scope="row">Arbeidsledelse og planlegging</th>
      <td>150</td>
    </tr>
    <tr>
      <th scope="row">Fradrag for besparelser i AMS-kostnader</th>
      <td>-25</td>
    </tr>
  </tbody>
</table>
`;

  example2 = `<table class="e-table">
  <thead>
    <tr>
      <th scope="col">Sikringsstørrelse</th>
      <th scope="col">230 V (2-fase)</th>
      <th scope="col">230 V (3-fase)</th>
      <th scope="col">400 V (1-fase)</th>
      <th scope="col">400 V (3-fase)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">16 A</th>
      <td class="is-max">340 kr/mnd. This cell exceeds 300px, so the class 'is-max' is added.</td>
      <td>1065 kr/mnd</td>
      <td>900 kr/mnd</td>
      <td>900 kr/mnd</td>
    </tr>
    <tr>
      <th scope="row">32 A</th>
      <td>150 kr/kW/mnd</td>
      <td>150 kr/kW/mnd</td>
      <td>122 kr/kW/mnd</td>
      <td>122 kr/kW/mnd</td>
    </tr>
    <tr>
      <th scope="row">40 A</th>
      <td>80 kr/kW/mnd</td>
      <td>80 kr/kW/mnd</td>
      <td>52 kr/kW/mnd</td>
      <td>52 kr/kW/mnd</td>
    </tr>
    <tr>
      <th scope="row">50 A</th>
      <td>23 kr/kW/mnd</td>
      <td>23 kr/kW/mnd</td>
      <td>17 kr/kW/mnd</td>
      <td>17 kr/kW/mnd</td>
    </tr>
  </tbody>
</table>
`;

  example3 = `<div style="width: 365px">
  <table class="e-table-mobile">
    <thead>
      <tr>
        <th scope="col">Sikringsstørrelse</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="col">16 A</th>
        <th scope="col"></th>
      </tr>
      <tr>
        <th scope="row">230 V (2-fase)</td>
        <td>340 kr/mnd</td>
      </tr>
      <tr>
        <th scope="row">230 V (3-fase)</td>
        <td>1065 kr/mnd</td>
      </tr>
      <tr>
        <th scope="row">400 V (1-fase)</td>
        <td>900 kr/mnd</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th scope="col">32 A</th>
        <th scope="col"></th>
      </tr>
      <tr>
        <th scope="row">230 V (2-fase)</td>
        <td>340 kr/mnd</td>
      </tr>
      <tr>
        <th scope="row">230 V (3-fase)</td>
        <td>1065 kr/mnd</td>
      </tr>
      <tr>
        <th scope="row">400 V (1-fase)</td>
        <td>900 kr/mnd</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  constructor() { }

  ngOnInit() {
  }

}
