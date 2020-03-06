import { Component, OnInit, Input } from '@angular/core';
import { eHomes, eComponents, eUtilities, eAccessibility } from 'src/app/shared/e-items';
import { EItems } from 'src/app/shared/e-items.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() listHeader = 'Title';
  @Input() sidebarList: EItems[];

  constructor() { }

  ngOnInit() {
  }
}
