import {Component} from '@angular/core';
import {getComponent} from 'src/app/shared/e-items';

@Component({
  selector: 'app-button-doc',
  templateUrl: './button-doc.component.html',
  styleUrls: ['./button-doc.component.scss'],
})
export class ButtonDocComponent {
  externalUrl = getComponent('button-doc').externalUrl;
  componentStatus = getComponent('button-doc').status;
  // tslint:disable-next-line:max-line-length
  doesExample1 = [
    'Primary buttons are task oriented buttons, that normally is used for task like save, done, or next actions. It is often the primary positive action of a use case. Can be used alone, or combined with a secondary and link style button.',
  ];
  // tslint:disable-next-line:max-line-length
  doesExample2 = [
    'Secondary buttons are similar to primary buttons but is used as a supportive action, or for less important actions. Can be used alone, or combined with a primary og link styled button.',
  ];
  // tslint:disable-next-line:max-line-length
  dontsExampleIcon = [
    'Unknown icon that is not descriptive alone without text.',
    'Don’t use both transparent and circle icons next to each other in a group',
  ];
  // tslint:disable-next-line:max-line-length
  doesExampleIcon = [
    'Known actions that do not attract much attention.',
    'Different actions grouped together (example: A table where you can delete, edit and move)',
  ];
  // tslint:disable-next-line:max-line-length
  dontsExample7 = [
    'On actions that could have disabled state. Links do not have an disabled state, and the e-btn disabled style will not be applied on links with disabled html syntax.',
  ];
  public clicked = false;

  example1 = `<div>
  <h3 class="e-title-small">Large</h3>
  <button class="e-btn e-btn--lg e-m-16">
    <span class="e-btn__title">Primary</span>
  </button>
  <button class="e-btn e-btn--lg e-m-16" disabled>
    <span class="e-btn__title">Disabled</span>
  </button>
</div>
<div>
  <h3 class="e-title-small">Medium (default)</h3>
  <button class="e-btn e-m-16">
    <span class="e-btn__title">Primary</span>
  </button>
  <button class="e-btn e-m-16" disabled>
    <span class="e-btn__title">Disabled</span>
  </button>
</div>
<div>
  <h3 class="e-title-small">Small</h3>
  <button class="e-btn e-btn--sm e-m-16">
    <span class="e-btn__title">Primary</span>
  </button>
  <button class="e-btn e-btn--sm e-m-16" disabled>
    <span class="e-btn__title">Disabled</span>
  </button>
</div>
<div>
  <h3 class="e-title-small">With icon</h3>
 <button class="e-btn e-m-16">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download e-icon--inverted"></i>
      <i class="e-icon e-icon--download"></i>
    </span>
    <span class="e-btn__title">Icon button</span>
  </button>
  <button class="e-btn e-m-16">
    <span class="e-btn__title">Icon button</span>
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download e-icon--inverted"></i>
      <i class="e-icon e-icon--download"></i>
    </span>
  </button>
  <button class="e-btn e-m-16" disabled>
    <span class="e-btn__title">Icon button</span>
    <span class="e-btn__icon">
      <i class="e-icon e-icon--download e-icon--color-disabled-light"></i>
    </span>
  </button>
</div>
<div>
  <h3 class="e-title-small">Danger</h3>
  <button class="e-btn e-btn--danger e-m-16">
    <span class="e-btn__title">Danger</span>
  </button>
  <button class="e-btn e-btn--danger e-m-16" disabled>
    <span class="e-btn__title">Disabled</span>
  </button>
</div>
<div>
  <h3 class="e-title-small">Loading</h3>
  <button class="e-btn e-btn--loading e-m-16">
    <span></span>
    <span></span>
    <span></span>
  </button>
</div>
`;

  example2 = `<div>
  <h3 class="e-title-small">Large</h3>
  <button class="e-btn e-btn--secondary e-btn--lg e-m-16">
    <span class="e-btn__title">Secondary</span>
  </button>
  <button class="e-btn e-btn--secondary e-btn--lg e-m-16" disabled>
    <span class="e-btn__title">Disabled</span>
  </button>
</div>
<div>
  <h3 class="e-title-small">Medium (default)</h3>
  <button class="e-btn e-btn--secondary e-m-16">
    <span class="e-btn__title">Secondary</span>
  </button>
  <button class="e-btn e-btn--secondary e-m-16" disabled>
    <span class="e-btn__title">Disabled</span>
  </button>
</div>
<div>
  <h3 class="e-title-small">Small</h3>
  <button class="e-btn e-btn--secondary e-btn--sm e-m-16">
    <span class="e-btn__title">Secondary</span>
  </button>
  <button class="e-btn e-btn--secondary e-btn--sm e-m-16" disabled>
    <span class="e-btn__title">Disabled</span>
  </button>
</div>
<div>
  <h3 class="e-title-small">With icons</h3>
  <button class="e-btn e-btn--secondary e-m-16">
    <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
    <span class="e-btn__title">Icon button</span>
  </button>
  <button class="e-btn e-btn--secondary e-m-16">
    <span class="e-btn__title">Icon button</span>
    <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
  </button>
  <button class="e-btn e-btn--secondary e-m-16" disabled>
    <span class="e-btn__title">Icon button</span>
    <span class="e-btn__icon"><i class="e-icon e-icon--download e-icon--color-disabled"></i></span>
  </button>
</div>
<div>
  <h3 class="e-title-small">Loading</h3>
  <button class="e-btn e-btn--secondary e-btn--loading e-m-16">
    <span></span>
    <span></span>
    <span></span>
  </button>
</div>
`;

  example3 = `<div>
  <h3 class="e-title-small">Large</h3>
  <button class="e-btn e-btn--tertiary e-btn--lg e-m-16">
    <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
    <span class="e-btn__title">Tertiary</span>
  </button>
  <button class="e-btn e-btn--tertiary e-btn--lg e-m-16" disabled>
    <span class="e-btn__icon"><i class="e-icon e-icon--download e-icon--color-disabled"></i></span>
    <span class="e-btn__title">Disabled</span>
  </button>
</div>
<div>
  <h3 class="e-title-small">Medium (default)</h3>
  <button class="e-btn e-btn--tertiary e-m-16">
    <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
    <span class="e-btn__title">Tertiary</span>
  </button>
  <button class="e-btn e-btn--tertiary e-m-16" disabled>
    <span class="e-btn__icon"><i class="e-icon e-icon--download e-icon--color-disabled"></i></span>
    <span class="e-btn__title">Disabled</span>
  </button>
</div>
<div>
  <h3 class="e-title-small">Small</h3>
  <button class="e-btn e-btn--tertiary e-btn--sm e-m-16">
    <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
    <span class="e-btn__title">Tertiary</span>
  </button>
  <button class="e-btn e-btn--tertiary e-btn--sm e-m-16" disabled>
    <span class="e-btn__icon"><i class="e-icon e-icon--download e-icon--color-disabled"></i></span>
    <span class="e-btn__title">Disabled</span>
  </button>
</div>
<div>
  <h3 class="e-title-small">With icons</h3>
  <button class="e-btn e-btn--tertiary e-m-16">
    <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
    <span class="e-btn__title">Icon button</span>
  </button>
  <button class="e-btn e-btn--tertiary e-m-16">
    <span class="e-btn__title">Icon button</span>
    <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
  </button>
  <button class="e-btn e-btn--tertiary e-m-16" disabled>
    <span class="e-btn__title">Icon button</span>
    <span class="e-btn__icon"><i class="e-icon e-icon--download e-icon--color-disabled"></i></span>
  </button>
</div>
`;

  exampleIcon = `<div>
  <div>
    <h3 class="e-title-small">Large</h3>
    <button class="e-btn e-btn--icon e-btn--lg e-m-16">
      <span class="e-btn__icon"><i class="e-icon e-icon--upload"></i></span>
    </button>
    <button class="e-btn e-btn--icon e-btn--lg e-m-16" disabled>
      <span class="e-btn__icon"><i class="e-icon e-icon--upload e-icon--color-disabled"></i></span>
    </button>
  </div>
  <div>
  <h3 class="e-title-small">Medium (default)</h3>
    <button class="e-btn e-btn--icon e-m-16">
      <span class="e-btn__icon"><i class="e-icon e-icon--upload"></i></span>
    </button>
    <button class="e-btn e-btn--icon e-m-16" disabled>
      <span class="e-btn__icon"><i class="e-icon e-icon--upload e-icon--color-disabled"></i></span>
    </button>
  </div>
  <div>
    <h3 class="e-title-small">Small</h3>
    <button class="e-btn e-btn--icon e-btn--sm e-m-16">
      <span class="e-btn__icon"><i class="e-icon e-icon--upload"></i></span>
    </button>
    <button class="e-btn e-btn--icon e-btn--sm e-m-16" disabled>
      <span class="e-btn__icon"><i class="e-icon e-icon--upload e-icon--color-disabled"></i></span>
    </button>
  </div>
  <div>
    <h3 class="e-title-small">Danger (Only transparent)</h3>
    <button class="e-btn e-btn--icon e-btn--danger e-btn--lg e-m-16">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--bin e-icon--color-red"></i>
        <i class="e-icon e-icon--bin"></i>
      </span>
    </button>
    <button class="e-btn e-btn--icon e-btn--danger e-btn--lg e-m-16" disabled>
      <span class="e-btn__icon">
        <i class="e-icon e-icon--bin e-icon--color-disabled"></i>
      </span>
    </button>
  </div>
  <div>
    <h3 class="e-title-small">Circled (Only medium + large)</h3>
    <button class="e-btn e-btn--icon e-btn--circled e-btn--lg e-m-16">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--information_circle"></i>
        <i class="e-icon e-icon e-icon--information_circle-filled-color"></i>
      </span>
    </button>
    <button class="e-btn e-btn--icon e-btn--circled e-btn--lg e-m-16" disabled>
      <span class="e-btn__icon">
        <i class="e-icon e-icon--information_circle e-icon--color-disabled"></i>
      </span>
    </button>
    <p class="e-text-label">Circled Icons that can be used for this button</p>
    <div class="e-m-8">
      <i class="e-icon e-icon--information_circle e-icon--sm e-m-8"></i>
      <i class="e-icon e-icon--add_circle e-icon--sm e-m-8"></i>
      <i class="e-icon e-icon--subtract_circle e-icon--sm e-m-8"></i>
      <i class="e-icon e-icon--check_circle e-icon--sm e-m-8"></i>
      <i class="e-icon e-icon--warning_circle e-icon--sm e-m-8"></i>
      <i class="e-icon e-icon--question_circle e-icon--sm e-m-8"></i>
    </div>
    <div class="e-m-8">
      <i class="e-icon e-icon--information_circle-filled-color e-icon--sm e-m-8"></i>
      <i class="e-icon e-icon--add_circle-filled-color e-icon--sm e-m-8"></i>
      <i class="e-icon e-icon--subtract_circle-filled-color e-icon--sm e-m-8"></i>
      <i class="e-icon e-icon--check_circle-filled-color e-icon--sm e-m-8"></i>
      <i class="e-icon e-icon--warning_circle-filled-color e-icon--sm e-m-8"></i>
      <i class="e-icon e-icon--question_circle-filled-color e-icon--sm e-m-8"></i>
    </div>
  </div>
</div>
`;

  example6 = `<div>
  <h3 class="e-title-small">Large</h3>
  <button class="e-btn e-btn--loading e-btn--lg e-m-16">
    <span></span>
    <span></span>
    <span></span>
  </button>
</div>
<div>
  <h3 class="e-title-small">Medium (default)</h3>
  <button class="e-btn e-btn--loading e-m-16">
    <span></span>
    <span></span>
    <span></span>
  </button>
</div>
<div>
  <h3 class="e-title-small">Small</h3>
  <button class="e-btn e-btn--loading e-btn--sm e-m-16">
    <span></span>
    <span></span>
    <span></span>
  </button>
</div>
`;

  example7 = `<div>
<a class="e-btn e-m-16" href="www.elvia.no">
  <span class="e-btn__title">Anchor tags</span>
</a>

<a class="e-btn e-m-16" href="www.elvia.no">
  <span class="e-btn__icon">
    <i class="e-icon e-icon--download e-icon--inverted"></i>
    <i class="e-icon e-icon--download"></i>
  </span>
  <span class="e-btn__title">With Icon</span>
</a>
</div>

<div>
  <a class="e-btn e-btn--secondary e-m-16" href="www.elvia.no">
    <span class="e-btn__title">Secondary</span>
  </a>

  <a class="e-btn e-btn--secondary e-m-16" href="www.elvia.no">
    <span class="e-btn__title">With icon</span>
    <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
  </a>
</div>

<div>
  <a class="e-btn e-btn--tertiary e-m-16" href="www.elvia.no">
    <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
    <span class="e-btn__title">Tertiary</span>
  </a>

  <a class="e-btn e-btn--icon e-btn--lg e-m-16" href="www.elvia.no">
    <span class="e-btn__icon"><i class="e-icon e-icon--upload"></i></span>
  </a>
</div>
`;

  example8 = `<div>
  <h3 class="e-title-small">Primary buttons</h3>
  <button class="e-btn e-btn---hover e-m-16">
    <span class="e-btn__title">Hover</span>
  </button>
  <button class="e-btn e-btn---active e-m-16">
    <span class="e-btn__title">Active</span>
  </button>
  <button class="e-btn e-btn---focus e-m-16">
    <span class="e-btn__title">Focus</span>
  </button>
  <button class="e-btn e-btn---disabled e-m-16">
    <span class="e-btn__title">Disabled</span>
  </button>
</div>
<div>
  <h3 class="e-title-small">Secondary buttons</h3>
  <button class="e-btn e-btn--secondary e-btn---hover e-m-16">
    <span class="e-btn__title">Hover</span>
  </button>
  <button class="e-btn e-btn--secondary e-btn---active e-m-16">
    <span class="e-btn__title">Active</span>
  </button>
  <button class="e-btn e-btn--secondary e-btn---focus e-m-16">
    <span class="e-btn__title">Focus</span>
  </button>
  <button class="e-btn e-btn--secondary e-btn--lg e-m-16" disabled>
    <span class="e-btn__title">Disabled</span>
  </button>
</div>
<div>
  <h3 class="e-title-small">Tertiary buttons</h3>
  <button class="e-btn e-btn--tertiary e-btn---hover e-m-16">
    <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
    <span class="e-btn__title">Hover</span>
  </button>
  <button class="e-btn e-btn--tertiary e-btn---active e-m-16">
    <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
    <span class="e-btn__title">Active</span>
  </button>
  <button class="e-btn e-btn--tertiary e-btn---focus e-m-16">
    <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
    <span class="e-btn__title">Focus</span>
  </button>
  <button class="e-btn e-btn--tertiary e-btn---disabled e-m-16">
    <span class="e-btn__icon"><i class="e-icon e-icon--download e-icon--color-disabled"></i></span>
    <span class="e-btn__title">Disabled</span>
  </button>
</div>
<div>
  <h3 class="e-title-small">Icon buttons</h3>
  <div>
    <button class="e-btn e-btn--icon e-btn---hover e-m-16">
      <span class="e-btn__icon"><i class="e-icon e-icon--upload"></i></span>
    </button>
    <button class="e-btn e-btn--icon e-btn---active e-m-16">
      <span class="e-btn__icon"><i class="e-icon e-icon--upload"></i></span>
    </button>
    <button class="e-btn e-btn--icon e-btn---focus e-m-16">
      <span class="e-btn__icon"><i class="e-icon e-icon--upload"></i></span>
    </button>
    <button class="e-btn e-btn--icon e-btn---disabled e-m-16">
      <span class="e-btn__icon"><i class="e-icon e-icon--upload e-icon--color-disabled"></i></span>
    </button>
  </div>
  <div>
    <button class="e-btn e-btn--icon e-btn--circled e-btn---hover e-m-16">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--information_circle"></i>
        <i class="e-icon e-icon e-icon--information_circle-filled-color"></i>
      </span>
    </button>
    <button class="e-btn e-btn--icon e-btn--circled e-btn---active e-m-16">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--information_circle"></i>
        <i class="e-icon e-icon e-icon--information_circle-filled-color"></i>
      </span>
      </span>
    </button>
    <button class="e-btn e-btn--icon e-btn--circled e-btn---focus e-m-16">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--information_circle"></i>
        <i class="e-icon e-icon e-icon--information_circle-filled-color"></i>
      </span>
    </button>
    <button class="e-btn e-btn--icon e-btn--circled e-btn---disabled e-m-16">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--information_circle e-icon--color-disabled"></i>
      </span>
    </button>
  </div>
</div>
`;
}
