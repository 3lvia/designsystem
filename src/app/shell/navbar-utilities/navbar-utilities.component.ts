import { Component, OnInit } from '@angular/core';
import { eUtilities } from 'src/app/shared/e-items';

@Component({
  selector: 'app-navbar-utilities',
  templateUrl: './navbar-utilities.component.html',
  styleUrls: ['../navbar-style.scss']
})
export class NavbarUtilitiesComponent implements OnInit {

  eUtilities = eUtilities;

  constructor() { }

  ngOnInit() {
  }

}
