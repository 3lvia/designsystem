import { Component } from '@angular/core';
import { getCommunity } from 'src/app/shared/e-items';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss'],
})
export class ContributeComponent {
  description = getCommunity('contribute').description;

  loadedFigmaModel = false;

  hideContentLoader(evt: any): void {
    if (evt && evt.target) {
      this.loadedFigmaModel = true;
    }
  }
}
