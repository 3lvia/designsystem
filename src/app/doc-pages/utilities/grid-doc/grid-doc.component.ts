import { Component } from '@angular/core';
import { getUtilities } from 'src/app/shared/e-items';
import { TabNames } from 'src/app/shared/tab-names.enums';

@Component({
  selector: 'app-grid-doc',
  templateUrl: './grid-doc.component.html',
  styleUrls: ['./grid-doc.component.scss'],
})
export class GridDocComponent {
  tabNames = TabNames;
  componentStatus = getUtilities('grid-doc').status;
  externalUrl = getUtilities('grid-doc').externalUrl;

  example9 = `<div class="e-grid e-bg-grey-20">
  <div class="row mx-lg-n4 mx-md-n3 mx-sm-n2 e-grid-margin">
    <div class="col px-lg-4 px-md-3 px-sm-2">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        1
      </div>
    </div>
    <div class="col px-lg-4 px-md-3 px-sm-2">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        2
      </div>
    </div>
    <div class="col px-lg-4 px-md-3 px-sm-2">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        3
      </div>
    </div>
    <div class="col px-lg-4 px-md-3 px-sm-2">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        4
      </div>
    </div>
    <div class="col px-lg-4 px-md-3 px-sm-2">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        5
      </div>
    </div>
    <div class="col px-lg-4 px-md-3 px-sm-2">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        6
      </div>
    </div>
    <div class="col px-lg-4 px-md-3 px-sm-2">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        7
      </div>
    </div>
    <div class="col px-lg-4 px-md-3 px-sm-2">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        8
      </div>
    </div>
    <div class="col px-lg-4 px-md-3 px-sm-2">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        9
      </div>
    </div>
    <div class="col px-lg-4 px-md-3 px-sm-2">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        10
      </div>
    </div>
    <div class="col px-lg-4 px-md-3 px-sm-2">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        11
      </div>
    </div>
    <div class="col px-lg-4 px-md-3 px-sm-2">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        12
      </div>
    </div>
  </div>
</div>
  `;

  example1 = `<div class="e-grid e-bg-grey-20">
  <div class="row">
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        One of three columns
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        One of three columns
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        One of three columns
      </div>
    </div>
  </div>
</div>
  `;

  example2 = `<div class="e-grid e-bg-grey-20">
  <div class="row e-grid-margin">
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        One of three columns
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        One of three columns
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        One of three columns
      </div>
    </div>
  </div>
</div>
  `;

  example3 = `<div class="e-grid e-bg-grey-20">
  <div class="row mx-lg-n3 mx-md-n2 mx-sm-n1 mx-n1">
    <div class="col px-lg-3 px-md-2 px-sm-1 px-1">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        One of three columns
      </div>
    </div>
    <div class="col px-lg-3 px-md-2 px-sm-1 px-1">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        One of three columns
      </div>
    </div>
    <div class="col px-lg-3 px-md-2 px-sm-1 px-1">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        One of three columns
      </div>
    </div>
  </div>
</div>
  `;

  example4 = `<div class="e-grid e-bg-grey-20">
  <div class="row no-gutters">
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        1/4
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        2/4
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        3/4
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        4/4
      </div>
    </div>
  </div>
</div>
`;

  example5 = `<div class="e-grid e-bg-grey-20">
  <div class="row">
    <div class="col-sm-7 col-md-6 col-lg-8">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        1
      </div>
    </div>
    <div class="col-sm-5 col-md-6 col-lg-4">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        2
      </div>
    </div>
  </div>
</div>
`;

  example6 = `<div class="e-grid e-bg-grey-20">
  <div class="row justify-content-center">
    <div class="col-5">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        Column
      </div>
    </div>
    <div class="col-5">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        Column
      </div>
    </div>
  </div>
  <div class="row align-items-end" style="height: 100px;">
    <div class="col-5">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        Column
      </div>
    </div>
    <div class="col-5">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        Column
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-5">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        Column
      </div>
    </div>
    <div class="col-5 offset-3">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        Column
      </div>
    </div>
  </div>
</div>
`;

  example7 = `<div class="e-grid e-bg-grey-20">
  <div class="row">
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        First in DOM, no order applied
      </div>
    </div>
    <div class="col order-12">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        Second in DOM, with a larger order
      </div>
    </div>
    <div class="col order-1">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        Third in DOM, with an order of 1
      </div>
    </div>
  </div>
</div>
`;

  example8 = `<div class="e-grid e-bg-grey-20">
  <div class="row mx-lg-n3 mx-n1">
    <div class="col-6 px-lg-3 px-1">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        <div>
          Level 1
        </div>
        <div class="row">
          <div class="col-lg-6 col-12">
            <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
              Level 2
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
              Level 2
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 px-lg-3 px-1">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        <div>
          Level 1
        </div>
        <div class="row">
          <div class="col-lg-6 col-12">
            <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
              Level 2
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
              Level 2
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
}
