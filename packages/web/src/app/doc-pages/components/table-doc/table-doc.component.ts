import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-table-doc',
  templateUrl: './table-doc.component.html',
  styleUrls: ['./table-doc.component.scss'],
})
export class TableDocComponent {
  figmaUrl = getComponent('table').figmaUrl;
  description = getComponent('table').description;
  does = ['Tables should be used when displaying large amounts of data to the user.'];
  donts = [
    'Don’t use a table when you can use a data visualization.',
    'Don’t mix different styles of tables on the same page.',
  ];

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
        <td>Table row 1 column 1</td>
        <td>Table row 1 column 2</td>
        <td>Table row 1 column 3</td>
      </tr>
      <tr>
        <td>Table row 2 column 1</td>
        <td>Table row 2 column 2</td>
        <td>Table row 2 column 3</td>
      </tr>
      <tr>
        <td>Table row 3 column 1</td>
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
        <th scope="col">Period</th>
        <th scope="col">Status</th>
        <th scope="col" class="e-text-right">Amount</th>
        <th scope="col" class="e-text-right">Invoice no.</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">January 2020</th>
        <td>Sent</td>
        <td class="e-text-right">567,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">February 2020</th>
        <td>Paid</td>
        <td class="e-text-right">543,10 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">March 2020</th>
        <td>Paid</td>
        <td class="e-text-right">568,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">April 2020</th>
        <td>Sent</td>
        <td class="e-text-right">521,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">May 2020</th>
        <td>Paid</td>
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
        <th class="e-table-mobile__cell" scope="col">Period</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">January 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Sent</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Amount</th>
        <td class="e-table-mobile__cell">567,98 kr</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Invoice no.</th>
        <td class="e-table-mobile__cell">123456</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">February 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Paid</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Amount</th>
        <td class="e-table-mobile__cell">543,10 kr</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Invoice no.</th>
        <td class="e-table-mobile__cell">123456</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">March 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Paid</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Amount</th>
        <td class="e-table-mobile__cell">568,98 kr</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Invoice no.</th>
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
        <td class="e-table-mobile__cell">Sent</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Amount</th>
        <td class="e-table-mobile__cell">521,98 kr</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Invoice no.</th>
        <td class="e-table-mobile__cell">123456</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">May 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Paid</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Amount</th>
        <td class="e-table-mobile__cell">556,98 kr</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Invoice no.</th>
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
        <th scope="col">Period</th>
        <th scope="col">Status</th>
        <th scope="col" class="e-text-right">Amount</th>
        <th scope="col" class="e-text-right">Invoice no.</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">January 2020</th>
        <td>Sent</td>
        <td class="e-text-right">567,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">February 2020</th>
        <td>Paid</td>
        <td class="e-text-right">543,10 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">March 2020</th>
        <td>Paid</td>
        <td class="e-text-right">568,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">April 2020</th>
        <td>Sent</td>
        <td class="e-text-right">521,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">May 2020</th>
        <td>Paid</td>
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
        <th class="e-table-mobile__cell" scope="col">Period</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">January 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Sent</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Amount</th>
        <td class="e-table-mobile__cell">567,98 kr</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Invoice no.</th>
        <td class="e-table-mobile__cell">123456</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">February 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Paid</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Amount</th>
        <td class="e-table-mobile__cell">543,10 kr</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Invoice no.</th>
        <td class="e-table-mobile__cell">123456</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">March 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Paid</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Amount</th>
        <td class="e-table-mobile__cell">568,98 kr</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Invoice no.</th>
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
        <td class="e-table-mobile__cell">Sent</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Amount</th>
        <td class="e-table-mobile__cell">521,98 kr</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Invoice no.</th>
        <td class="e-table-mobile__cell">123456</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">May 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Paid</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Amount</th>
        <td class="e-table-mobile__cell">556,98 kr</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Invoice no.</th>
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
          Period
          <span class="e-table__sort-icon e-table__sort-icon--inactive">
            <i class="e-icon e-icon--arrow_down-bold"></i>
            <i class="e-icon e-icon--arrow_up-bold"></i>
          </span>
        </th>
        <th scope="col" class="e-table__sort-header ">
          Amount
          <span class="e-table__sort-icon e-table__sort-icon--up">
            <i class="e-icon e-icon--arrow_down-bold"></i>
            <i class="e-icon e-icon--arrow_up-bold"></i>
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">January 2020</th>
        <td>567,98 kr</td>
      </tr>
      <tr>
        <th scope="row">February 2020</th>
        <td>543,10 kr</td>
      </tr>
      <tr>
        <th scope="row">March 2020</th>
        <td>568,98 kr</td>
      </tr>
      <tr>
        <th scope="row">April 2020</th>
        <td>521,98 kr</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleInput = `<div class="e-table-container">
  <table class="e-table">
    <thead>
      <tr>
        <th scope="col">Address</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="e-table__input">
          <div class="e-input e-input--compact">
            <input id="normal" type="address1" placeholder="Address" />
          </div>
        </td>
        <td>
          Payed
        </td>
      </tr>
      <tr>
        <td class="e-table__input">
          <div class="e-input e-input--compact">
            <input id="normal" type="address1" placeholder="Address" />
          </div>
        </td>
        <td>
          Payed
        </td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleInputCompact = `<div class="e-table-container">
  <table class="e-table e-table--compact">
    <thead>
      <tr>
        <th scope="col">Address</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="e-table__input">
          <div class="e-input e-input--compact">
            <input id="normal" type="address1" placeholder="Address" />
          </div>
        </td>
        <td>
          Payed
        </td>
      </tr>
      <tr>
        <td class="e-table__input">
          <div class="e-input e-input--compact">
            <input id="normal" type="address1" placeholder="Address" />
          </div>
        </td>
        <td>
          Payed
        </td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleButton = `<div class="e-table-container">
  <table class="e-table">
    <thead>
      <tr>
        <th scope="col">Address</th>
        <th scope="col">Opprettet</th>
        <th scope="col" class="e-text-center">Handling</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Elvia Elviaveien 3, 1234 Oslo</td>
        <td>15.01.2021</td>
        <td class="e-table__buttons">
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--edit"></i></span>
          </button>
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--bin"></i></span>
          </button>
        </td>
      </tr>
      <tr>
        <td>Elvia Elviaveien 3, 1234 Oslo</td>
        <td>15.01.2021</td>
        <td class="e-table__buttons">
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--edit"></i></span>
          </button>
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--bin"></i></span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleButtonCompact = `<div class="e-table-container">
  <table class="e-table e-table--compact">
    <thead>
      <tr>
        <th scope="col">Address</th>
        <th scope="col">Opprettet</th>
        <th scope="col" class="e-text-center">Handling</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Elvia Elviaveien 3, 1234 Oslo</td>
        <td>15.01.2021</td>
        <td class="e-table__buttons">
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--edit"></i></span>
          </button>
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--bin"></i></span>
          </button>
        </td>
      </tr>
      <tr>
        <td>Elvia Elviaveien 3, 1234 Oslo</td>
        <td>15.01.2021</td>
        <td class="e-table__buttons">
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--edit"></i></span>
          </button>
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--bin"></i></span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleButtonMobile = `<div style="width: 305px; margin: 16px;">
  <table class="e-table-mobile">
    <thead>
      <tr>
        <th class="e-table-mobile__cell" scope="col">Period</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">January 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Sent</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Action</th>
        <td class="e-table-mobile__cell e-table-mobile__buttons">
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--edit"></i></span>
          </button>
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--bin"></i></span>
          </button>
        </td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">February 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Paid</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Action</th>
        <td class="e-table-mobile__cell e-table-mobile__buttons">
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--edit"></i></span>
          </button>
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--bin"></i></span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`;
  exampleButtonMobileCompact = `<div style="width: 305px; margin: 16px;">
  <table class="e-table-mobile e-table-mobile--compact">
    <thead>
      <tr>
        <th class="e-table-mobile__cell" scope="col">Period</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">January 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Sent</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Action</th>
        <td class="e-table-mobile__cell e-table-mobile__buttons">
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--edit"></i></span>
          </button>
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--bin"></i></span>
          </button>
        </td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell" scope="col">February 2020</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Paid</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Action</th>
        <td class="e-table-mobile__cell e-table-mobile__buttons">
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--edit"></i></span>
          </button>
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--bin"></i></span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleSelect = `<div class="e-table-container">
  <table class="e-table">
    <thead>
      <tr class="e-table__select">
        <th scope="col">
          <label class="e-checkbox e-checkbox--sm e-checkbox--indeterminate" for="overall-checkbox">
            <input type="checkbox" id="overall-checkbox">
            <span class="e-checkbox__mark"></span>
          </label>
        </th>
        <th scope="col">Address</th>
        <th scope="col">Opprettet</th>
      </tr>
    </thead>
    <tbody>
      <tr class="e-table__select e-table__select--selected">
        <td>
          <label class="e-checkbox e-checkbox--sm" for="checkbox-first-cell">
            <input type="checkbox" id="checkbox-first-cell" checked>
            <span class="e-checkbox__mark"></span>
          </label>
        </td>
        <td>Elvia Elviaveien 3, 1234 Oslo</td>
        <td>15.01.2021</td>
      </tr>
      <tr class="e-table__select">
        <td>
          <label class="e-checkbox e-checkbox--sm" for="checkbox-second-cell">
            <input type="checkbox" id="checkbox-second-cell">
            <span class="e-checkbox__mark"></span>
          </label>
        </td>
        <td>Elvia Elviaveien 3, 1234 Oslo</td>
        <td>15.01.2021</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleSelectCompact = `<div class="e-table-container">
  <table class="e-table e-table--compact">
    <thead>
      <tr class="e-table__select">
        <th scope="col">
          <label class="e-checkbox e-checkbox--sm e-checkbox--indeterminate" for="overall-checkbox-compact">
            <input type="checkbox" id="overall-checkbox-compact">
            <span class="e-checkbox__mark"></span>
          </label>
        </th>
        <th scope="col">Address</th>
        <th scope="col">Opprettet</th>
      </tr>
    </thead>
    <tbody>
      <tr class="e-table__select e-table__select--selected">
        <td>
          <label class="e-checkbox e-checkbox--sm" for="checkbox-first-cell-compact">
            <input type="checkbox" id="checkbox-first-cell-compact" checked>
            <span class="e-checkbox__mark"></span>
          </label>
        </td>
        <td>Elvia Elviaveien 3, 1234 Oslo</td>
        <td>15.01.2021</td>
      </tr>
      <tr class="e-table__select">
        <td>
          <label class="e-checkbox e-checkbox--sm" for="checkbox-second-cell-compact">
            <input type="checkbox" id="checkbox-second-cell-compact">
            <span class="e-checkbox__mark"></span>
          </label>
        </td>
        <td>Elvia Elviaveien 3, 1234 Oslo</td>
        <td>15.01.2021</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleSelectMobile = `<div style="width: 305px; margin: 16px;">
  <table class="e-table-mobile">
    <thead>
      <tr>
        <th class="e-table-mobile__cell" scope="col">Period</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr class="e-table-mobile__select e-table-mobile__select--selected">
        <th class="e-table-mobile__cell" scope="col">
          <label class="e-checkbox" for="checkbox-first-row-mb">
            <input type="checkbox" id="checkbox-first-row-mb" checked>
            <span class="e-checkbox__mark"></span>
          </label>
          January 2020
        </th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Sent</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Action</th>
        <td class="e-table-mobile__cell e-table-mobile__buttons">
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--bin"></i></span>
          </button>
        </td>
      </tr>
    </tbody>
    <tbody>
      <tr class="e-table-mobile__select">
        <th class="e-table-mobile__cell" scope="col">
          <label class="e-checkbox" for="checkbox-second-row-mb">
            <input type="checkbox" id="checkbox-second-row-mb">
            <span class="e-checkbox__mark"></span>
          </label>
          February 2020
        </th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Paid</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Action</th>
        <td class="e-table-mobile__cell e-table-mobile__buttons">
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--bin"></i></span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`;
  exampleSelectMobileCompact = `<div style="width: 305px; margin: 16px;">
  <table class="e-table-mobile e-table-mobile--compact">
    <thead>
      <tr>
        <th class="e-table-mobile__cell" scope="col">Period</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr class="e-table-mobile__select e-table-mobile__select--selected">
        <th class="e-table-mobile__cell" scope="col">
          <label class="e-checkbox" for="checkbox-first-row-mb-compact">
            <input type="checkbox" id="checkbox-first-row-mb-compact" checked>
            <span class="e-checkbox__mark"></span>
          </label>
          January 2020
        </th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Sent</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Action</th>
        <td class="e-table-mobile__cell e-table-mobile__buttons">
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--bin"></i></span>
          </button>
        </td>
      </tr>
    </tbody>
    <tbody>
      <tr class="e-table-mobile__select">
        <th class="e-table-mobile__cell" scope="col">
          <label class="e-checkbox" for="checkbox-second-row-mb-compact">
            <input type="checkbox" id="checkbox-second-row-mb-compact">
            <span class="e-checkbox__mark"></span>
          </label>
          February 2020
        </th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Paid</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Action</th>
        <td class="e-table-mobile__cell e-table-mobile__buttons">
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--bin"></i></span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleLink = `<div class="e-table-container">
  <table class="e-table">
    <thead>
      <tr>
        <th scope="col">Address</th>
        <th scope="col">Opprettet</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr class="e-table__link" [routerLink]="['/components/table']">
        <td>Elvia Elviaveien 3, 1234 Oslo</td>
        <td>15.01.2021</td>
        <td>
          <a class="e-link e-link--action">
            <span class="e-link__icon">
              <i class="e-icon e-icon--arrow_right_circle-color"></i>
              <i class="e-icon e-icon--arrow_right_circle-filled-color"></i>
            </span>  
          </a>
        </td>
      </tr>
      <tr class="e-table__link" [routerLink]="['/components/table']">
        <td>Elvia Elviaveien 3, 1234 Oslo</td>
        <td>15.01.2021</td>
        <td>
          <a class="e-link e-link--action">
            <span class="e-link__icon">
              <i class="e-icon e-icon--arrow_right_circle-color"></i>
              <i class="e-icon e-icon--arrow_right_circle-filled-color"></i>
            </span>  
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleLinkCompact = `<div class="e-table-container">
  <table class="e-table e-table--compact">
    <thead>
      <tr>
        <th scope="col">Address</th>
        <th scope="col">Opprettet</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr class="e-table__link" [routerLink]="['/components/table']">
        <td>Elvia Elviaveien 3, 1234 Oslo</td>
        <td>15.01.2021</td>
        <td>
          <a class="e-link e-link--action">
            <span class="e-link__icon">
              <i class="e-icon e-icon--arrow_right_circle-color"></i>
              <i class="e-icon e-icon--arrow_right_circle-filled-color"></i>
            </span>  
          </a>
        </td>
      </tr>
      <tr class="e-table__link" [routerLink]="['/components/table']">
        <td>Elvia Elviaveien 3, 1234 Oslo</td>
        <td>15.01.2021</td>
        <td>
          <a class="e-link e-link--action">
            <span class="e-link__icon">
              <i class="e-icon e-icon--arrow_right_circle-color"></i>
              <i class="e-icon e-icon--arrow_right_circle-filled-color"></i>
            </span>  
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleLinkMobile = `<div style="width: 305px; margin: 16px;">
  <table class="e-table-mobile">
    <thead>
      <tr>
        <th class="e-table-mobile__cell" scope="col">Period</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr class="e-table-mobile__link" [routerLink]="['/components/table']">
        <th class="e-table-mobile__cell" scope="col">January 2020</th>
        <th class="e-table-mobile__cell" scope="col">
          <a class="e-link e-link--action">
            <span class="e-link__icon">
              <i class="e-icon e-icon--arrow_right_circle-color"></i>
              <i class="e-icon e-icon--arrow_right_circle-filled-color"></i>
            </span>  
          </a>
        </th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Sent</td>
      </tr>
    </tbody>
    <tbody>
      <tr class="e-table-mobile__link" [routerLink]="['/components/table']">
        <th class="e-table-mobile__cell" scope="col">February 2020</th>
        <th class="e-table-mobile__cell" scope="col">
          <a class="e-link e-link--action">
            <span class="e-link__icon">
              <i class="e-icon e-icon--arrow_right_circle-color"></i>
              <i class="e-icon e-icon--arrow_right_circle-filled-color"></i>
            </span>  
          </a>
        </th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Paid</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleLinkMobileCompact = `<div style="width: 305px; margin: 16px;">
  <table class="e-table-mobile e-table-mobile--compact">
    <thead>
      <tr>
        <th class="e-table-mobile__cell" scope="col">Period</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr class="e-table-mobile__link" [routerLink]="['/components/table']">
        <th class="e-table-mobile__cell" scope="col">January 2020</th>
        <th class="e-table-mobile__cell" scope="col">
          <a class="e-link e-link--action">
            <span class="e-link__icon">
              <i class="e-icon e-icon--arrow_right_circle-color"></i>
              <i class="e-icon e-icon--arrow_right_circle-filled-color"></i>
            </span>  
          </a>
        </th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Sent</td>
      </tr>
    </tbody>
    <tbody>
      <tr class="e-table-mobile__link" [routerLink]="['/components/table']">
        <th class="e-table-mobile__cell" scope="col">February 2020</th>
        <th class="e-table-mobile__cell" scope="col">
          <a class="e-link e-link--action">
            <span class="e-link__icon">
              <i class="e-icon e-icon--arrow_right_circle-color"></i>
              <i class="e-icon e-icon--arrow_right_circle-filled-color"></i>
            </span>  
          </a>
        </th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Status</th>
        <td class="e-table-mobile__cell">Paid</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  example5 = `<div class="e-table-container">
  <table class="e-table">
    <thead>
      <tr>
        <th scope="col">Period</th>
        <th scope="col">Status</th>
        <th scope="col" class="e-text-right">Amount</th>
        <th scope="col" class="e-text-right">Invoice no.</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" class="e-table__cell--multiline">This cell exceeds 450px in width, so the class 'e-table__cell--multiline' should be added to break the lines.</th>
        <td>Sent</td>
        <td class="e-text-right">567,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">February 2020</th>
        <td>Paid</td>
        <td class="e-text-right">543,10 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">March 2020</th>
        <td>Paid</td>
        <td class="e-text-right">568,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">April 2020</th>
        <td>Sent</td>
        <td class="e-text-right">521,98 kr</td>
        <td class="e-text-right">123456</td>
      </tr>
      <tr>
        <th scope="row">May 2020</th>
        <td>Paid</td>
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
      <th scope="col">Period*</th>
      <th scope="col">Status</th>
      <th scope="col" class="e-text-right">Amount</th>
      <th scope="col" class="e-text-right">Invoice no.</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">January 2020</th>
      <td>Sent</td>
      <td class="e-text-right">567,98 kr</td>
      <td class="e-text-right">123456</td>
    </tr>
    <tr>
      <th scope="row">February 2020</th>
      <td>Paid</td>
      <td class="e-text-right">543,10 kr</td>
      <td class="e-text-right">123456</td>
    </tr>
    <tr>
      <th scope="row">March 2020</th>
      <td>Paid</td>
      <td class="e-text-right">568,98 kr</td>
      <td class="e-text-right">123456</td>
    </tr>
    <tr>
      <th scope="row">April 2020</th>
      <td>Sent</td>
      <td class="e-text-right">521,98 kr</td>
      <td class="e-text-right">123456</td>
    </tr>
    <tr>
      <th scope="row">May 2020</th>
      <td>Paid</td>
      <td class="e-text-right">556,98 kr</td>
      <td class="e-text-right">123456</td>
    </tr>
  </tbody>
</table>
</div>
<div class="e-table__footnote">*If you include a footnote to your table, it should look like this</div>
`;
}
