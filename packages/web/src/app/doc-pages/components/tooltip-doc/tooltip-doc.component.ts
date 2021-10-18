import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-tooltip-doc',
  templateUrl: './tooltip-doc.component.html',
  styleUrls: ['./tooltip-doc.component.scss'],
})
export class TooltipDocComponent {
  figmaUrl = getComponent('tooltip').figmaUrl;
  description = getComponent('tooltip').description;
  does = ['Explain the function of an user interactive element.', 'Showing full version of shortened text.'];
  donts = [
    "If you can't think of any particularly useful content in a tooltip.",
    'Don’t use tooltip to explain a concept.',
    'Don’t hide necessary information in a tooltip.',
  ];

  example1 = `<span class="e-tooltip">
  <button class="e-btn e-btn--icon e-btn--circled e-btn--lg ">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color"></i>
    </span>
  </button>
  <span class="e-tooltip__content">Tooltip</span>
</span>
`;
}
