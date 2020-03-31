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
  componentClasses = ['e-table'];

  example1 = `<table class="e-table is-striped has-shadow">
  <tr class="e-table_header">
    <th>ID<i class="far fa-arrow-up"></i></th>
    <th>Kundenr.<i class="far fa-arrow-up"></i></th>
    <th>Personnr.</th>
    <th>Fakturanr.<i class="far fa-arrow-up"></i></th>
    <th></th>
  </tr>
  <tr>
    <td>1</td>
    <td>338472</td>
    <td>123419384</td>
    <td>14</td>
    <td class="e-table_action">
      <i class="far fa-angle-down"></i>
      <i class="far fa-ellipsis-v"></i>
      <button class="e-button">Submit</button>
    </td>
  </tr>
  <tr>
    <td>2</td>
    <td>338472</td>
    <td>123419384</td>
    <td>14</td>
    <td class="e-table_action">
      <i class="far fa-angle-down"></i>
      <i class="far fa-ellipsis-v"></i>
      <button class="e-button">Submit</button>
    </td>
  </tr>
  <tr>
    <td>3</td>
    <td>338472</td>
    <td>123419384</td>
    <td>14</td>
    <td class="e-table_action">
      <i class="far fa-angle-down"></i>
      <i class="far fa-ellipsis-v"></i>
      <button class="e-button">Submit</button>
    </td>
  </tr>
</table>
`;

  example2 = `<div class="example-container-to-force-scroll">
  <table class="e-table is-striped has-shadow is-sticky-header">
    <tr class="e-table_header">
      <th>ID<i class="far fa-arrow-up"></i></th>
      <th>Kundenr.<i class="far fa-arrow-up"></i></th>
      <th>Personnr.</th>
      <th>Fakturanr.<i class="far fa-arrow-up"></i></th>
      <th></th>
    </tr>
    <tr>
      <td>1</td>
      <td>338472</td>
      <td>123419384</td>
      <td>14</td>
      <td class="e-table_action">
        <i class="far fa-angle-down"></i>
        <i class="far fa-ellipsis-v"></i>
        <button class="e-button">Submit</button>
      </td>
    </tr>
    <tr>
      <td>2</td>
      <td>338472</td>
      <td>123419384</td>
      <td>14</td>
      <td class="e-table_action">
        <i class="far fa-angle-down"></i>
        <i class="far fa-ellipsis-v"></i>
        <button class="e-button">Submit</button>
      </td>
    </tr>
    <tr>
      <td>3</td>
      <td>338472</td>
      <td>123419384</td>
      <td>14</td>
      <td class="e-table_action">
        <i class="far fa-angle-down"></i>
        <i class="far fa-ellipsis-v"></i>
        <button class="e-button">Submit</button>
      </td>
    </tr>
    <tr>
      <td>4</td>
      <td>338472</td>
      <td>123419384</td>
      <td>14</td>
      <td class="e-table_action">
        <i class="far fa-angle-down"></i>
        <i class="far fa-ellipsis-v"></i>
        <button class="e-button">Submit</button>
      </td>
    </tr>
    <tr>
      <td>5</td>
      <td>338472</td>
      <td>123419384</td>
      <td>14</td>
      <td class="e-table_action">
        <i class="far fa-angle-down"></i>
        <i class="far fa-ellipsis-v"></i>
        <button class="e-button">Submit</button>
      </td>
    </tr>
  </table>
</div>
`;

  constructor() { }

  ngOnInit() {
  }

}
