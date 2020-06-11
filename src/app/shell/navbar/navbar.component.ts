import { Component, Input } from '@angular/core';
import { EItems } from 'src/app/shared/e-items.interface';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() navbarItems: EItems[];
  filteredPages: EItems[];

  toggleMenu = false;

  constructor(private globalService: GlobalService) { }


  ngOnInit(): void {
    this.filteredPages = this.navbarItems.filter((page) => {
      return page.status !== 'Coming';
    });
  }

  showWarning(): boolean {
    return this.globalService.headerWarning.show;
  }

  showMenu(): void {
    this.toggleMenu = !this.toggleMenu;
  }
}
