import { Component } from '@angular/core';
import { getIdentity } from 'src/app/shared/e-items';

@Component({
  selector: 'app-tone-of-voice',
  templateUrl: './tone-of-voice.component.html',
  styleUrls: ['./tone-of-voice.component.scss'],
})
export class ToneOfVoiceComponent {

  figmaUrl = getIdentity('tone-of-voice').figmaUrl;
  description = getIdentity('tone-of-voice').description;

  toggleOpen(id: string): void {
    const element = document.getElementById(id) as HTMLElement;
    if (element) {
      if (element.classList.contains('e-accordion__item--open')) {
        element.classList.remove('e-accordion__item--open');
      } else {
        element.classList.add('e-accordion__item--open');
      }
    }
  }

}
