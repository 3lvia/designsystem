import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';

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
        <th scope="col">Column 1</th>
        <th scope="col">Column 2</th>
        <th scope="col">Column 3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Row 1</td>
        <td>Row 1</td>
        <td>Row 1</td>
      </tr>
      <tr>
        <td>Row 2</td>
        <td>Row 2</td>
        <td>Row 2</td>
      </tr>
      <tr>
        <td>Row 3</td>
        <td>Row 3</td>
        <td>Row 3</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleDesktop = `<div class="e-table-container">
  <table class="e-table">
    <thead>
      <tr>
        <th scope="col">Period</th>
        <th scope="col">Status</th>
        <th scope="col" class="e-text-right">Amount (kr)</th>
        <th scope="col" class="e-text-right">Invoice no.</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">January 2020</th>
        <td>Sent</td>
        <td class="e-text-right e-text-mono">567,98</td>
        <td class="e-text-right e-text-mono">1023456</td>
      </tr>
      <tr>
        <th scope="row">February 2020</th>
        <td>Paid</td>
        <td class="e-text-right e-text-mono">543,10</td>
        <td class="e-text-right e-text-mono">1234057</td>
      </tr>
      <tr>
        <th scope="row">March 2020</th>
        <td>Paid</td>
        <td class="e-text-right e-text-mono">568,98</td>
        <td class="e-text-right e-text-mono">1234058</td>
      </tr>
      <tr>
        <th scope="row">April 2020</th>
        <td>Sent</td>
        <td class="e-text-right e-text-mono">521,98</td>
        <td class="e-text-right e-text-mono">1236059</td>
      </tr>
      <tr>
        <th scope="row">May 2020</th>
        <td>Paid</td>
        <td class="e-text-right e-text-mono">556,98</td>
        <td class="e-text-right e-text-mono">1234060</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleMobile = `<div style="width: 305px; margin: 16px;">
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
        <th class="e-table-mobile__cell" scope="row">Amount (kr)</th>
        <td class="e-table-mobile__cell e-text-mono">567,98</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Invoice no.</th>
        <td class="e-table-mobile__cell e-text-mono">1023456</td>
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
        <th class="e-table-mobile__cell" scope="row">Amount (kr)</th>
        <td class="e-table-mobile__cell e-text-mono">543,10</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Invoice no.</th>
        <td class="e-table-mobile__cell e-text-mono">1234057</td>
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
        <th class="e-table-mobile__cell" scope="row">Amount (kr)</th>
        <td class="e-table-mobile__cell e-text-mono">568,98</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Invoice no.</th>
        <td class="e-table-mobile__cell e-text-mono">1234058</td>
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
        <th class="e-table-mobile__cell" scope="row">Amount (kr)</th>
        <td class="e-table-mobile__cell e-text-mono">521,98</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Invoice no.</th>
        <td class="e-table-mobile__cell e-text-mono">1234059</td>
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
        <th class="e-table-mobile__cell" scope="row">Amount (kr)</th>
        <td class="e-table-mobile__cell e-text-mono">556,98</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Invoice no.</th>
        <td class="e-table-mobile__cell e-text-mono">1234060</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleCompact = `<div class="e-table-container">
  <table class="e-table e-table--compact">
    <thead>
      <tr>
        <th scope="col">Period</th>
        <th scope="col">Status</th>
        <th scope="col" class="e-text-right">Amount (kr)</th>
        <th scope="col" class="e-text-right">Invoice no.</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">January 2020</th>
        <td>Sent</td>
        <td class="e-text-right e-text-mono">567,98</td>
        <td class="e-text-right e-text-mono">1023456</td>
      </tr>
      <tr>
        <th scope="row">February 2020</th>
        <td>Paid</td>
        <td class="e-text-right e-text-mono">543,10</td>
        <td class="e-text-right e-text-mono">1023456</td>
      </tr>
      <tr>
        <th scope="row">March 2020</th>
        <td>Paid</td>
        <td class="e-text-right e-text-mono">568,98</td>
        <td class="e-text-right e-text-mono">1023456</td>
      </tr>
      <tr>
        <th scope="row">April 2020</th>
        <td>Sent</td>
        <td class="e-text-right e-text-mono">521,98</td>
        <td class="e-text-right e-text-mono">1023456</td>
      </tr>
      <tr>
        <th scope="row">May 2020</th>
        <td>Paid</td>
        <td class="e-text-right e-text-mono">556,98</td>
        <td class="e-text-right e-text-mono">1023456</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleCompactMobile = `<div style="width: 305px; margin: 16px;">
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
        <th class="e-table-mobile__cell" scope="row">Amount (kr)</th>
        <td class="e-table-mobile__cell e-text-mono">567,98</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Invoice no.</th>
        <td class="e-table-mobile__cell e-text-mono">1023456</td>
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
        <th class="e-table-mobile__cell" scope="row">Amount (kr)</th>
        <td class="e-table-mobile__cell e-text-mono">543,10</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Invoice no.</th>
        <td class="e-table-mobile__cell e-text-mono">1023456</td>
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
        <th class="e-table-mobile__cell" scope="row">Amount (kr)</th>
        <td class="e-table-mobile__cell e-text-mono">568,98</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Invoice no.</th>
        <td class="e-table-mobile__cell e-text-mono">1023456</td>
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
        <th class="e-table-mobile__cell" scope="row">Amount (kr)</th>
        <td class="e-table-mobile__cell e-text-mono">521,98</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Invoice no.</th>
        <td class="e-table-mobile__cell e-text-mono">1023456</td>
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
        <th class="e-table-mobile__cell" scope="row">Amount (kr)</th>
        <td class="e-table-mobile__cell e-text-mono">556,98</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Invoice no.</th>
        <td class="e-table-mobile__cell e-text-mono">1023456</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleInput = `<div class="e-table-container">
  <table class="e-table">
    <thead>
      <tr>
        <th scope="col">CaseID</th>
        <th scope="col">Address</th>
        <th scope="col">Created</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="e-text-mono">203413222</td>
        <td class="e-table__input">
          <div class="e-input e-input--compact">
            <input id="normal" type="address1" placeholder="Address" />
          </div>
        </td>
        <td>15.01.2021</td>
      </tr>
      <tr>
        <td class="e-text-mono">203413222</td>
        <td class="e-table__input">
          <div class="e-input e-input--compact">
            <input id="normal" type="address1" placeholder="Address" />
          </div>
        </td>
        <td>15.01.2021</td>
      </tr>
      <tr>
        <td class="e-text-mono">203413222</td>
        <td class="e-table__input">
          <div class="e-input e-input--compact">
            <input id="normal" type="address1" placeholder="Address" />
          </div>
        </td>
        <td>15.01.2021</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleInputMobile = `<div style="width: 305px; margin: 16px;">
  <table class="e-table-mobile">
    <thead>
      <tr>
        <th class="e-table-mobile__cell" scope="col">CaseID</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell e-text-mono" scope="col">203413222</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Address</th>
        <td class="e-table-mobile__input">
          <div class="e-input e-input--compact">
            <input id="normal" type="address1" placeholder="Address" />
          </div>
        </td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Created</th>
        <td class="e-table-mobile__cell">15.01.2021</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell e-text-mono" scope="col">203413222</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Address</th>
        <td class="e-table-mobile__input">
          <div class="e-input e-input--compact">
            <input id="normal" type="address1" placeholder="Address" />
          </div>
        </td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Created</th>
        <td class="e-table-mobile__cell">15.01.2021</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleButton = `<div class="e-table-container">
  <table class="e-table">
    <thead>
      <tr>
        <th scope="col">CaseID</th>
        <th scope="col">Address</th>
        <th scope="col">Created</th>
        <th scope="col" class="e-text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="e-text-mono">203413222</td>
        <td>Elviaveien 3, 1230 Oslo</td>
        <td>15.01.2021</td>
        <td class="e-table__button">
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--edit"></i></span>
          </button>
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--bin"></i></span>
          </button>
        </td>
      </tr>
      <tr>
        <td class="e-text-mono">203413222</td>
        <td>Elviaveien 3, 1230 Oslo</td>
        <td>15.01.2021</td>
        <td class="e-table__button">
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--edit"></i></span>
          </button>
          <button class="e-btn e-btn--icon">
            <span class="e-btn__icon"><i class="e-icon e-icon--bin"></i></span>
          </button>
        </td>
      </tr>
      <tr>
        <td class="e-text-mono">203413222</td>
        <td>Elviaveien 3, 1230 Oslo</td>
        <td>15.01.2021</td>
        <td class="e-table__button">
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
        <th class="e-table-mobile__cell" scope="col">CaseID</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class="e-table-mobile__cell e-text-mono" scope="col">203413222</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Address</th>
        <td class="e-table-mobile__cell">Elviaveien 3, 1230 Oslo</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Created</th>
        <td class="e-table-mobile__cell">15.01.2021</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Actions</th>
        <td class="e-table-mobile__cell e-table-mobile__button">
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
        <th class="e-table-mobile__cell e-text-mono" scope="col">203413222</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Address</th>
        <td class="e-table-mobile__cell">Elviaveien 3, 1230 Oslo</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Created</th>
        <td class="e-table-mobile__cell">15.01.2021</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Actions</th>
        <td class="e-table-mobile__cell e-table-mobile__button">
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

  exampleCheckbox = `<div class="e-table-container">
  <table class="e-table">
    <thead>
      <tr class="e-table__checkbox">
        <th scope="col">
          <label class="e-checkbox e-checkbox--sm e-checkbox--indeterminate" for="overall-checkbox">
            <input type="checkbox" id="overall-checkbox">
            <span class="e-checkbox__mark"></span>
          </label>
        </th>
        <th scope="col">CaseID</th>
        <th scope="col">Address</th>
        <th scope="col">Created</th>
      </tr>
    </thead>
    <tbody>
      <tr class="e-table__checkbox e-table__checkbox--selected">
        <td>
          <label class="e-checkbox e-checkbox--sm" for="checkbox-first-cell">
            <input type="checkbox" id="checkbox-first-cell" checked>
            <span class="e-checkbox__mark"></span>
          </label>
        </td>
        <td class="e-text-mono">203413222</td>
        <td>Elviaveien 3, 1230 Oslo</td>
        <td>15.01.2021</td>
      </tr>
      <tr class="e-table__checkbox">
        <td>
          <label class="e-checkbox e-checkbox--sm" for="checkbox-second-cell">
            <input type="checkbox" id="checkbox-second-cell">
            <span class="e-checkbox__mark"></span>
          </label>
        </td>
        <td class="e-text-mono">203413222</td>
        <td>Elviaveien 3, 1230 Oslo</td>
        <td>15.01.2021</td>
      </tr>
      <tr class="e-table__checkbox">
        <td>
          <label class="e-checkbox e-checkbox--sm" for="checkbox-second-cell">
            <input type="checkbox" id="checkbox-second-cell">
            <span class="e-checkbox__mark"></span>
          </label>
        </td>
        <td class="e-text-mono">203413222</td>
        <td>Elviaveien 3, 1230 Oslo</td>
        <td>15.01.2021</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleCheckboxMobile = `<div style="width: 305px; margin: 16px;">
  <table class="e-table-mobile">
    <thead>
      <tr>
        <th class="e-table-mobile__cell" scope="col">CaseID</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr class="e-table-mobile__checkbox e-table-mobile__checkbox--selected">
        <th class="e-table-mobile__cell e-text-mono" scope="col">
          <label class="e-checkbox" for="checkbox-first-row-mb">
            <input type="checkbox" id="checkbox-first-row-mb" checked>
            <span class="e-checkbox__mark"></span>
          </label>
          203413222
        </th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Address</th>
        <td class="e-table-mobile__cell">Elviaveien 3, 1230 Oslo</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Created</th>
        <td class="e-table-mobile__cell">15.01.2021</td>
      </tr>
    </tbody>
    <tbody>
      <tr class="e-table-mobile__checkbox">
        <th class="e-table-mobile__cell e-text-mono" scope="col">
          <label class="e-checkbox" for="checkbox-second-row-mb">
            <input type="checkbox" id="checkbox-second-row-mb">
            <span class="e-checkbox__mark"></span>
          </label>
          203413222
        </th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Address</th>
        <td class="e-table-mobile__cell">Elviaveien 3, 1230 Oslo</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Created</th>
        <td class="e-table-mobile__cell">15.01.2021</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleSelect = `<div class="e-table-container">
  <table class="e-table">
    <thead>
      <tr>
        <th scope="col">CaseID</th>
        <th scope="col">Address</th>
        <th scope="col">Created</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr class="e-table__select" [routerLink]="['/components/table']">
        <td class="e-text-mono">203413222</td>
        <td>Elviaveien 3, 1230 Oslo</td>
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
      <tr class="e-table__select" [routerLink]="['/components/table']">
        <td class="e-text-mono">203413222</td>
        <td>Elviaveien 3, 1230 Oslo</td>
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
      <tr class="e-table__select" [routerLink]="['/components/table']">
        <td class="e-text-mono">203413222</td>
        <td>Elviaveien 3, 1230 Oslo</td>
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

  exampleSelectMobile = `<div style="width: 305px; margin: 16px;">
  <table class="e-table-mobile">
    <thead>
      <tr>
        <th class="e-table-mobile__cell" scope="col">CaseID</th>
        <th class="e-table-mobile__cell" scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr class="e-table-mobile__select" [routerLink]="['/components/table']">
        <th class="e-table-mobile__cell e-text-mono" scope="col">203413222</th>
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
        <th class="e-table-mobile__cell" scope="row">Address</th>
        <td class="e-table-mobile__cell">Elviaveien 3, 1230 Oslo</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Created</th>
        <td class="e-table-mobile__cell">15.01.2021</td>
      </tr>
    </tbody>
    <tbody>
      <tr class="e-table-mobile__select" [routerLink]="['/components/table']">
        <th class="e-table-mobile__cell e-text-mono" scope="col">203413222</th>
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
        <th class="e-table-mobile__cell" scope="row">Address</th>
        <td class="e-table-mobile__cell">Elviaveien 3, 1230 Oslo</td>
      </tr>
      <tr>
        <th class="e-table-mobile__cell" scope="row">Created</th>
        <td class="e-table-mobile__cell">15.01.2021</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleNumbers = `<div class="e-table-container">
  <table class="e-table">
    <thead>
      <tr>
        <th scope="col">Amount (kr)</th>
        <th scope="col" class="e-text-right">Invoice no.</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="e-text-mono">567,98</td>
        <td class="e-text-right e-text-mono">1304456</td>
      </tr>
      <tr>
        <td class="e-text-mono">543,10</td>
        <td class="e-text-right e-text-mono">3403457</td>
      </tr>
      <tr>
        <td class="e-text-mono">568,98</td>
        <td class="e-text-right e-text-mono">6734508</td>
      </tr>
      <tr>
        <td class="e-text-mono">521,98</td>
        <td class="e-text-right e-text-mono">1330459</td>
      </tr>
      <tr>
        <td class="e-text-mono">556,98</td>
        <td class="e-text-right e-text-mono">1234060</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleLongColumn = `<div class="e-table-container">
  <table class="e-table">
    <thead>
      <tr>
        <th scope="col">Period</th>
        <th scope="col">Status</th>
        <th scope="col" class="e-text-right">Amount (kr)</th>
        <th scope="col" class="e-text-right">Invoice no.</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" class="e-table__cell--multiline">This cell exceeds 450px in width, so the class 'e-table__cell--multiline' should be added to break the lines.</th>
        <td>Sent</td>
        <td class="e-text-right e-text-mono">567,98</td>
        <td class="e-text-right e-text-mono">1023456</td>
      </tr>
      <tr>
        <th scope="row">February 2020</th>
        <td>Paid</td>
        <td class="e-text-right e-text-mono">543,10</td>
        <td class="e-text-right e-text-mono">1023456</td>
      </tr>
      <tr>
        <th scope="row">March 2020</th>
        <td>Paid</td>
        <td class="e-text-right e-text-mono">568,98</td>
        <td class="e-text-right e-text-mono">1023456</td>
      </tr>
      <tr>
        <th scope="row">April 2020</th>
        <td>Sent</td>
        <td class="e-text-right e-text-mono">521,98</td>
        <td class="e-text-right e-text-mono">1023456</td>
      </tr>
      <tr>
        <th scope="row">May 2020</th>
        <td>Paid</td>
        <td class="e-text-right e-text-mono">556,98</td>
        <td class="e-text-right e-text-mono">1023456</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleAlignment = `<div class="e-table-container">
  <table class="e-table">
    <thead>
      <tr>
        <th scope="col" class="e-text-left">Left-aligned text</th>
        <th scope="col" class="e-text-center">Centered text</th>
        <th scope="col" class="e-text-right">Right-aligned text</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="e-text-left">Left</td>
        <td class="e-text-center">Center</td>
        <td class="e-text-right">Right</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  exampleFootnote = `<div class="e-table-container">
  <table class="e-table">
    <thead>
      <tr>
        <th scope="col">CaseID*</th>
        <th scope="col">Address</th>
        <th scope="col">Created</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="e-text-mono">203413222</td>
        <td>Elviaveien 3, 1230 Oslo</td>
        <td>15.01.2021</td>
      </tr>
      <tr>
        <td class="e-text-mono">203413222</td>
        <td>Elviaveien 3, 1230 Oslo</td>
        <td>15.01.2021</td>
      </tr>
      <tr>
        <td class="e-text-mono">203413222</td>
        <td>Elviaveien 3, 1230 Oslo</td>
        <td>15.01.2021</td>
      </tr>
    </tbody>
  </table>
</div>
<div class="e-table__footnote">*If you include a footnote to your table, it should look like this</div>
`;

  exampleNoStripes = `<div class="e-table-container">
  <table class="e-table e-table--no-stripes">
    <thead>
      <tr>
        <th scope="col">CaseID</th>
        <th scope="col">Address</th>
        <th scope="col">Created</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="e-text-mono">203413222</td>
        <td>Elviaveien 3, 1230 Oslo</td>
        <td>15.01.2021</td>
      </tr>
      <tr>
        <td class="e-text-mono">203413222</td>
        <td>Elviaveien 3, 1230 Oslo</td>
        <td>15.01.2021</td>
      </tr>
      <tr>
        <td class="e-text-mono">203413222</td>
        <td>Elviaveien 3, 1230 Oslo</td>
        <td>15.01.2021</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  toggleAccordion(id: string): void {
    const element = document.getElementById(id) as HTMLElement;
    if (element) {
      if (element.classList.contains('e-accordion__item--open')) {
        element.classList.remove('e-accordion__item--open');
      } else {
        element.classList.add('e-accordion__item--open');
      }
    }
  }
}
