import { Component } from '@angular/core';

@Component({
  selector: 'app-design-process-doc',
  templateUrl: './design-process-doc.component.html',
  styleUrls: ['./design-process-doc.component.scss'],
})
export class DesignProcessDocComponent {
  loadedImgOne = false;
  loadedImgTwo = false;

  hideContentLoaderOne(evt: Event): void {
    if (evt && evt.target) {
      this.loadedImgOne = true;
    }
  }
  hideContentLoaderTwo(evt: Event): void {
    if (evt && evt.target) {
      this.loadedImgTwo = true;
    }
  }
}
