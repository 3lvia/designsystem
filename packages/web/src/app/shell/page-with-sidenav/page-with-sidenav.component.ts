import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-with-sidenav',
  templateUrl: './page-with-sidenav.component.html',
  styleUrls: ['./page-with-sidenav.component.scss'],
})
export class PageWithSidenavComponent {
  @Input() isLandingPage = false;
}
