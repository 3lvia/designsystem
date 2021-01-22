import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-divider-doc',
  templateUrl: './divider-doc.component.html',
  styleUrls: ['./divider-doc.component.scss'],
})
export class DividerDocComponent {
  figmaUrl = getComponent('divider').figmaUrl;
  description = getComponent('divider').description;

  exampleOverview = `<div class="e-divider"></div>`;
  exampleSimple = `<div class="e-divider"></div>`;
  exampleTitle = `<div class="e-divider e-divider--title">
  <div class="e-divider__title">Title</div>
</div>`;
  exampleCurved = `<div class="e-divider e-divider--curved"></div>`;
  exampleSimpleInverted = `<div class="e-divider e-divider--inverted"></div>`;
  exampleTitleInverted = `<div class="e-divider e-divider--title e-divider--inverted">
  <div class="e-divider__title">Title</div>
</div>`;
  exampleCurvedInverted = `<div class="e-divider e-divider--curved e-divider--inverted"></div>`;
}
