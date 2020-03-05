import { Component, OnInit } from '@angular/core';
import { eHomes, eComponents, eUtilities, eAccessibility } from 'src/app/shared/e-items';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit  {

  eHomes = eHomes;
  eComponents = eComponents;
  eUtilities = eUtilities;
  eAccessibility = eAccessibility;

  constructor() { }

  ngOnInit() {
  }
}
