import { Component } from '@angular/core';
import { eCommunity } from 'src/app/shared/e-items';

@Component({
  selector: 'app-overview-community',
  templateUrl: './overview-community.component.html',
  styleUrls: ['./overview-community.component.scss'],
})
export class OverviewCommunityComponent {
  overviewTitle = 'Community';
  pages = eCommunity;

}
