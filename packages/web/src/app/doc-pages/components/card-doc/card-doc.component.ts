import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { exampleContents } from 'src/app/shared/example-contents';
import { cardData } from './card-data';
import { cardLinkCode } from './card-link-code';

@Component({
  selector: 'app-card-doc',
  templateUrl: './card-doc.component.html',
  styleUrls: ['./card-doc.component.scss'],
})
export class CardDocComponent {
  examples = exampleContents;
  componentData = cardData;
  cardLinkCode = cardLinkCode;
  figmaUrl = getComponent('card').figmaUrl;
  description = getComponent('card').description;
  doesCard = [
    'When you want a more visual representation of content than a list view.',
    'When users need to browse through options.',
  ];
  dontsCard = [
    'If the text is more describable than the icon, consider using Action link group instead.',
    'Do not use different types of cards on the same page. The same goes for the description version, use description on all or none.',
  ];
}
