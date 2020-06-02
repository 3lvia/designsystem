import { Component, OnInit } from '@angular/core';
import { getUtilities } from 'src/app/shared/e-items';

@Component({
  selector: 'app-faq-doc',
  templateUrl: './faq-doc.component.html',
  styleUrls: ['./faq-doc.component.scss']
})
export class FaqDocComponent implements OnInit {

  componentStatus = getUtilities('faq-doc').status;

  constructor() { }

  ngOnInit() {
  }

}
