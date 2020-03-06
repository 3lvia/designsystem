import { Component, OnInit } from '@angular/core';
import { eUtilities } from 'src/app/shared/e-items';

@Component({
  selector: 'app-utilities-start',
  templateUrl: './utilities-start.component.html',
  styleUrls: ['./utilities-start.component.scss']
})
export class UtilitiesStartComponent implements OnInit {

  pages = eUtilities;

  constructor() { }

  ngOnInit() {
  }

}
