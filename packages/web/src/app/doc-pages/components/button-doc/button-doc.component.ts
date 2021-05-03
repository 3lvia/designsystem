import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-button-doc',
  templateUrl: './button-doc.component.html',
  styleUrls: ['./button-doc.component.scss'],
})
export class ButtonDocComponent {
  figmaUrl = getComponent('button').figmaUrl;
  description = getComponent('button').description;
  doesExample1 = [
    // tslint:disable-next-line:max-line-length
    'Primary buttons are task oriented buttons, that normally is used for task like save, done, or next actions. It is often the primary positive action of a use case. Can be used alone, or combined with a secondary and link style button.',
  ];
  doesExample2 = [
    // tslint:disable-next-line: max-line-length
    'Secondary buttons are similar to primary buttons but is used as a supportive action, or for less important actions. Can be used alone, or combined with a primary og link styled button.',
  ];
  dontsExampleIcon = [
    'Unknown icon that is not descriptive alone without text.',
    'Don’t use both transparent and circle icons next to each other in a group',
  ];
  doesExampleIcon = [
    'Known actions that do not attract much attention.',
    'Different actions grouped together (example: A table where you can delete, edit and move)',
  ];
  dontsExample7 = [
    // tslint:disable-next-line:max-line-length
    'On actions that could have disabled state. Links do not have an disabled state, and the e-btn disabled style will not be applied on links with disabled html syntax.',
  ];
  public clicked = false;

  exampleOverview = `<button class="e-btn">
  <span class="e-btn__title">Button</span>
</button>
`;

  example1 = `<div style="display:flex; flex-direction:row; flex-wrap: wrap;">
  <button class="e-btn e-m-8">
    <span class="e-btn__title">Primary</span>
  </button>
  <button class="e-btn e-m-8">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download e-icon--inverted"></i>
      <i class="e-icon e-icon--download"></i>
    </span>
    <span class="e-btn__title">Icon button</span>
  </button>
  <button class="e-btn e-m-8">
    <span class="e-btn__title">Icon button</span>
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download e-icon--inverted"></i>
      <i class="e-icon e-icon--download"></i>
    </span>
  </button>
  <button class="e-btn e-btn--loading e-m-8">
    <span></span>
    <span></span>
    <span></span>
  </button>
  <button class="e-btn e-m-8" disabled>
    <span class="e-btn__title">Disabled</span>
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download e-icon--color-disabled-light"></i>
      <i class="e-icon e-icon--download"></i>
    </span>
  </button>
</div>
`;

  example1Inverted = `<div style="display:flex; flex-direction:row; flex-wrap: wrap;">
  <button class="e-btn e-btn--inverted e-m-8">
    <span class="e-btn__title">Primary</span>
  </button>
  <button class="e-btn e-btn--inverted e-m-8">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download e-icon--inverted"></i>
      <i class="e-icon e-icon--download"></i>
    </span>
    <span class="e-btn__title">Icon button</span>
  </button>
  <button class="e-btn e-btn--inverted e-m-8">
    <span class="e-btn__title">Icon button</span>
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download e-icon--inverted"></i>
      <i class="e-icon e-icon--download"></i>
    </span>
  </button>
  <button class="e-btn e-btn--loading e-btn--inverted e-m-8">
    <span></span>
    <span></span>
    <span></span>
  </button>
  <button class="e-btn e-btn--inverted e-m-8" disabled>
    <span class="e-btn__title">Disabled</span>
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download e-icon--color-disabled-light"></i>
      <i class="e-icon e-icon--download"></i>
    </span>
  </button>
</div>
`;

  example2 = `<div style="display:flex; flex-direction:row; flex-wrap: wrap;">
  <button class="e-btn e-btn--secondary e-m-8">
    <span class="e-btn__title">Secondary</span>
  </button>
  <button class="e-btn e-btn--secondary e-m-8">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download e-icon--inverted"></i>
      <i class="e-icon e-icon--download"></i>
    </i></span>
    <span class="e-btn__title">Icon button</span>
  </button>
  <button class="e-btn e-btn--secondary e-m-8">
    <span class="e-btn__title">Icon button</span>
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download e-icon--inverted"></i>
      <i class="e-icon e-icon--download"></i>
    </i></span>
  </button>
  <button class="e-btn e-btn--secondary e-btn--loading e-m-8">
    <span></span>
    <span></span>
    <span></span>
  </button>
  <button class="e-btn e-btn--secondary e-m-8" disabled>
    <span class="e-btn__title">Disabled</span>
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download e-icon--color-disabled"></i>
      <i class="e-icon e-icon--download e-icon--color-disabled"></i>
    </span>
  </button>
</div>
`;

  example2Inverted = `<div style="display:flex; flex-direction:row; flex-wrap: wrap;">
  <button class="e-btn e-btn--secondary e-btn--inverted e-m-8">
    <span class="e-btn__title">Secondary</span>
  </button>
  <button class="e-btn e-btn--secondary e-btn--inverted e-m-8">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download e-icon--inverted"></i>
      <i class="e-icon e-icon--download"></i>
    </i></span>
    <span class="e-btn__title">Icon button</span>
  </button>
  <button class="e-btn e-btn--secondary e-btn--inverted e-m-8">
    <span class="e-btn__title">Icon button</span>
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download e-icon--inverted"></i>
      <i class="e-icon e-icon--download"></i>
    </i></span>
  </button>
  <button class="e-btn e-btn--secondary e-btn--loading e-btn--inverted e-m-8">
    <span></span>
    <span></span>
    <span></span>
  </button>
  <button class="e-btn e-btn--secondary e-btn--inverted e-m-8" disabled>
    <span class="e-btn__title">Disabled</span>
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download e-icon--color-disabled-light"></i>
      <i class="e-icon e-icon--download"></i>
    </span>
  </button>
</div>
`;

  example3 = `<div style="display:flex; flex-direction:row; flex-wrap: wrap;">
  <button class="e-btn e-btn--tertiary e-m-8">
    <span class="e-btn__title">Tertiary</span>
  </button>
  <button class="e-btn e-btn--tertiary e-m-8">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download"></i>
    </span>
    <span class="e-btn__title">Tertiary</span>
  </button>
  <button class="e-btn e-btn--tertiary e-m-8">
    <span class="e-btn__title">Tertiary</span>
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download"></i>
    </span>
  </button>
  <button class="e-btn e-btn--tertiary e-btn--loading e-m-8">
    <span></span>
    <span></span>
    <span></span>
  </button>
  <button class="e-btn e-btn--tertiary e-m-8" disabled>
    <span class="e-btn__title">Tertiary</span>
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download e-icon--color-disabled"></i>
    </span>
  </button>
</div>
`;

  example3Inverted = `<div style="display:flex; flex-direction:row; flex-wrap: wrap;">
  <button class="e-btn e-btn--tertiary e-btn--inverted e-m-8">
    <span class="e-btn__title">Tertiary</span>
  </button>
  <button class="e-btn e-btn--tertiary e-btn--inverted e-m-8">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download e-icon--inverted"></i>
    </span>
    <span class="e-btn__title">Tertiary</span>
  </button>
  <button class="e-btn e-btn--tertiary e-btn--inverted e-m-8">
    <span class="e-btn__title">Tertiary</span>
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download e-icon--inverted"></i>
    </span>
  </button>
  <button class="e-btn e-btn--tertiary e-btn--loading e-btn--inverted e-m-8">
    <span></span>
    <span></span>
    <span></span>
  </button>
  <button class="e-btn e-btn--tertiary e-btn--inverted e-m-8" disabled>
    <span class="e-btn__title">Tertiary</span>
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download e-icon--color-disabled-light"></i>
    </span>
  </button>
</div>
`;

  exampleDanger = `<div style="display:flex; flex-direction:row; flex-wrap: wrap;">
  <button class="e-btn e-btn--danger e-m-8">
    <span class="e-btn__title">Danger</span>
  </button>
  <button class="e-btn e-btn--danger e-btn--loading e-m-8">
    <span></span>
    <span></span>
    <span></span>
  </button>
  <button class="e-btn e-btn--danger e-m-8" disabled>
    <span class="e-btn__title">Danger disabled</span>
  </button>
</div>
`;

  exampleDangerInverted = `<div style="display:flex; flex-direction:row; flex-wrap: wrap;">
  <button class="e-btn e-btn--danger e-btn--inverted e-m-8">
    <span class="e-btn__title">Danger</span>
  </button>
  <button class="e-btn e-btn--danger e-btn--loading e-btn--inverted e-m-8">
    <span></span>
    <span></span>
    <span></span>
  </button>
  <button class="e-btn e-btn--danger e-btn--inverted e-m-8" disabled>
    <span class="e-btn__title">Danger disabled</span>
  </button>
</div>
`;

  exampleIcon = `<button class="e-btn e-btn--icon e-mr-8">
  <span class="e-btn__icon"><i class="e-icon e-icon--upload"></i></span>
</button>
<button class="e-btn e-btn--icon e-btn--loading">
  <span></span>
  <span></span>
  <span></span>
</button>
<button class="e-btn e-btn--icon e-mr-8" disabled>
  <span class="e-btn__icon"><i class="e-icon e-icon--upload e-icon--color-disabled"></i></span>
</button>
`;

  exampleIconInverted = `<button class="e-btn e-btn--icon e-btn--inverted e-mr-8">
  <span class="e-btn__icon"><i class="e-icon e-icon--upload e-icon--inverted"></i></span>
</button>
<button class="e-btn e-btn--icon e-btn--loading e-btn--inverted">
  <span></span>
  <span></span>
  <span></span>
</button>
<button class="e-btn e-btn--icon e-btn--inverted" disabled>
  <span class="e-btn__icon"><i class="e-icon e-icon--upload e-icon--color-disabled"></i></span>
</button>
`;

  exampleIconCircles = `<button class="e-btn e-btn--icon e-btn--circled e-mr-8">
  <span class="e-btn__icon">
    <i class="e-icon e-icon--information_circle"></i>
    <i class="e-icon e-icon e-icon--information_circle-filled-color"></i>
  </span>
</button>
<button class="e-btn e-btn--icon e-btn--circled" disabled>
  <span class="e-btn__icon">
    <i class="e-icon e-icon--information_circle e-icon--color-disabled"></i>
    <i class="e-icon e-icon e-icon--information_circle-filled-color"></i>
  </span>
</button>
`;

  exampleIconCirclesInverted = `<button class="e-btn e-btn--icon e-btn--circled e-btn--inverted e-mr-8">
  <span class="e-btn__icon">
    <i class="e-icon e-icon--information_circle e-icon--inverted"></i>
    <i class="e-icon e-icon e-icon--information_circle-filled-color"></i>
  </span>
</button>
<button class="e-btn e-btn--icon e-btn--circled e-btn--inverted" disabled>
  <span class="e-btn__icon">
    <i class="e-icon e-icon--information_circle e-icon--color-disabled"></i>
    <i class="e-icon e-icon e-icon--information_circle-filled-color"></i>
  </span>
</button>
`;

  sizesHTML = `<div style="display:flex; flex-direction:row; flex-wrap: wrap; align-items: center;">
  <div class="e-m-8">
    <button class="e-btn e-btn--sm">
      <span class="e-btn__title">Small</span>
    </button>
  </div>
  <div class="e-m-8">
    <button class="e-btn">
      <span class="e-btn__title">Medium</span>
    </button>
  </div>
  <div class="e-m-8">
    <button class="e-btn e-btn--lg">
      <span class="e-btn__title">Large</span>
    </button>
  </div>
  <div class="e-w-100 e-mt-24">
    <button class="e-btn e-w-100">
      <span class="e-btn__title">Full width</span>
    </button>
  </div>
</div>
`;

  buttonLinks = `<a class="e-btn e-m-16" href="www.elvia.no">
  <span class="e-btn__title">Anchor tags</span>
</a>
`;

  buttonLinksInverted = `<a class="e-btn e-btn--inverted e-m-16" href="www.elvia.no">
  <span class="e-btn__title">Anchor tags</span>
</a>
`;
}
