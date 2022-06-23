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
}
