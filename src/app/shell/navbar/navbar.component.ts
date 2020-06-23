import { Component, Input, OnInit } from '@angular/core';
import { EItems } from 'src/app/shared/e-items.interface';
import { GlobalService } from 'src/app/core/services/global.service';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { NavbarAnchor } from 'src/app/shared/navbarAnchor.interface';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,
    private scrollService: ScrollService,
  ) {
    this.scrollService.listenAnchorAtCurrPos().subscribe((anchor: NavbarAnchor) => {
      this.activeAnchor = anchor;
    });
    this.scrollService.listenAnchors().subscribe((anchors: NavbarAnchor[]) => {
      this.navbarAnchors = anchors;
      this.navbarItems.forEach((item) => {
        let currentRoute = this.router.url.slice(this.router.url.lastIndexOf('/') + 1);
        currentRoute = currentRoute.slice(0, currentRoute.indexOf('#'));
        if (item.docUrl === currentRoute) {
          this.activeNavbarItem = item;
        }
      });

      this.route.fragment.subscribe(fragment => {
        if (fragment) {
          this.navbarAnchors.forEach(anchor => {
            if (anchor.title.toLocaleLowerCase().replace(/\s/g, '') === fragment.toLocaleLowerCase().replace(/\s/g, '')) {
              this.activeAnchor = anchor;
              this.scrollService.scrollToElement(anchor.top);
            }
          });
        } else {
          this.activeAnchor = this.navbarAnchors[0];
        }
      });
    });
  }


  ngOnInit(): void {
    this.filteredPages = this.navbarItems.filter((page) => {
      return page.status !== 'Coming';
    });
    // this.route.fragment.subscribe(fragment => {
    //   if (fragment) {
    //     console.log(fragment);
    //     this.navbarAnchors.forEach(anchor => {
    //       console.log(anchor.title);
    //       if (anchor.title.toLocaleLowerCase() === fragment) {
    //         window.scrollTo({
    //           top: anchor.top,
    //           behavior: 'smooth',
    //         });
    //       }
    //     });
    //     //document.querySelector('#' + fragment).scrollIntoView();
    //   }
    // });
  }

  showWarning(): boolean {
    return this.globalService.headerWarning.show;
  }

  markNewActiveAnchor(navbarItem: EItems): void {
    if (navbarItem === this.activeNavbarItem) {
      return;
    }
    this.prevNavbarAnchors = this.navbarAnchors;
    this.prevActiveNavbarItem = this.activeNavbarItem;
    this.activeNavbarItem = navbarItem;
  }

  scrollToElement(anchor: NavbarAnchor): void {
    this.activeAnchor = anchor;
    this.scrollService.newAnchorToScrollTo(anchor);
  }
}
