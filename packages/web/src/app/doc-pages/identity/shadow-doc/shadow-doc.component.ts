import { Component } from '@angular/core';
import { getIdentity } from 'src/app/shared/e-items';

@Component({
  selector: 'app-shadow-doc',
  templateUrl: './shadow-doc.component.html',
  styleUrls: ['./shadow-doc.component.scss'],
})
export class ShadowDocComponent {
  figmaUrl = getIdentity('shadow').figmaUrl;
  description = getIdentity('shadow').description;

  doCodeCSS = `box-shadow: var(--e-shadow-6);
box-shadow: none;`;
  dontCodeCSS = `box-shadow: var(--e-shadow-none);`;

  doesExample = ['Behind a solid surface (for example together with cards).'];
  dontsExample = [
    'Should not be applied to typography or icons.',
    'Don’t use a lot of shadows on the same surface, since we want our visual profile to be have a more flat expression.',
  ];
}
