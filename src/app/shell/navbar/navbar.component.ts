import { Component, OnInit } from '@angular/core';
import { eComponents, eUtilities, eAccessibility } from 'src/app/shared/e-items';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  eComponents = eComponents;
  eUtilities = eUtilities;
  eAccessibility = eAccessibility;

  constructor() { }

  ngOnInit() {
  }

}
