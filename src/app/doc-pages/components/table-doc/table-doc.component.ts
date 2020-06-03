import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-table-doc',
  templateUrl: './table-doc.component.html',
  styleUrls: ['./table-doc.component.scss']
})
export class TableDocComponent {

  externalUrl = getComponent('table-doc').externalUrl;
  componentStatus = getComponent('table-doc').status;
  does = ['Tables should be used when displaying large amounts of data to the user.'];
  donts = ['Don’t use a table when you can use a data visualization.'];

  example1 = `<table class="e-table">
  <thead>
    <tr>
      <th scope="col">Gebyr for ikke-automatiske strømmålere</th>
      <th scope="col">Nok</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th class="e-table__cell" scope="row">Administrativt arbeid i kundesystemet</th>
      <td class="e-table__cell">420</td>
    </tr>
    <tr>
      <th class="e-table__cell" scope="row">Informasjon og purring til kunder</th>
      <td class="e-table__cell">65</td>
    </tr>
    <tr>
      <th class="e-table__cell" scope="row">Arbeid relatert til booking av avlesning</th>
      <td class="e-table__cell">140</td>
    </tr>
    <tr>
      <th class="e-table__cell" scope="row">Årlig kontrollavlesning hos kunde, inkl. kjøring</th>
      <td class="e-table__cell">850</td>
    </tr>
    <tr>
      <th class="e-table__cell" scope="row">Arbeidsledelse og planlegging</th>
      <td class="e-table__cell">150</td>
    </tr>
    <tr>
      <th class="e-table__cell" scope="row">Fradrag for besparelser i AMS-kostnader</th>
      <td class="e-table__cell">-25</td>
    </tr>
  </tbody>
</table>
`;

  example2 = `<table class="e-table">
  <thead>
    <tr>
      <th class="e-table__cell" scope="col">Sikringsstørrelse</th>
      <th class="e-table__cell" scope="col" class="e-text-right">230 V (2-fase)</th>
      <th class="e-table__cell" scope="col" class="e-text-right">230 V (3-fase)</th>
      <th class="e-table__cell" scope="col" class="e-text-right">400 V (1-fase)</th>
      <th class="e-table__cell" scope="col" class="e-text-right">400 V (3-fase)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th class="e-table__cell" scope="row">16 A</th>
      <td class="e-table__cell e-table__cell--multiline e-text-right">340 kr/mnd.
        This cell exceeds 300px, so the class 'e-table__cell--multiline' should be added.</td>
      <td class="e-table__cell e-text-right">1065 kr/mnd</td>
      <td class="e-table__cell e-text-right">900 kr/mnd</td>
      <td class="e-table__cell e-text-right">900 kr/mnd</td>
    </tr>
    <tr>
      <th scope="row">32 A</th>
      <td class="e-table__cell e-text-right">150 kr/kW/mnd</td>
      <td class="e-table__cell e-text-right">150 kr/kW/mnd</td>
      <td class="e-table__cell e-text-right">122 kr/kW/mnd</td>
      <td class="e-table__cell e-text-right">122 kr/kW/mnd</td>
    </tr>
    <tr>
      <th scope="row">40 A</th>
      <td class="e-table__cell e-text-right">80 kr/kW/mnd</td>
      <td class="e-table__cell e-text-right">80 kr/kW/mnd</td>
      <td class="e-table__cell e-text-right">52 kr/kW/mnd</td>
      <td class="e-table__cell e-text-right">52 kr/kW/mnd</td>
    </tr>
    <tr>
      <th scope="row">50 A</th>
      <td class="e-table__cell e-text-right">23 kr/kW/mnd</td>
      <td class="e-table__cell e-text-right">23 kr/kW/mnd</td>
      <td class="e-table__cell e-text-right">17 kr/kW/mnd</td>
      <td class="e-table__cell e-text-right">17 kr/kW/mnd</td>
    </tr>
  </tbody>
</table>
`;

  example3 = `<div style="width: 365px">
  <table class="e-table-mobile">
    <thead>
      <tr>
        <th class="e-table-mobile__cell" scope="col">Sikringsstørrelse</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">16 A</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">230 V (2-fase)</td>
        <td class="e-table-mobile__cell">340 kr/mnd</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">230 V (3-fase)</td>
        <td class="e-table-mobile__cell">1065 kr/mnd</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">400 V (1-fase)</td>
        <td class="e-table-mobile__cell">900 kr/mnd</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">32 A</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">230 V (2-fase)</td>
        <td class="e-table-mobile__cell">340 kr/mnd</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">230 V (3-fase)</td>
        <td class="e-table-mobile__cell">1065 kr/mnd</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">400 V (1-fase)</td>
        <td class="e-table-mobile__cell">900 kr/mnd</td>
      </tr>
    </tbody>
  </table>
</div>
`;

}
