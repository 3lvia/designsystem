import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss'],
})
export class ContributeComponent {
  description = getDocPagesNotFromCMS('contribute')?.description;
  title = getDocPagesNotFromCMS('contribute')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | ' + 'Elvia design system');
  }

  loadedFigmaModel = false;

  hideContentLoader(evt: Event): void {
    if (evt && evt.target) {
      this.loadedFigmaModel = true;
    }
  }
}
