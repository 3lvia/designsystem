import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  description = getDocPagesNotFromCMS('contact')?.description;
  title = getDocPagesNotFromCMS('contact')?.title;
  loadedImgFride = false;
  loadedImgTrygve = false;
  loadedImgHil = false;
  loadedImgViljar = false;
  loadedImgTom = false;
  loadedImgErik = false;
  loadedImgKari = false;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | ' + 'Elvia design system');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  hideContentLoader(evt: any, name: string): void {
    if (evt && evt.target) {
      if (name === 'fride') {
        this.loadedImgFride = true;
      }
      if (name === 'trygve') {
        this.loadedImgTrygve = true;
      }
      if (name === 'hilde') {
        this.loadedImgHil = true;
      }
      if (name === 'viljar') {
        this.loadedImgViljar = true;
      }
      if (name === 'tom') {
        this.loadedImgTom = true;
      }
      if (name === 'erik') {
        this.loadedImgErik = true;
      }
      if (name === 'kari') {
        this.loadedImgKari = true;
      }
    }
  }

  veryImportantFunction = (name: string, legacy: string): void => {
    const element = document.getElementById(name);
    if (!element) return;
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
