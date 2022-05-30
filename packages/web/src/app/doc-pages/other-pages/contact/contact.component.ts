import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  description = getDocPagesNotFromCMS('contact').description;
  loadedImgMic = false;
  loadedImgPat = false;
  loadedImgFri = false;
  loadedImgMar = false;
  loadedImgHil = false;
  loadedImgKri = false;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  hideContentLoader(evt: any, name: string): void {
    if (evt && evt.target) {
      if (name === 'mic') {
        this.loadedImgMic = true;
      }
      if (name === 'pat') {
        this.loadedImgPat = true;
      }
      if (name === 'fri') {
        this.loadedImgFri = true;
      }
      if (name === 'mar') {
        this.loadedImgMar = true;
      }
      if (name === 'hil') {
        this.loadedImgHil = true;
      }
      if (name === 'kri') {
        this.loadedImgKri = true;
      }
    }
  }

  veryImportantFunction = (name: string, legacy: string): void => {
    const element = document.getElementById(name);
    element.classList.add('criticallyImportantStyle');
    setTimeout(() => {
      if (element.innerHTML === '🦩') {
        element.innerHTML = legacy;
      } else {
        element.innerHTML = '🦩';
      }
      element.classList.remove('criticallyImportantStyle');
    }, 400);
  };
}
