import { Component, OnInit } from '@angular/core';
import { getUtilities } from 'src/app/shared/e-items';

@Component({
  selector: 'app-grid-doc',
  templateUrl: './grid-doc.component.html',
  styleUrls: ['./grid-doc.component.scss']
})
export class GridDocComponent implements OnInit {

  componentClasses = ['e-grid'];
  componentStatus = getUtilities('grid-doc').status;

  example1 = `<div class="e-grid e-bg-grey-20">
  <div class="row">
    <div class="col">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of three columns
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of three columns
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of three columns
      </div>
    </div>
  </div>
</div>
  `;

  example2 = `<div class="e-grid e-bg-grey-20">
  <div class="row e-grid-margin">
    <div class="col">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of three columns
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of three columns
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of three columns
      </div>
    </div>
  </div>
</div>
  `;

  example3 = `<div class="e-grid e-bg-grey-20">
  <div class="row no-gutters">
    <div class="col">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        1/4
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        2/4
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        3/4
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        4/4
      </div>
    </div>
  </div>
</div>
`;

  example4 = `<div class="e-grid e-bg-grey-20">
  <div class="row">
    <div class="col-sm-7 col-md-6 col-lg-8">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        1
      </div>
    </div>
    <div class="col-sm-5 col-md-6 col-lg-4">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        2
      </div>
    </div>
  </div>
</div>
`;

  example5 = `<div class="e-grid e-bg-grey-20">
  <div class="row justify-content-center">
    <div class="col-4">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of two columns
      </div>
    </div>
    <div class="col-4">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of two columns
      </div>
    </div>
  </div>
  <div class="row align-items-end" style="height: 100px;">
    <div class="col-4">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of two columns
      </div>
    </div>
    <div class="col-4">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of two columns
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-4">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of two columns
      </div>
    </div>
    <div class="col-4 offset-3">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of two columns
      </div>
    </div>
  </div>
</div>
`;

  example6 = `<div class="e-grid e-bg-grey-20">
  <div class="row">
    <div class="col">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        First in DOM, no order applied
      </div>
    </div>
    <div class="col order-12">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        Second in DOM, with a larger order
      </div>
    </div>
    <div class="col order-1">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        Third in DOM, with an order of 1
      </div>
    </div>
  </div>
</div>
`;

  example7 = `<div class="e-grid e-bg-grey-20">
  <div class="row">
    <div class="col-6">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        <div>
          Level 1: .col-6
        </div>
        <div class="row">
          <div class="col-8 col-sm-6">
            <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
              Level 2: .col-8 .col-sm-6
            </div>
          </div>
          <div class="col-4 col-sm-6">
            <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
              Level 2: .col-4 .col-sm-6
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        <div>
          Level 1: .col-6
        </div>
        <div class="row">
          <div class="col-8 col-sm-6">
            <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
              Level 2: .col-8 .col-sm-6
            </div>
          </div>
          <div class="col-4 col-sm-6">
            <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
              Level 2: .col-4 .col-sm-6
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

  constructor() { }

  ngOnInit() {
  }

}
