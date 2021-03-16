import { Component } from '@angular/core';
import { getIdentity } from 'src/app/shared/e-items';

@Component({
  selector: 'app-logo-doc',
  templateUrl: './logo-doc.component.html',
  styleUrls: ['./logo-doc.component.scss'],
})
export class LogoDocComponent {
  figmaUrl = getIdentity('logo').figmaUrl;
  description = getIdentity('logo').description;
  isInverted = false;
  isInverted2 = false;
  isInverted3 = false;
  isInverted4 = false;
  isInvertedFav = false;

  loadedLogo = false;

  faviconTS = `test`;
  faviconHTML = `<link id="favicon" rel="icon" href="/favicon.ico" type="image/x-icon">
`;

  toggleInverted(asset: string): void {
    if (asset === 'isInverted') {
      this.isInverted = !this.isInverted;
    }
    if (asset === 'isInverted2') {
      this.isInverted2 = !this.isInverted2;
    }
    if (asset === 'isInverted3') {
      this.isInverted3 = !this.isInverted3;
    }
    if (asset === 'isInverted4') {
      this.isInverted4 = !this.isInverted4;
    }
    if (asset === 'isInvertedFav') {
      this.isInvertedFav = !this.isInvertedFav;
    }
  }

  hideContentLoader(evt: any): void {
    if (evt && evt.target) {
      this.loadedLogo = true;
    }
  }
}
