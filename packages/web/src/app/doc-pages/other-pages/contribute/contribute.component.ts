import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss'],
})
export class ContributeComponent {
  description = getDocPagesNotFromCMS('contribute').description;

  loadedFigmaModel = false;

  hideContentLoader(evt: Event): void {
    if (evt && evt.target) {
      this.loadedFigmaModel = true;
    }
  }
}
