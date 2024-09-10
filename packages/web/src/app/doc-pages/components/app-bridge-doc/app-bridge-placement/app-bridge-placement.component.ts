import { Component } from '@angular/core';

@Component({
  selector: 'app-app-bridge-placement',
  standalone: true,
  templateUrl: './app-bridge-placement.component.svg',
  styles: `
    :host {
      display: block;
    }
    svg {
      width: 100%;
      border-radius: 8px;
    }
  `,
})
export class AppBridgePlacementComponent {}
