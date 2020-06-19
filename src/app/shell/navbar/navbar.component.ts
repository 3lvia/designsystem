import { Component, Input, OnInit } from '@angular/core';
import { EItems } from 'src/app/shared/e-items.interface';
import { GlobalService } from 'src/app/core/services/global.service';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { NavbarAnchor } from 'src/app/shared/navbarAnchor.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() navbarItems: EItems[];

  navbarAnchors: NavbarAnchor[] = [];
  prevNavbarAnchors: NavbarAnchor[] = [];
  activeNavbarItem: EItems;
  prevActiveNavbarItem: EItems;

  filteredPages: EItems[];
  toggleMenu = false;
  activeAnchor: NavbarAnchor;

  constructor(private router: Router, private globalService: GlobalService, private scrollService: ScrollService) {
    this.scrollService.listenAnchorAtCurrPos().subscribe((anchor: NavbarAnchor) => {
      this.activeAnchor = anchor;
    });
    this.scrollService.listenAnchors().subscribe((anchors: NavbarAnchor[]) => {
      this.navbarAnchors = anchors;
      this.activeAnchor = this.navbarAnchors[0];
      this.navbarItems.forEach((item) => {
        if (item.docUrl === this.router.url.slice(this.router.url.lastIndexOf('/') + 1)) {
          this.activeNavbarItem = item;
        }
      });
    });
  }


  ngOnInit(): void {
    this.filteredPages = this.navbarItems.filter((page) => {
      return page.status !== 'Coming';
    });
  }

  showWarning(): boolean {
    return this.globalService.headerWarning.show;
  }

  markNewActiveAnchor(navbarItem: EItems): void {
    this.prevNavbarAnchors = this.navbarAnchors;
    this.prevActiveNavbarItem = this.activeNavbarItem;
    this.activeNavbarItem = navbarItem;
  }

  scrollToElement(anchor: NavbarAnchor): void {
    this.activeAnchor = anchor;
    this.scrollService.newAnchorToScrollTo(anchor);
  }
}
