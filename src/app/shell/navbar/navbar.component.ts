import { Component, OnInit, Input } from '@angular/core';
import { EItems } from 'src/app/shared/e-items.interface';
import { slideIn } from 'src/app/shared/animations';
import { GlobalService } from 'src/app/core/services/global.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [ slideIn ]
})
export class NavbarComponent implements OnInit {

  @Input() listHeader = 'Title';
  @Input() sidebarList: EItems[];

  toggleMenu = false;

  constructor(private globalService: GlobalService) {}

  showWarning() {
    return this.globalService.headerWarning.show;
  }

  showMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

  ngOnInit() {
  }

}
