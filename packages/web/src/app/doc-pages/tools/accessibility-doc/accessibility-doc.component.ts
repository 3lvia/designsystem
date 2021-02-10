import { Component } from '@angular/core';

@Component({
  selector: 'app-accessibility-doc',
  templateUrl: './accessibility-doc.component.html',
  styleUrls: ['./accessibility-doc.component.scss'],
})
export class AccessibilityDocComponent {
  doCode = `<div class="e-bg-green"></div>`;
  dontCode = `<div class="e-bg-green e-text-grey"></div>`;
  loadedImg = false;

  hideContentLoader(evt: any): void {
    if (evt && evt.target) {
      this.loadedImg = true;
    }
  }
}
