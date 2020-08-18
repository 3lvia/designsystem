import { Component } from '@angular/core';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent {

  isDesktop = true;
  does = 'Follow standards for external and internal sites.';
  donts = 'Create new layouts for existing structures such as articles, factboxes etc.';

  displayDesktop(): void {
    this.isDesktop = true;
  }

  displayMobile(): void {
    this.isDesktop = false;
  }
}
