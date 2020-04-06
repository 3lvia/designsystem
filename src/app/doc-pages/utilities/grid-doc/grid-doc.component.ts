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

  example1 = `<div class="e-grid e-bg-grey-10">
  <div class="row">
    <div class="col e-bg-grey-40">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of three columns
      </div>
    </div>
    <div class="col e-bg-grey-40">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of three columns
      </div>
    </div>
    <div class="col e-bg-grey-40">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of three columns
      </div>
    </div>
  </div>
</div>
  `;

  example2 = `<div class="e-grid e-bg-grey-10">
  <div class="row e-no-margin e-no-gutters">
    <div class="col e-bg-grey-40">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        1/4
      </div>
    </div>
    <div class="col e-bg-grey-40">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        2/4
      </div>
    </div>
    <div class="col e-bg-grey-40">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        3/4
      </div>
    </div>
    <div class="col e-bg-grey-40">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        4/4
      </div>
    </div>
  </div>
</div>
`;

  example3 = `<div class="e-grid e-bg-grey-10">
  <div class="row e-m-0">
    <div class="col-sm-7 col-md-6 col-lg-8 e-bg-grey-40">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        1
      </div>
    </div>
    <div class="col-sm-5 col-md-6 col-lg-4 e-bg-grey-40">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        2
      </div>
    </div>
  </div>
</div>
`;

  example4 = `<div class="e-grid e-bg-grey-10">
  <div class="row justify-content-center">
    <div class="col-4 e-bg-grey-40">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of two columns
      </div>
    </div>
    <div class="col-4 e-bg-grey-40">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of two columns
      </div>
    </div>
  </div>
  <div class="row align-items-end" style="height: 100px;">
    <div class="col-4 e-bg-grey-40">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of two columns
      </div>
    </div>
    <div class="col-4 e-bg-grey-40">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of two columns
      </div>
    </div>
  </div>
  <div class="row e-no-margin">
    <div class="col-4 e-bg-grey-40">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of two columns
      </div>
    </div>
    <div class="col-4 offset-3 e-bg-grey-40">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        One of two columns
      </div>
    </div>
  </div>
</div>
`;

  example5 = `<div class="e-grid e-bg-grey-10">
  <div class="row">
    <div class="col e-bg-grey-40">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        First in DOM, no order applied
      </div>
    </div>
    <div class="col order-12 e-bg-grey-40">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        Second in DOM, with a larger order
      </div>
    </div>
    <div class="col order-1 e-bg-grey-40">
      <div class="e-bg-grey-70 e-p-2" style="border: 1px solid black;">
        Third in DOM, with an order of 1
      </div>
    </div>
  </div>
</div>
`;

  constructor() { }

  ngOnInit() {
  }

}
