import { Component, OnInit } from '@angular/core';
import { eIdentity } from 'src/app/shared/e-items';

@Component({
  selector: 'app-overview-identity',
  templateUrl: './overview-identity.component.html',
  styleUrls: ['./overview-identity.component.scss'],
})
export class OverviewIdentityComponent implements OnInit {
  overviewTitle = 'Identity';
  pages = eIdentity;
  brandPages = [];
  layoutPages = [];
  loadedImg = false;

  ngOnInit(): void {
    this.brandPages = this.pages.filter(page => {
      return page.title === 'Typography' || page.title === 'Icons' || page.title === 'Logo';
    });
    this.layoutPages = this.pages.filter(page => {
      return page.title === 'Grid' || page.title === 'Spacing' || page.title === 'Shadow';
    });
  }


  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  hideContentLoader(evt: any): void {
    if (evt && evt.target) {
      this.loadedImg = true;
      const indentityIllustration = document.getElementById('identity-illustration');
      indentityIllustration.classList.remove('e-none');
    }
  }
}
