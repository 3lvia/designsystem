import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-shadow-doc',
  templateUrl: './shadow-doc.component.html',
  styleUrls: ['./shadow-doc.component.scss'],
})
export class ShadowDocComponent {
  figmaUrl = getDocPagesNotFromCMS('shadow').figmaUrl;
  description = getDocPagesNotFromCMS('shadow').description;
  does = ['Behind overlays like popover and modal.'];
  donts = [
    'Should not be applied to typography or icons. ',
    'Don’t use a lot of shadows on the same surface, since our visual profile have a flat visual expression.',
  ];

  shadows = [
    { title: 'Soft', className: 'e-shadow-3', blur: '50', opacity: '3%', styling: 'e-shadow-3' },
    { title: 'Medium', className: 'e-shadow-6', blur: '40', opacity: '6%', styling: 'e-shadow-6' },
    { title: 'Hard', className: 'e-shadow-8', blur: '30', opacity: '8%', styling: 'e-shadow-8' },
  ];
}
