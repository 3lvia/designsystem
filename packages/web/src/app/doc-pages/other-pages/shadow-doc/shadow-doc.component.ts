import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-shadow-doc',
  templateUrl: './shadow-doc.component.html',
  styleUrls: ['./shadow-doc.component.scss'],
})
export class ShadowDocComponent {
  description = getDocPagesNotFromCMS('shadow')?.description;
  figmaUrl = getDocPagesNotFromCMS('shadow')?.figmaUrl;
  title = getDocPagesNotFromCMS('shadow')?.title;
  does = ['Behind overlays like popover and modal.'];
  donts = [
    'Should not be applied to typography or icons. ',
    'Don’t use a lot of shadows on the same surface, since our visual profile have a flat visual expression.',
  ];

  shadows = [
    { title: 'Soft', className: 'e-shadow-soft', blur: '50', opacity: '3%' },
    { title: 'Medium', className: 'e-shadow-medium', blur: '40', opacity: '6%' },
    { title: 'Hard', className: 'e-shadow-hard', blur: '30', opacity: '8%' },
  ];

  constructor(private serviceTitle: Title) {
    this.serviceTitle.setTitle(this.title + ' | Elvia design system');
  }
}
