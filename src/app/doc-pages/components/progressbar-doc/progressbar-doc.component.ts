import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-progressbar-doc',
  templateUrl: './progressbar-doc.component.html',
  styleUrls: ['./progressbar-doc.component.scss'],
})
export class ProgressbarDocComponent {
  figmaUrl = getComponent('progressbar-doc').figmaUrl;
  description = getComponent('progressbar-doc').description;

  example1 = `
<div class="e-progress" role="progressbar">
  <div class="e-progress__bar"></div>
</div>
`;

  example2 = `
<div class="e-progress" role="progressbar">
  <div class="e-progress__bar e-progress__bar--error"></div>
</div>
`;
}
