import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-button-doc',
  templateUrl: './button-doc.component.html',
  styleUrls: ['./button-doc.component.scss'],
})
export class ButtonDocComponent {

  externalUrl = getComponent('button-doc').externalUrl;
  componentStatus = getComponent('button-doc').status;

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
`;

  exampleDanger = `<div>
  <button class="e-btn e-btn--primary e-btn--danger e-m-16">
    <span class="e-btn__title">Primary</span>
  </button>
  <button class="e-btn e-btn--primary e-btn--danger e-m-16" disabled>
    <span class="e-btn__title">Disabled</span>
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
`;

example3 = `<div>
  <h3 class="e-title-small">Large</h3>
  <button class="e-btn e-btn--tertiary e-btn--lg e-m-16">
    <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
    <span class="e-btn__title">Tertiary</span>
  </button>
  <button class="e-btn e-btn--tertiary e-btn--lg e-m-16" disabled>
    <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
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
    <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
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
    <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
    <span class="e-btn__title">Disabled</span>
  </button>
</div>
`;

example4 = `<div>
  <div>
    <p class="e-text-body">Large</p>
    <button class="e-btn e-btn--icon e-btn--lg e-m-16">
      <span class="e-btn__icon"><i class="e-icon e-icon--upload"></i></span>
    </button>
    <button class="e-btn e-btn--icon e-btn--lg e-m-16" disabled>
      <span class="e-btn__icon"><i class="e-icon e-icon--upload"></i></span>
    </button>
  </div>
  <div>
  <p class="e-text-body">Medium (default)</p>
    <button class="e-btn e-btn--icon e-m-16">
      <span class="e-btn__icon"><i class="e-icon e-icon--upload"></i></span>
    </button>
    <button class="e-btn e-btn--icon e-m-16" disabled>
      <span class="e-btn__icon"><i class="e-icon e-icon--upload"></i></span>
    </button>
  </div>
  <div>
    <p class="e-text-body">Small</p>
    <button class="e-btn e-btn--icon e-btn--sm e-m-16">
      <span class="e-btn__icon"><i class="e-icon e-icon--upload"></i></span>
    </button>
    <button class="e-btn e-btn--icon e-btn--sm e-m-16" disabled>
      <span class="e-btn__icon"><i class="e-icon e-icon--upload"></i></span>
    </button>
  </div>
</div>
`;

  exampleIconCircled = `<h3 class="e-title-small">
  Icons that can be used for this button
</h3>
<div>
  <span>
    <i class="e-icon e-icon--information-circle e-m-8"></i>
    <i class="e-icon e-icon--add-circle e-m-8"></i>
    <i class="e-icon e-icon--subtract-circle e-m-8"></i>
    <i class="e-icon e-icon--check-circle e-m-8"></i>
    <i class="e-icon e-icon--remove-circle e-m-8"></i>
    <i class="e-icon e-icon--alert-circle e-m-8"></i>
    <i class="e-icon e-icon--question-circle e-m-8"></i>
  </span>
</div>
<div>
  <div>
    <p class="e-text-body">Large</p>
    <button class="e-btn e-btn--icon e-btn--circled e-btn--lg e-m-16">
      <span class="e-btn__icon"><i class="e-icon e-icon--remove-circle"></i></span>
    </button>
    <button class="e-btn e-btn--icon e-btn--circled e-btn--lg e-m-16" disabled>
      <span class="e-btn__icon"><i class="e-icon e-icon--remove-circle"></i></span>
    </button>
  </div>
  <div>
    <p class="e-text-body">Medium (default)</p>
    <button class="e-btn e-btn--icon e-btn--circled e-m-16">
      <span class="e-btn__icon"><i class="e-icon e-icon--remove-circle"></i></span>
    </button>
    <button class="e-btn e-btn--icon e-btn--circled e-m-16" disabled>
      <span class="e-btn__icon"><i class="e-icon e-icon--remove-circle"></i></span>
    </button>
  </div>
</div>`;

  exampleIconDanger = `<div>
  <button class="e-btn e-btn--icon e-btn--danger e-m-16">
    <span class="e-btn__icon"><i class="e-icon e-icon--remove-circle"></i></span>
  </button>
  <button class="e-btn e-btn--icon e-btn--danger e-m-16" disabled>
    <span class="e-btn__icon"><i class="e-icon e-icon--remove-circle"></i></span>
  </button>
</div>
  `;

  example5 = `<div>
  <h3 class="e-title-small">Primary buttons</h3>
  <div>
    <button class="e-btn e-m-16">
      <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
      <span class="e-btn__title">Icon button</span>
    </button>
    <button class="e-btn e-m-16" disabled>
      <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
      <span class="e-btn__title">Icon button</span>
    </button>
  </div>
  <div>
    <button class="e-btn e-m-16">
      <span class="e-btn__title">Icon button</span>
      <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
    </button>
    <button class="e-btn e-m-16" disabled>
      <span class="e-btn__title">Icon button</span>
      <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
    </button>
  </div>
</div>
<div>
  <h3 class="e-title-small">Secondary buttons</h3>
  <div>
    <button class="e-btn e-btn--secondary e-m-16">
      <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
      <span class="e-btn__title">Icon button</span>
    </button>
    <button class="e-btn e-btn--secondary e-m-16" disabled>
      <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
      <span class="e-btn__title">Icon button</span>
    </button>
  </div>
  <div>
    <button class="e-btn e-btn--secondary e-m-16">
      <span class="e-btn__title">Icon button</span>
      <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
    </button>
    <button class="e-btn e-btn--secondary e-m-16" disabled>
      <span class="e-btn__title">Icon button</span>
      <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
    </button>
  </div>
</div>
<div>
  <h3 class="e-title-small">Tertiary buttons</h3>
  <div>
    <button class="e-btn e-btn--tertiary e-m-16">
      <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
      <span class="e-btn__title">Icon button</span>
    </button>
    <button class="e-btn e-btn--tertiary e-m-16" disabled>
      <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
      <span class="e-btn__title">Icon button</span>
    </button>
  </div>
  <div>
    <button class="e-btn e-btn--tertiary e-m-16">
      <span class="e-btn__title">Icon button</span>
      <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
    </button>
    <button class="e-btn e-btn--tertiary e-m-16" disabled>
      <span class="e-btn__title">Icon button</span>
      <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
    </button>
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
  <h3 class="e-title-small">Primary buttons</h3>
  <button class="e-btn e-btn---hover e-m-16">
    Hover
  </button>
  <button class="e-btn e-btn---active e-m-16">
    Active
  </button>
  <button class="e-btn e-btn---focus e-m-16">
    Focus
  </button>
  <button class="e-btn e-btn---disabled e-m-16">
    Disabled
  </button>
</div>
<div>
  <h3 class="e-title-small">Secondary buttons</h3>
  <button class="e-btn e-btn--secondary e-btn---hover e-m-16">
    Hover
  </button>
  <button class="e-btn e-btn--secondary e-btn---active e-m-16">
    Active
  </button>
  <button class="e-btn e-btn--secondary e-btn---focus e-m-16">
    Focus
  </button>
  <button class="e-btn e-btn--secondary e-btn---disabled e-m-16">
    Disabled
  </button>
</div>
<div>
  <h3 class="e-title-small">Tertiary buttons</h3>
  <button class="e-btn e-btn--tertiary e-btn---hover e-m-16">
    Hover
  </button>
  <button class="e-btn e-btn--tertiary e-btn---active e-m-16">
    Active
  </button>
  <button class="e-btn e-btn--tertiary e-btn---focus e-m-16">
    Focus
  </button>
  <button class="e-btn e-btn--tertiary e-btn---disabled e-m-16">
    Disabled
  </button>
</div>
<div>
  <h3 class="e-title-small">Icon buttons transparent</h3>
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
    <span class="e-btn__icon"><i class="e-icon e-icon--upload"></i></span>
  </button>
</div>
<div>
  <h3 class="e-title-small">Icon buttons circled</h3>
  <button class="e-btn e-btn--icon e-btn--circled e-btn---hover e-m-16">
    <span class="e-btn__icon"><i class="e-icon e-icon--remove-circle"></i></span>
  </button>
  <button class="e-btn e-btn--icon e-btn--circled e-btn---active e-m-16">
    <span class="e-btn__icon"><i class="e-icon e-icon--remove-circle"></i></span>
  </button>
  <button class="e-btn e-btn--icon e-btn--circled e-btn---focus e-m-16">
    <span class="e-btn__icon"><i class="e-icon e-icon--remove-circle"></i></span>
  </button>
  <button class="e-btn e-btn--icon e-btn--circled e-btn---disabled e-m-16">
    <span class="e-btn__icon"><i class="e-icon e-icon--remove-circle"></i></span>
  </button>
</div>
`;

  constructor() { }

}
