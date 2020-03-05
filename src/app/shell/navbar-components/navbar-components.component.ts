import { Component, OnInit } from '@angular/core';
import { eComponents } from 'src/app/shared/e-items';

@Component({
  selector: 'app-navbar-components',
  templateUrl: './navbar-components.component.html',
  styleUrls: ['../navbar-style.scss']
})
export class NavbarComponentsComponent implements OnInit {

  eComponents = eComponents;


  constructor() { }

  ngOnInit() {
  }

}
