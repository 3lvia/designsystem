import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';
import { exampleContents } from 'src/app/shared/example-contents';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent {
  examples = exampleContents;
  figmaUrl = getComponent('chips').figmaUrl;
  description = getComponent('chips').description;
  does = [
    'To provide an overview of selected options and allows you to easily remove them',
    'Use together with an inputfield',
  ];
  donts = ['Not to be used alone without inputfield.'];

  exampleOverview = `<div class="e-chip-container">
  <button class="e-chip">
    <div class="e-chip__label">Chip</div>
    <div class="e-chip__close"><i class="e-icon e-icon--close-bold"></i></div>
  </button>
  <button class="e-chip e-chip--blue-berry">
    <div class="e-chip__label">Chip</div>
    <div class="e-chip__close"><i class="e-icon e-icon--close-bold"></i></div>
  </button>
  <button class="e-chip e-chip--violet-grape" disabled>
    <div class="e-chip__label">Chip</div>
    <div class="e-chip__close"><i class="e-icon e-icon--close-bold"></i></div>
  </button>
</div>
`;

  exampleStandard = `<div class="e-chip-container">
  <button class="e-chip">
    <div class="e-chip__label">2018</div>
    <div class="e-chip__close"><i class="e-icon e-icon--close-bold"></i></div>
  </button>
  <button class="e-chip">
    <div class="e-chip__label">2019</div>
    <div class="e-chip__close"><i class="e-icon e-icon--close-bold"></i></div>
  </button>
  <button class="e-chip">
    <div class="e-chip__label">2020</div>
    <div class="e-chip__close"><i class="e-icon e-icon--close-bold"></i></div>
  </button>
</div>
`;

  exampleColors =
    `<div class="e-chip-container">
  <button class="e-chip e-chip--purple-plum">
    <div class="e-chip__label">` +
    this.examples.words.random['eng-GBR'][0] +
    `</div>
    <div class="e-chip__close"><i class="e-icon e-icon--close-bold"></i></div>
  </button>
  <button class="e-chip e-chip--blue-berry">
    <div class="e-chip__label">` +
    this.examples.words.random['eng-GBR'][1] +
    `</div>
    <div class="e-chip__close"><i class="e-icon e-icon--close-bold"></i></div>
  </button>
  <button class="e-chip e-chip--red-tomato">
    <div class="e-chip__label">` +
    this.examples.words.random['eng-GBR'][2] +
    `</div>
    <div class="e-chip__close"><i class="e-icon e-icon--close-bold"></i></div>
  </button>
  <button class="e-chip e-chip--orange-mango">
    <div class="e-chip__label">` +
    this.examples.words.random['eng-GBR'][3] +
    `</div>
    <div class="e-chip__close"><i class="e-icon e-icon--close-bold"></i></div>
  </button>
</div>
`;

  closeChipsTemporarily(name: string): void {
    const chip = document.getElementById(name);
    chip.classList.add('e-none');
    setTimeout(() => {
      chip.classList.remove('e-none');
    }, 1000);
  }
}
