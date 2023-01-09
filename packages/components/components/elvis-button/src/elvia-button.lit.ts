import { LitElement, html, TemplateResult, CSSResultGroup, css, unsafeCSS, CSSResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { ElviaColor, getColor as getElvisColor } from '@elvia/elvis-colors';
import { getTypographyCss, TypographyName } from '@elvia/elvis-typography';

export type Size = 'sm' | 'md' | 'lg';

const getColor = (colorName: ElviaColor): CSSResult => {
  return unsafeCSS(getElvisColor(colorName) as unknown as CSSResultGroup);
};

const getTypography = <Key extends TypographyName>(typography: Key): CSSResult => {
  return unsafeCSS(getTypographyCss(typography));
};

@customElement('elvia-button')
export class ElviaButton extends LitElement {
  static styles = css`
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin: 0;

      height: 40px;
      border: 1px solid ${getColor('elvia-off')};
      padding: 0 calc(24px - 1px);
      background-color: ${getColor('elvia-off')};
      color: ${getColor('elvia-on')};
      transition: transform 100ms;
      border-radius: 99px;
      cursor: pointer;
    }

    .btn:disabled {
      cursor: default;
      border-color: ${getColor('disabled')};
      background-color: ${getColor('disabled')};
    }

    .btn:not(:disabled)::selection {
      background-color: ${getColor('elvia-charge')};
    }

    .btn:not(:disabled):hover {
      background-color: ${getColor('elvia-charge')};
      border-color: ${getColor('elvia-charge')};
      color: ${getColor('elvia-off')};
    }

    .btn:not(:disabled):active {
      border-color: transparent;
      background-clip: padding-box;
    }

    .btn .btn__title,
    .btn--md .btn__title {
      ${getTypography('text-md')};
      line-height: 1.25;
      font-weight: 500;
    }

    .btn--sm {
      height: 32px;
      padding: 0 calc(16px - 1px);
    }

    .btn--sm .btn__title {
      ${getTypography('text-sm')};
      line-height: 1.15;
      font-weight: 500;
    }

    .btn--lg {
      height: 48px;
      padding: 0 calc(32px - 1px);
    }

    .btn--lg .btn__title {
      ${getTypography('text-lg')};
      font-size: 1.125rem;
      line-height: 1;
    }

    .btn--secondary {
    }

    .btn--tertiary {
    }

    .btn--danger {
    }
  `;

  @property()
  size: 'lg' | 'md' | 'sm' = 'md';

  @property({ type: Boolean })
  isActive = false;

  @property()
  type: 'button' | 'submit' = 'button';

  @property()
  kind: 'primary' | 'secondary' | 'tertiary' | 'danger' = 'primary';

  render(): TemplateResult {
    const classes: ClassInfo = {
      btn: true,
      'btn--primary': this.kind === 'primary',
      'btn--secondary': this.kind === 'secondary',
      'btn--tertiary': this.kind === 'tertiary',
      'btn--danger': this.kind === 'danger',
      'btn--sm': this.size === 'sm',
      'btn--md': this.size === 'md',
      'btn--lg': this.size === 'lg',
    };

    return html`
      <button type=${ifDefined(this.type)} class=${classMap(classes)}>
        <span class="btn__title">
          <slot></slot>
        </span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'elvia-button': ElviaButton;
  }
}
