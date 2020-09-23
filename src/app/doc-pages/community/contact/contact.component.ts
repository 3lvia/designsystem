import { Component } from '@angular/core';
import { getCommunity } from 'src/app/shared/e-items';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  description = getCommunity('contact').description;
  loadedImgMic = false;
  loadedImgPat = false;
  loadedImgFri = false;
  loadedImgMar = false;
  loadedImgHil = false;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  hideContentLoaderMic(evt: any): void {
    if (evt && evt.target) {
      this.loadedImgMic = true;
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  hideContentLoaderPat(evt: any): void {
    if (evt && evt.target) {
      this.loadedImgPat = true;
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  hideContentLoaderFri(evt: any): void {
    if (evt && evt.target) {
      this.loadedImgFri = true;
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  hideContentLoaderMar(evt: any): void {
    if (evt && evt.target) {
      this.loadedImgMar = true;
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  hideContentLoaderHil(evt: any): void {
    if (evt && evt.target) {
      this.loadedImgHil = true;
    }
  }
}
