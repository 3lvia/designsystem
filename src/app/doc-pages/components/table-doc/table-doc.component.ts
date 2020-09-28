import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-table-doc',
  templateUrl: './table-doc.component.html',
  styleUrls: ['./table-doc.component.scss'],
})
export class TableDocComponent {
  figmaUrl = getComponent('table-doc').figmaUrl;
  description = getComponent('table-doc').description;
  does = ['Tables should be used when displaying large amounts of data to the user.'];
  donts = ['Don’t use a table when you can use a data visualization.', 'Don’t mix different styles of tables on the same page.'];

  exampleOverview = `<div class="e-table-container">
  <table class="e-table">
    <thead>
      <tr>
        <th scope="col">Table column 1</th>
        <th scope="col">Table column 2</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Table row 1 column 1</th>
        <td>Table row 1 column 2</td>
        <td>Table row 1 column 3</td>
      </tr>
      <tr>
        <th scope="row">Table row 2 column 1</th>
        <td>Table row 2 column 2</td>
        <td>Table row 2 column 3</td>
      </tr>
      <tr>
        <th scope="row">Table row 3 column 1</th>
        <td>Table row 3 column 2</td>
        <td>Table row 3 column 3</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  example1 = `<div class="e-table-container">
  <table class="e-table">
    <thead>
      <tr>
        <th scope="col">Periode</th>
        <th scope="col">Status</th>
        <th scope="col" class="e-text-right">Beløp</th>
        <th scope="col" class="e-text-right">Faktura nr.</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Januar 2020</th>
        <td>Sendt</td>
        <td class="e-text-right">567,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">Februar 2020</th>
        <td>Betalt</td>
        <td class="e-text-right">543,10 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">Mars 2020</th>
        <td>Betalt</td>
        <td class="e-text-right">568,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">April 2020</th>
        <td>Sendt</td>
        <td class="e-text-right">521,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">Mai 2020</th>
        <td>Betalt</td>
        <td class="e-text-right">556,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  example6 = `<div style="width: 305px; margin: 16px;">
  <table class="e-table-mobile">
    <thead>
      <tr>
        <th class="e-table-mobile__cell" scope="col">Periode</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">Januar 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Sendt</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Beløp</th>
        <td class="e-table-mobile__cell">567,98 kr</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Faktura nr.</th>
        <td class="e-table-mobile__cell">123456</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">Februar 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Betalt</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Beløp</th>
        <td class="e-table-mobile__cell">543,10 kr</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Faktura nr.</th>
        <td class="e-table-mobile__cell">123456</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">Mars 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Betalt</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Beløp</th>
        <td class="e-table-mobile__cell">568,98 kr</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Faktura nr.</th>
        <td class="e-table-mobile__cell">123456</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">April 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Sendt</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Beløp</th>
        <td class="e-table-mobile__cell">521,98 kr</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Faktura nr.</th>
        <td class="e-table-mobile__cell">123456</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">Mai 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Betalt</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Beløp</th>
        <td class="e-table-mobile__cell">556,98 kr</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Faktura nr.</th>
        <td class="e-table-mobile__cell">123456</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  example2 = `<div class="e-table-container">
  <table class="e-table e-table--compact">
    <thead>
      <tr>
        <th scope="col">Periode</th>
        <th scope="col">Status</th>
        <th scope="col" class="e-text-right">Beløp</th>
        <th scope="col" class="e-text-right">Faktura nr.</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Januar 2020</th>
        <td>Sendt</td>
        <td class="e-text-right">567,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">Februar 2020</th>
        <td>Betalt</td>
        <td class="e-text-right">543,10 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">Mars 2020</th>
        <td>Betalt</td>
        <td class="e-text-right">568,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">April 2020</th>
        <td>Sendt</td>
        <td class="e-text-right">521,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">Mai 2020</th>
        <td>Betalt</td>
        <td class="e-text-right">556,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  example7 = `<div style="width: 305px; margin: 16px;">
  <table class="e-table-mobile e-table-mobile--compact">
    <thead>
      <tr>
        <th class="e-table-mobile__cell" scope="col">Periode</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">Januar 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Sendt</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Beløp</th>
        <td class="e-table-mobile__cell">567,98 kr</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Faktura nr.</th>
        <td class="e-table-mobile__cell">123456</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">Februar 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Betalt</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Beløp</th>
        <td class="e-table-mobile__cell">543,10 kr</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Faktura nr.</th>
        <td class="e-table-mobile__cell">123456</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">Mars 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Betalt</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Beløp</th>
        <td class="e-table-mobile__cell">568,98 kr</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Faktura nr.</th>
        <td class="e-table-mobile__cell">123456</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">April 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Sendt</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Beløp</th>
        <td class="e-table-mobile__cell">521,98 kr</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Faktura nr.</th>
        <td class="e-table-mobile__cell">123456</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">Mai 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Betalt</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Beløp</th>
        <td class="e-table-mobile__cell">556,98 kr</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Faktura nr.</th>
        <td class="e-table-mobile__cell">123456</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleSorting = `<div class="e-table-container">
  <table class="e-table">
    <thead>
      <tr>
        <th scope="col" class="e-table__sort-header">
          Periode
          <span class="e-table__sort-icon e-table__sort-icon--inactive">
            <i class="e-icon e-icon--arrow_down-bold"></i>
            <i class="e-icon e-icon--arrow_up-bold"></i>
          </span>
        </th>
        <th scope="col" class="e-table__sort-header e-text-right">
          Beløp
          <span class="e-table__sort-icon e-table__sort-icon--up">
            <i class="e-icon e-icon--arrow_down-bold"></i>
            <i class="e-icon e-icon--arrow_up-bold"></i>
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Januar 2020</th>
        <td class="e-text-right">567,98 kr</td>
      </tr>
      <tr>
        <th scope="row">Februar 2020</th>
        <td class="e-text-right">543,10 kr</td>
      </tr>
      <tr>
        <th scope="row">Mars 2020</th>
        <td class="e-text-right">568,98 kr</td>
      </tr>
      <tr>
        <th scope="row">April 2020</th>
        <td class="e-text-right">521,98 kr</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  example5 = `<div class="e-table-container">
  <table class="e-table">
    <thead>
      <tr>
        <th scope="col">Periode</th>
        <th scope="col">Status</th>
        <th scope="col" class="e-text-right">Beløp</th>
        <th scope="col" class="e-text-right">Faktura nr.</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" class="e-table__cell--multiline">This cell exceeds 450px in width, so the class 'e-table__cell--multiline' should be added to break the lines.</th>
        <td>Sendt</td>
        <td class="e-text-right">567,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">Februar 2020</th>
        <td>Betalt</td>
        <td class="e-text-right">543,10 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">Mars 2020</th>
        <td>Betalt</td>
        <td class="e-text-right">568,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">April 2020</th>
        <td>Sendt</td>
        <td class="e-text-right">521,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">Mai 2020</th>
        <td>Betalt</td>
        <td class="e-text-right">556,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
    </tbody>
  </table>
</div>
`;


  example8 = `<div class="e-table-container">
  <table class="e-table">
    <thead>
      <tr>
        <th scope="col" class="e-text-left">Text left</th>
        <th scope="col" class="e-text-center">Icons centered</th>
        <th scope="col" class="e-text-right">Numbers right</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="e-text-left">Text left aligned</td>
        <td class="e-text-center">
          <i class="e-icon e-icon--download e-icon--sm"></i>
        </td>
        <td class="e-text-right">123456789</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleFootnote = `<div class="e-table-container">
<table class="e-table">
  <thead>
    <tr>
      <th scope="col">Periode*</th>
      <th scope="col">Status</th>
      <th scope="col" class="e-text-right">Beløp</th>
      <th scope="col" class="e-text-right">Faktura nr.</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Januar 2020</th>
      <td>Sendt</td>
      <td class="e-text-right">567,98 kr</td>
      <td class="e-text-right">123456</td>
    </tr>
    <tr>
      <th scope="row">Februar 2020</th>
      <td>Betalt</td>
      <td class="e-text-right">543,10 kr</td>
      <td class="e-text-right">123456</td>
    </tr>
    <tr>
      <th scope="row">Mars 2020</th>
      <td>Betalt</td>
      <td class="e-text-right">568,98 kr</td>
      <td class="e-text-right">123456</td>
    </tr>
    <tr>
      <th scope="row">April 2020</th>
      <td>Sendt</td>
      <td class="e-text-right">521,98 kr</td>
      <td class="e-text-right">123456</td>
    </tr>
    <tr>
      <th scope="row">Mai 2020</th>
      <td>Betalt</td>
      <td class="e-text-right">556,98 kr</td>
      <td class="e-text-right">123456</td>
    </tr>
  </tbody>
</table>
</div>
<div class="e-table-footnote">*If you include a footnote to your table, it should look like this</div>
`;
}
