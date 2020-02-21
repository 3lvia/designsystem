import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/elvis-items';

@Component({
  selector: 'app-card-doc',
  templateUrl: './card-doc.component.html',
  styleUrls: ['./card-doc.component.scss']
})
export class CardDocComponent implements OnInit {

  componentStatus = getComponent('card-doc').status;
  componentClasses = ['.elvis-card'];

  constructor() { }

  ngOnInit() {
  }
  
  example1 = `<div class="elvis-card">
  <div class="elvis-card_header">
    <div class="elvis-card_header_text">
      <div class="elvis-card_title is-center">A card should have a title</div>
      <div class="elvis-card_subtitle is-center">And a subtitle</div>
    </div>
  </div>
  <div class="elvis-card_content">
    <p>A card consist of some content.</p>
    <p>The card can have multiple lines of content.</p>
    <p>Cards are useful for displaying some kind of information</p>
  </div>
  <div class="elvis-card_header">
    <div class="elvis-card_header_text">
      <div class="elvis-card_title">A card can have more than one title</div>
      <div class="elvis-card_subtitle">And a subtitle</div>
    </div>
  </div>
  <div class="elvis-card_content">
    <p>And more content.</p>
  </div>
</div>
`;

  example2 = `<div class="elvis-card">
  <div class="elvis-card_header">
    <div class="elvis-card_header_icon">
      <i class="fal fa-info"></i>
    </div>
    <div class="elvis-card_header_text">
      <div class="elvis-card_title">Title</div>
    </div>
  </div>
  <div class="elvis-card_content">
    <p>The different pieces of a card can be combined as desired.</p>
  </div>
  <div class="elvis-card_actions">
    <button class="elvis-button">Full width button</button>
  </div>
</div>
`;

  example3 = `<div class="elvis-card">
  <div class="elvis-card_header">
    <div class="elvis-card_header_icon">
      <i class="fal fa-info"></i>
    </div>
    <div class="elvis-card_header_text">
      <div class="elvis-card_title">Title</div>
      <div class="elvis-card_subtitle">Subtitle</div>
    </div>
    <button class="elvis-card_header_action">
      <i class="fal fa-cog"></i>
    </button>
  </div>
  <div class="elvis-card_content">
    <p>Example-content</p>
  </div>
  <div class="elvis-card_actions">
    <button class="elvis-button">Cancel action</button>
    <button class="elvis-button">Complete action</button>
  </div>
</div>
`;

  example4 = `<div class="elvis-card">
  <div class="elvis-card_header">
    <div class="elvis-card_header_text">
      <div class="elvis-card_title">Title</div>
      <div class="elvis-card_subtitle">Subtitle</div>
    </div>
  </div>
  <div class="elvis-card_content">
    <p>Any content can be placed within the card body.</p>
  </div>
  <div class="elvis-card_actions">
    <button class="elvis-card_actions_action">View more</button>
  </div>
</div>
`;
}
