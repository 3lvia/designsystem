import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent {

  figmaUrl = getComponent('chips').figmaUrl;
  description = getComponent('chips').description;
  does = [
    'Don\'t redirect cards to external sites - use links instead.',
  ];
  donts = [
    'Don\'t redirect cards to external sites - use links instead.',
  ];

  exampleOverview = `<div class="e-chip">
  <div class="e-chip__label">Card</div>
</div>
`;

}
