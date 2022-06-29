import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { exampleContents } from 'src/app/shared/example-contents';

@Component({
  selector: 'app-segmented-controls-doc',
  templateUrl: './segmented-controls-doc.component.html',
  styleUrls: ['./segmented-controls-doc.component.scss'],
})
export class SegmentedControlsDocComponent {
  exampleContents = exampleContents;
  figmaUrl = getComponent('segmented-control').figmaUrl;
  description = getComponent('segmented-control').description;
  does = ['To display different views.'];
  donts = [
    'Do not use segmented controls if there are more than three options or the option texts are too long (then use dropdown instead)',
  ];

  exampleOverview =
    `<div class="e-segmented-controls" style="width: 290px" role="radiogroup">
  <input type="radio" name="so-1-1" id="so-1-1" value="` +
    exampleContents.words.views['eng-GBR'][0] +
    `" checked>
  <input type="radio" name="so-1-1" id="so-1-2" value="` +
    exampleContents.words.views['eng-GBR'][1] +
    `">
  <label for="so-1-1" data-value="Option 1"><span class="e-segmented-controls__title">` +
    exampleContents.words.views['eng-GBR'][0] +
    `</span></label>
  <label for="so-1-2" data-value="Option 2"><span class="e-segmented-controls__title">` +
    exampleContents.words.views['eng-GBR'][1] +
    `</span></label>
</div>
`;

  example1 =
    `<div class="e-segmented-controls" style="width: 290px" role="radiogroup">
  <input type="radio" name="sc-1-1" id="sc-1-1" value="` +
    exampleContents.words.views['eng-GBR'][0] +
    `" checked>
  <input type="radio" name="sc-1-1" id="sc-1-2" value="` +
    exampleContents.words.views['eng-GBR'][1] +
    `">
  <label for="sc-1-1" data-value="Option 1"><span class="e-segmented-controls__title">` +
    exampleContents.words.views['eng-GBR'][0] +
    `</span></label>
  <label for="sc-1-2" data-value="Option 2"><span class="e-segmented-controls__title">` +
    exampleContents.words.views['eng-GBR'][1] +
    `</span></label>
</div>
`;

  example2 =
    `<div class="e-segmented-controls" style="width: 360px" role="radiogroup">
  <input type="radio" name="sc-1-2" id="sc-1-1-1" value="` +
    exampleContents.words.views['eng-GBR'][0] +
    `" checked>
  <input type="radio" name="sc-1-2" id="sc-1-1-2" value="` +
    exampleContents.words.views['eng-GBR'][1] +
    `">
  <input type="radio" name="sc-1-2" id="sc-1-1-3" value="` +
    exampleContents.words.views['eng-GBR'][2] +
    `">
    <label for="sc-1-1-1" data-value="Option 1">
      <span class="e-segmented-controls__title">` +
    exampleContents.words.views['eng-GBR'][0] +
    `</span>
    </label>
    <label for="sc-1-1-2" data-value="Option 2">
      <span class="e-segmented-controls__title">` +
    exampleContents.words.views['eng-GBR'][1] +
    `</span>
    </label>
    <label for="sc-1-1-3" data-value="Option 3">
      <span class="e-segmented-controls__title">` +
    exampleContents.words.views['eng-GBR'][2] +
    `</span>
    </label>
</div>
`;

  exampleLarge =
    `<div class="e-segmented-controls e-segmented-controls--lg" style="width: 330px" role="radiogroup">
  <input type="radio" name="sclg-1-1" id="sclg-1-1" value="` +
    exampleContents.words.views['eng-GBR'][0] +
    `" checked>
  <input type="radio" name="sclg-1-1" id="sclg-1-2" value="` +
    exampleContents.words.views['eng-GBR'][1] +
    `">
  <label for="sclg-1-1" data-value="Option 1">
    <span class="e-segmented-controls__title">` +
    exampleContents.words.views['eng-GBR'][0] +
    `</span>
  </label>
  <label for="sclg-1-2" data-value="Option 2">
    <span class="e-segmented-controls__title">` +
    exampleContents.words.views['eng-GBR'][1] +
    `</span>
  </label>
</div>
`;

  exampleMedium =
    `<div class="e-segmented-controls" style="width: 290px" role="radiogroup">
  <input type="radio" name="scmd-1-1" id="scmd-1-1" value="` +
    exampleContents.words.views['eng-GBR'][0] +
    `" checked>
  <input type="radio" name="scmd-1-1" id="scmd-1-2" value="` +
    exampleContents.words.views['eng-GBR'][1] +
    `">
  <label for="scmd-1-1" data-value="Option 1">
    <span class="e-segmented-controls__title">` +
    exampleContents.words.views['eng-GBR'][0] +
    `</span>
  </label>
  <label for="scmd-1-2" data-value="Option 2">
    <span class="e-segmented-controls__title">` +
    exampleContents.words.views['eng-GBR'][1] +
    `</span>
  </label>
</div>
`;

  exampleSmall =
    `<div class="e-segmented-controls e-segmented-controls--sm" style="width: 250px" role="radiogroup">
  <input type="radio" name="scsm-1-2" id="scsm-1-1-1" value="` +
    exampleContents.words.views['eng-GBR'][0] +
    `" checked>
  <input type="radio" name="scsm-1-2" id="scsm-1-1-2" value="` +
    exampleContents.words.views['eng-GBR'][1] +
    `">
    <label for="scsm-1-1-1" data-value="Option 1">
      <span class="e-segmented-controls__title">` +
    exampleContents.words.views['eng-GBR'][0] +
    `</span>
    </label>
    <label for="scsm-1-1-2" data-value="Option 2">
      <span class="e-segmented-controls__title">` +
    exampleContents.words.views['eng-GBR'][1] +
    `</span>
    </label>
</div>
`;
}
