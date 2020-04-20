import { Component, OnInit } from '@angular/core';
import { getUtilities } from 'src/app/shared/e-items';

@Component({
  selector: 'app-logo-doc',
  templateUrl: './logo-doc.component.html',
  styleUrls: ['./logo-doc.component.scss']
})
export class LogoDocComponent implements OnInit {

  componentStatus = getUtilities('logo-doc').status;
  externalUrl = getUtilities('logo-doc').externalUrl;

  constructor() { }

  ngOnInit() {
  }

}
