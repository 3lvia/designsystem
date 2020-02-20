import { Component, OnInit } from '@angular/core';
import { elvisComponents, elvisUtilities } from 'src/app/shared/elvis-items';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  elvisComponents = elvisComponents;

  elvisUtilities = elvisUtilities;

  constructor() { }

  ngOnInit() {
  }

}
