import { Component } from '@angular/core';
import { getIdentity } from 'src/app/shared/e-items';

@Component({
  selector: 'app-shadow-doc',
  templateUrl: './shadow-doc.component.html',
  styleUrls: ['./shadow-doc.component.scss'],
})
export class ShadowDocComponent {
  figmaUrl = getIdentity('shadow-doc').figmaUrl;
  description = getIdentity('shadow-doc').description;
  does = ['Behind a solid surface together with example cards.'];
  donts = [
    'Should not be applied to typography or icons.',
    'Don’t use a lot of shadows on the same surface, since we want our visual profile to be have a more flat expression.',
  ];

  doCodeCSS = `box-shadow: var(--e-shadow-6);
box-shadow: none;`;
  dontCodeCSS = `box-shadow: var(--e-shadow-none);`;
}
