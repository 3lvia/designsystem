import { Component } from '@angular/core';
import { eAccessibility } from 'src/app/shared/e-items';

@Component({
  selector: 'app-overview-accessibility',
  templateUrl: './overview-accessibility.component.html',
  styleUrls: ['./overview-accessibility.component.scss']
})
export class OverviewAccessibilityComponent {

  overviewTitle = 'Accessibility';
  pages = eAccessibility;

}
