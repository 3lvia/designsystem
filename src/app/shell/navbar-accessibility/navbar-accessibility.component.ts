import { Component, OnInit } from '@angular/core';
import { eAccessibility } from 'src/app/shared/e-items';

@Component({
  selector: 'app-navbar-accessibility',
  templateUrl: './navbar-accessibility.component.html',
  styleUrls: ['../navbar-style.scss']
})
export class NavbarAccessibilityComponent implements OnInit {

  eAccessibility = eAccessibility;

  constructor() { }

  ngOnInit() {
  }

}
