import { Component, OnInit, Input } from '@angular/core';
import { EItems } from 'src/app/shared/e-items.interface';
import { slideIn } from 'src/app/shared/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [ slideIn ]
})
export class NavbarComponent implements OnInit {

  @Input() listHeader = 'Title';
  @Input() sidebarList: EItems[];

  constructor() { }

  ngOnInit() {
  }
}
