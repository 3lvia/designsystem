import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';

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
    "If you can't think of any particularly useful content in a tooltip.",
    'Don’t use tooltip to explain a concept.',
    'Don’t hide necessary information in a tooltip.',
  ];

  example1 = `<span class="e-tooltip">
  <button class="e-btn e-btn--icon e-btn--lg" aria-label="Vis tooltip">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--star" aria-hidden="true"></i>
    </span>
  </button>
  <span class="e-tooltip__content">Favorite</span>
</span>
`;
  exampleTop = `<div class="e-w-100 e-flex e-justify-content-center e-my-40">
  <span class="e-tooltip">
    <button class="e-btn e-btn--icon e-btn--lg" aria-label="Vis tooltip">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--star" aria-hidden="true"></i>
      </span>
    </button>
    <span class="e-tooltip__content">Favorite</span>
  </span>
</div>
`;
  exampleBottom = `<div class="e-w-100 e-flex e-justify-content-center e-my-40">
  <span class="e-tooltip">
    <button class="e-btn e-btn--icon e-btn--lg" aria-label="Vis tooltip">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--star" aria-hidden="true"></i>
      </span>
    </button>
    <span class="e-tooltip__content e-tooltip__content--bottom">Favorite</span>
  </span>
</div>
`;
  exampleLeft = `<div class="e-w-100 e-flex e-justify-content-center e-my-40">
  <span class="e-tooltip">
    <button class="e-btn e-btn--icon e-btn--lg" aria-label="Vis tooltip">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--star" aria-hidden="true"></i>
      </span>
    </button>
    <span class="e-tooltip__content e-tooltip__content--left">Favorite</span>
  </span>
</div>
`;
  exampleRight = `<div class="e-w-100 e-flex e-justify-content-center e-my-40">
  <span class="e-tooltip">
    <button class="e-btn e-btn--icon e-btn--lg" aria-label="Vis tooltip">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--star" aria-hidden="true"></i>
      </span>
    </button>
    <span class="e-tooltip__content e-tooltip__content--right">Favorite</span>
  </span>
</div>
`;
}
