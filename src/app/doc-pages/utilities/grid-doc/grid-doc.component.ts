import { Component, OnInit } from '@angular/core';
import { getUtilities } from 'src/app/shared/e-items';

@Component({
  selector: 'app-grid-doc',
  templateUrl: './grid-doc.component.html',
  styleUrls: ['./grid-doc.component.scss']
})
export class GridDocComponent implements OnInit {

  componentStatus = getUtilities('grid-doc').status;

  example1 = `<div class="e-grid">
  <div class="e-bg-grey-10">
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
</div>
  `;

  example2 = `<div class="e-grid">
  <div class="e-bg-grey-10">
    <div class="row e-m-0">
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
</div>
`;

  constructor() { }

  ngOnInit() {
  }

}
