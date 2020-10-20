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
  loadedImg = false;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  hideContentLoader(evt: any): void {
    if (evt && evt.target) {
      this.loadedImg = true;
      const communityIllustration = document.getElementById('community-illustration');
      communityIllustration.classList.remove('e-none');
    }
  }
}
