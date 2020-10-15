import { Component } from '@angular/core';
import { eGetStarted } from 'src/app/shared/e-items';

@Component({
  selector: 'app-overview-get-started',
  templateUrl: './overview-get-started.component.html',
  styleUrls: ['./overview-get-started.component.scss'],
})
export class OverviewGetStartedComponent {
  overviewTitle = 'Get Started';
  pages = eGetStarted;
  loadedImg = false;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  hideContentLoader(evt: any): void {
    if (evt && evt.target) {
      this.loadedImg = true;
      const getstartedIllustration = document.getElementById('getstarted-illustration');
      getstartedIllustration.classList.remove('e-none');
    }
  }
}
