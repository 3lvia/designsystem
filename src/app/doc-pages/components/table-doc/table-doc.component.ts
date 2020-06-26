import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-table-doc',
  templateUrl: './table-doc.component.html',
  styleUrls: ['./table-doc.component.scss'],
})
export class TableDocComponent {
  figmaUrl = getComponent('table-doc').figmaUrl;
  does = ['Tables should be used when displaying large amounts of data to the user.'];
  donts = ['Don’t use a table when you can use a data visualization.', 'Don’t mix different styles of tables on the same page.'];

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
      <td class="e-table--align-right">420</td>
    </tr>
    <tr>
      <th scope="row">Informasjon og purring til kunder</th>
      <td class="e-table--align-right">65</td>
    </tr>
    <tr>
      <th scope="row">Arbeid relatert til booking av avlesning</th>
      <td class="e-table--align-right">140</td>
    </tr>
    <tr>
      <th scope="row">Årlig kontrollavlesning hos kunde, inkl. kjøring</th>
      <td class="e-table--align-right">850</td>
    </tr>
    <tr>
      <th scope="row">Arbeidsledelse og planlegging</th>
      <td class="e-table--align-right">150</td>
    </tr>
    <tr>
      <th scope="row">Fradrag for besparelser i AMS-kostnader</th>
      <td class="e-table--align-right">-25</td>
    </tr>
  </tbody>
</table>
`;
  example2 = `<table class="e-table e-table--compact">
  <thead>
    <tr>
      <th scope="col">Gebyr for ikke-automatiske strømmålere</th>
      <th scope="col">Nok</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Administrativt arbeid i kundesystemet</th>
      <td class="e-table--align-right">420</td>
    </tr>
    <tr>
      <th scope="row">Informasjon og purring til kunder</th>
      <td class="e-table--align-right">65</td>
    </tr>
    <tr>
      <th scope="row">Arbeid relatert til booking av avlesning</th>
      <td class="e-table--align-right">140</td>
    </tr>
    <tr>
      <th scope="row">Årlig kontrollavlesning hos kunde, inkl. kjøring</th>
      <td class="e-table--align-right">850</td>
    </tr>
    <tr>
      <th scope="row">Arbeidsledelse og planlegging</th>
      <td class="e-table--align-right">150</td>
    </tr>
    <tr>
      <th scope="row">Fradrag for besparelser i AMS-kostnader</th>
      <td class="e-table--align-right">-25</td>
    </tr>
  </tbody>
</table>
`;
  example3 = `<table class="e-table e-table--white-header">
  <thead>
    <tr>
      <th scope="col">Gebyr for ikke-automatiske strømmålere</th>
      <th scope="col">Nok</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Administrativt arbeid i kundesystemet</th>
      <td class="e-table--align-right">420</td>
    </tr>
    <tr>
      <th scope="row">Informasjon og purring til kunder</th>
      <td class="e-table--align-right">65</td>
    </tr>
    <tr>
      <th scope="row">Arbeid relatert til booking av avlesning</th>
      <td class="e-table--align-right">140</td>
    </tr>
    <tr>
      <th scope="row">Årlig kontrollavlesning hos kunde, inkl. kjøring</th>
      <td class="e-table--align-right">850</td>
    </tr>
    <tr>
      <th scope="row">Arbeidsledelse og planlegging</th>
      <td class="e-table--align-right">150</td>
    </tr>
    <tr>
      <th scope="row">Fradrag for besparelser i AMS-kostnader</th>
      <td class="e-table--align-right">-25</td>
    </tr>
  </tbody>
</table>
`;
  example4 = `<table class="e-table e-table--compact e-table--bold">
  <thead>
    <tr>
      <th scope="col">Periode</th>
      <th scope="col">Beløp</th>
      <th scope="col">Status</th>
      <th scope="col">Faktura nr.</th>
      <th scope="col">Last ned</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Juni 2019</th>
      <td class="e-table--align-right">565,98 kr</td>
      <td>Sendt</td>
      <td class="e-table--align-right">148392</td>
      <td class="e-table--align-center">
        <i class="e-icon e-icon--download e-icon--xs"></i>
      </td>
    </tr>
    <tr>
      <th scope="row">Mai 2019</th>
      <td class="e-table--align-right">502,73 kr</td>
      <td>Betalt</td>
      <td class="e-table--align-right">148393</td>
      <td class="e-table--align-center">
        <i class="e-icon e-icon--download e-icon--xs"></i>
      </td>
    </tr>
    <tr>
      <th scope="row">April 2019</th>
      <td class="e-table--align-right">345,58 kr</td>
      <td>Betalt</td>
      <td class="e-table--align-right">148394</td>
      <td class="e-table--align-center">
        <i class="e-icon e-icon--download e-icon--xs"></i>
      </td>
    </tr>

  </tbody>
</table>
`;
  example5 = `<table class="e-table">
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
      <td class="e-table__cell--multiline e-table--align-right">340 kr/mnd.
        This cell exceeds 300px, so the class 'e-table__cell--multiline' should be added.</td>
      <td class="e-table--align-right">1065 kr/mnd</td>
      <td class="e-table--align-right">900 kr/mnd</td>
      <td class="e-table--align-right">900 kr/mnd</td>
    </tr>
    <tr>
      <th scope="row">32 A</th>
      <td class="e-table--align-right">150 kr/kW/mnd</td>
      <td class="e-table--align-right">150 kr/kW/mnd</td>
      <td class="e-table--align-right">122 kr/kW/mnd</td>
      <td class="e-table--align-right">122 kr/kW/mnd</td>
    </tr>
    <tr>
      <th scope="row">40 A</th>
      <td class="e-table--align-right">80 kr/kW/mnd</td>
      <td class="e-table--align-right">80 kr/kW/mnd</td>
      <td class="e-table--align-right">52 kr/kW/mnd</td>
      <td class="e-table--align-right">52 kr/kW/mnd</td>
    </tr>
    <tr>
      <th scope="row">50 A</th>
      <td class="e-table--align-right">23 kr/kW/mnd</td>
      <td class="e-table--align-right">23 kr/kW/mnd</td>
      <td class="e-table--align-right">17 kr/kW/mnd</td>
      <td class="e-table--align-right">17 kr/kW/mnd</td>
    </tr>
  </tbody>
</table>
`;

  example6 = `<div style="width: 365px">
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
  example7 = `<div style="width: 365px">
  <table class="e-table-mobile e-table-mobile--compact">
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

  example8 = `<table class="e-table">
  <thead>
    <tr>
      <th scope="col">Text left</th>
      <th scope="col">Icons centered</th>
      <th scope="col">Numbers right</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="e-table--align-left">Text left aligned</td>
      <td class="e-table--align-center">
        <i class="e-icon e-icon--download e-icon--sm"></i>
      </td>
      <td class="e-table--align-right">123456789</td>
    </tr>
  </tbody>
</table>
`;
}
