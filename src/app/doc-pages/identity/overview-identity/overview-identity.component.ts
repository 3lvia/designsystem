import { Component } from '@angular/core';
import { eIdentity } from 'src/app/shared/e-items';

@Component({
  selector: 'app-overview-identity',
  templateUrl: './overview-identity.component.html',
  styleUrls: ['./overview-identity.component.scss'],
})
export class OverviewIdentityComponent {
  overviewTitle = 'Identity';
  pages = eIdentity;
}
