import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

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
    'If you can\'t think of any particularly useful content in a tooltip.',
    'Don’t use tooltip to explain a concept.',
    'Don’t hide necessary information in a tooltip.',
  ];

  example1 = ` <span class="e-tooltip" tabindex="0">
  <i class="e-icon e-icon--edit e-icon--sm"></i>
  <span class="e-tooltip__content">Tooltip</span>
</span>
`;
}
