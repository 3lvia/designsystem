import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import '@elvia/elvis-illustrations/broken';
import '@elvia/elvis-illustrations/clock';
import '@elvia/elvis-illustrations/confirmation';
import '@elvia/elvis-illustrations/connected';
import '@elvia/elvis-illustrations/consumption';
import '@elvia/elvis-illustrations/explain';
import '@elvia/elvis-illustrations/heating';
import '@elvia/elvis-illustrations/hello';
import '@elvia/elvis-illustrations/hidden';
import '@elvia/elvis-illustrations/installation';
import '@elvia/elvis-illustrations/meter-reading';
import '@elvia/elvis-illustrations/new';
import '@elvia/elvis-illustrations/no-connection';
import '@elvia/elvis-illustrations/no-notifications';
import '@elvia/elvis-illustrations/no-position';
import '@elvia/elvis-illustrations/no-results';
import '@elvia/elvis-illustrations/nothing-new';
import '@elvia/elvis-illustrations/office';
import '@elvia/elvis-illustrations/photo';
import '@elvia/elvis-illustrations/power-line';
import '@elvia/elvis-illustrations/price';
import '@elvia/elvis-illustrations/secret';
import '@elvia/elvis-illustrations/sharing';
import '@elvia/elvis-illustrations/statistics';
import '@elvia/elvis-illustrations/support';
import '@elvia/elvis-illustrations/unplugged';

@Component({
  selector: 'app-v2-playground-illustrations',
  templateUrl: './v2-playground-illustrations.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class V2PlaygroundIllustrationsComponent {
  private interval: ReturnType<typeof setInterval>;
  isShuffling = false;

  illustrationColor = 'grey';
  toggleIllustrationColor = () => {
    switch (this.illustrationColor) {
      case 'grey':
        this.illustrationColor = 'purple';
        break;
      case 'purple':
        this.illustrationColor = 'green';
        break;
      case 'green':
        this.illustrationColor = 'blue';
        break;
      case 'blue':
        this.illustrationColor = 'orange';
        break;
      case 'orange':
        this.illustrationColor = 'grey';
        break;
    }
  };

  startColorShuffle = () => {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.toggleIllustrationColor(), 750);
    this.isShuffling = true;
  };

  endColorShuffle = () => {
    clearInterval(this.interval);
    this.isShuffling = false;
  };
}
