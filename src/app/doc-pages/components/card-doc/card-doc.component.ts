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
      <div class="e-card_title is-center">A card should have a title</div>
      <div class="e-card_subtitle is-center">And a subtitle</div>
    </div>
  </div>
  <div class="e-card_content">
    <p class="e-text-description">A card consist of some content.</p>
    <p class="e-text-description">The card can have multiple lines of content.</p>
    <p class="e-text-description">Cards are useful for displaying some kind of information</p>
  </div>
  <div class="e-card_header">
    <div class="e-card_header_text">
      <div class="e-card_title">A card can have more than one title</div>
      <div class="e-card_subtitle">And a subtitle</div>
    </div>
  </div>
  <div class="e-card_content">
    <p class="e-text-description">And more content.</p>
  </div>
</div>
`;

  example2 = `<div class="e-card">
  <div class="e-card_header">
    <div class="e-card_header_icon">
      <i class="fal fa-info"></i>
    </div>
    <div class="e-card_header_text">
      <div class="e-card_title">Title</div>
    </div>
  </div>
  <div class="e-card_content">
    <p class="e-text-description">The different pieces of a card can be combined as desired.</p>
  </div>
  <div class="e-card_actions">
    <button class="e-button">Full width button</button>
  </div>
</div>
`;

  example3 = `<div class="e-card">
  <div class="e-card_header">
    <div class="e-card_header_icon">
      <i class="fal fa-info"></i>
    </div>
    <div class="e-card_header_text">
      <div class="e-card_title">Title</div>
      <div class="e-card_subtitle">Subtitle</div>
    </div>
    <button class="e-card_header_action">
      <i class="fal fa-cog"></i>
    </button>
  </div>
  <div class="e-card_content">
    <p class="e-text-description">Example-content</p>
  </div>
  <div class="e-card_actions">
    <button class="e-button">Cancel action</button>
    <button class="e-button">Complete action</button>
  </div>
</div>
`;

  example4 = `<div class="e-card">
  <div class="e-card_header">
    <div class="e-card_header_text">
      <div class="e-card_title">Title</div>
      <div class="e-card_subtitle">Subtitle</div>
    </div>
  </div>
  <div class="e-card_content">
    <p class="e-text-description">Any content can be placed within the card body.</p>
  </div>
  <div class="e-card_actions">
    <button class="e-card_actions_action">View more</button>
  </div>
</div>
`;

  constructor() { }

  ngOnInit() {
  }

}
