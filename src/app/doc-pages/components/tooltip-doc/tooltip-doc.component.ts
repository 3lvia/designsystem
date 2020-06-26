import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-tooltip-doc',
  templateUrl: './tooltip-doc.component.html',
  styleUrls: ['./tooltip-doc.component.scss'],
})
export class TooltipDocComponent {
  figmaUrl = getComponent('tooltip-doc').figmaUrl;
  does = ['Explain the function of an user interactive element.', 'Showing full version of shortened text.'];
  donts = [
    "If you can't think of any particularly useful content in a tooltip.",
    'Don’t use tooltip to explain a concept.',
    'Don’t hide necessary information in a tooltip.',
  ];

  classes = ['e-tooltip', 'e-tooltip__content', 'e-tooltip__content--top', 'e-tooltip__content--bottom'];

  example1 = `<div style="display:flex;align-items: center;justify-content: space-around;height: 100px;width: 100%;">

  <span class="e-tooltip" tabindex=0>
    <i class="e-icon e-icon--edit e-icon--sm"></i>
    <span class="e-tooltip__content">Above </span>
  </span>

  <span class="e-tooltip" tabindex=0>
    <i class="e-icon e-icon--edit e-icon--sm"></i>
    <span class="e-tooltip__content e-tooltip__content--bottom">Below</span>
  </span>

</div>
`;
}
