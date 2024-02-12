import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import '@elvia/elvis-illustrations/went-wrong';
import '@elvia/elvis-illustrations/hello';
import '@elvia/elvis-illustrations/no-results';
import '@elvia/elvis-illustrations/data-is-coming';
import '@elvia/elvis-illustrations/no-connection';
import '@elvia/elvis-illustrations/nothing-new';
import '@elvia/elvis-illustrations/photo';
import '@elvia/elvis-illustrations/new';
import '@elvia/elvis-illustrations/no-notifications';
import '@elvia/elvis-illustrations/no-position';
import '@elvia/elvis-illustrations/statistics';
import '@elvia/elvis-illustrations/confirmation';
import '@elvia/elvis-illustrations/cant-load-data';
import '@elvia/elvis-illustrations/explanation';
import '@elvia/elvis-illustrations/connected';
import '@elvia/elvis-illustrations/power-line';
import '@elvia/elvis-illustrations/power-station';
import '@elvia/elvis-illustrations/heating';
import '@elvia/elvis-illustrations/financial-aid';
import '@elvia/elvis-illustrations/hidden';
import '@elvia/elvis-illustrations/spotpris';
import '@elvia/elvis-illustrations/fastleddstrinn';
import '@elvia/elvis-illustrations/business';
import '@elvia/elvis-illustrations/lock-key';
import '@elvia/elvis-illustrations/waiting';
import '@elvia/elvis-illustrations/sharing';

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
