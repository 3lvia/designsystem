import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-card-doc',
  templateUrl: './card-doc.component.html',
  styleUrls: ['./card-doc.component.scss']
})
export class CardDocComponent implements OnInit {

  componentStatus = getComponent('card-doc').status;
  externalUrl = getComponent('card-doc').externalUrl;

  example1 = `<div class="e-card">
  <div class="e-card_header">
    <div class="e-card_header_text">
      <div class="e-card_title">A card should have a title</div>
    </div>
  </div>
  <div class="e-card_content">
    <p class="e-text-description">A card consist of some content.</p>
  </div>
</div>
`;

  example2 = `
  Hello form the box
  `;

  constructor() { }

  ngOnInit() {
  }

}
