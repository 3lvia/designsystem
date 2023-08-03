import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { cardData } from './card-data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-card-doc',
  templateUrl: './card-doc.component.html',
  styleUrls: ['./card-doc.component.scss'],
})
export class CardDocComponent {
  componentData = cardData;
  title = getComponent('card')?.title;
  doesCard = [
    'When you want a more visual representation of content than a list view.',
    'When users need to browse through options.',
  ];
  dontsCard = [
    'If the text is more describable than the icon, consider using Action link group instead.',
    'Do not use different types of cards on the same page. The same goes for the description version, use description on all or none.',
  ];

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
