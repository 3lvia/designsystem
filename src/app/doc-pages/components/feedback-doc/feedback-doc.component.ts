import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-feedback-doc',
  templateUrl: './feedback-doc.component.html',
  styleUrls: ['./feedback-doc.component.scss']
})
export class FeedbackDocComponent implements OnInit {

  externalUrl = getComponent('feedback-doc').externalUrl;
  componentStatus = getComponent('feedback-doc').status;
  componentClasses = ['e-feedback-message'];

  example1 = `<div class="e-feedback-message">
  <i class="fal fa-info-circle e-feedback-message_icon"></i>
  <p class="e-feedback-message_message">
    This is just for info! Usage of icons should be kept to an absolute minimum.
    Long messages are also supported, the text will wrap to a new line. However, long feedbacks are not recommended.
  </p>
  <button class="e-feedback-message_close-button">
    <i class="fal fa-times-circle"></i>
  </button>
</div>
`;

  example2 = `<div class="e-feedback-message is-success">
  <p class="e-feedback-message_message">
    Something was a success!
  </p>
  <button class="e-feedback-message_close-button">
  <i class="fal fa-times-circle"></i>
  </button>
</div>
`;

  example3 = `<div class="e-feedback-message is-warn">
  <p class="e-feedback-message_message">
    There is something you might want to check out.
  </p>
  <button class="e-feedback-message_close-button">
    <i class="fal fa-times-circle"></i>
  </button>
</div>
`;

  example4 = `<div class="e-feedback-message is-error">
  <p class="e-feedback-message_message">
    There is something seriously wrong going on!
  </p>
  <button class="e-feedback-message_close-button">
    <i class="fal fa-times-circle"></i>
  </button>
</div>
`;

  constructor() { }

  ngOnInit() {
  }

}
