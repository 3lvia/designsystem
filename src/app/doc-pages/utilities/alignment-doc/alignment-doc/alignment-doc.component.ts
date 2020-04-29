import { Component, OnInit } from '@angular/core';
import { getUtilities } from 'src/app/shared/e-items';

@Component({
  selector: 'app-alignment-doc',
  templateUrl: './alignment-doc.component.html',
  styleUrls: ['./alignment-doc.component.scss']
})
export class AlignmentDocComponent implements OnInit {

  componentStatus = getUtilities('alignment-doc').status;

  example1 = `<div class="e-align-left e-m-16">Left aligned text</div>
<div class="e-align-right e-m-16">Right aligned text</div>
<div class="e-align-center e-m-16">Center aligned text</div>
`;

  constructor() { }

  ngOnInit() {
  }

}
