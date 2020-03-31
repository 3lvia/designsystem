import { Component, OnInit } from '@angular/core';
import { getUtilities } from 'src/app/shared/e-items';

@Component({
  selector: 'app-grid-doc',
  templateUrl: './grid-doc.component.html',
  styleUrls: ['./grid-doc.component.scss']
})
export class GridDocComponent implements OnInit {

  componentStatus = getUtilities('grid-doc').status;

  example1 = `<div class="e-bg-green">
  <div class="row">
    <div class="col-sm e-bg-yellow">
      <div class="e-bg-green" style="border: 1px solid black">
        One of three columns
      </div>
    </div>
    <div class="col-sm e-bg-yellow">
      <div class="e-bg-green" style="border: 1px solid black">
        One of three columns
      </div>
    </div>
    <div class="col-sm e-bg-yellow">
      <div class="e-bg-green" style="border: 1px solid black">
        One of three columns
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col e-bg-yellow">
      <div class="e-bg-green" style="border: 1px solid black">
        1/4
      </div>
    </div>
    <div class="col e-bg-yellow">
      <div class="e-bg-green" style="border: 1px solid black">
        2/4
      </div>
    </div>
    <div class="col e-bg-yellow">
      <div class="e-bg-green" style="border: 1px solid black">
        3/4
      </div>
    </div>
    <div class="col e-bg-yellow">
      <div class="e-bg-green" style="border: 1px solid black">
        4/4
      </div>
    </div>
  </div>
</div>
`;

  example2 = `<div class="e-bg-green">
  <div class="row">
    <div class="col-sm-9 e-bg-yellow">
      <div class="e-bg-green" style="border: 1px solid black">
        Level 1: .col-sm-9
        <div class="row">
          <div class="col-8 col-sm-6 e-bg-yellow"">
            <div class="e-bg-green" style="border: 1px solid black">
              Level 2: .col-8 .col-sm-6
            </div>
          </div>
          <div class="col-4 col-sm-6 e-bg-yellow"">
            <div class="e-bg-green" style="border: 1px solid black">
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
