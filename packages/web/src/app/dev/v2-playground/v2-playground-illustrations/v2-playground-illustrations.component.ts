import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

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
