import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { consume } from '@lit/context';
import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { type DropdownContext, dropdownContext } from './dropdown-context';

@customElement('e-option')
export class EOption extends LitElement {
  static styles = css`
    :host {
      height: var(--option-height);
      display: flex;
      align-items: center;

      ${unsafeCSS(getTypographyCss('text-md'))};
    }

    .option {
      all: unset;
      padding-left: 16px;
      cursor: pointer;
      width: 100%;
      padding: 0 16px;
      height: 100%;
      display: flex;
      align-items: center;

      &.selected {
        background-color: ${unsafeCSS(getThemeColor('background-selected-2'))};
      }
      &:hover,
      &:focus-within {
        background-color: ${unsafeCSS(getThemeColor('background-hover-2'))};
      }
      &.disabled {
        cursor: not-allowed;
        background-color: ${unsafeCSS(getThemeColor('background-disabled-1'))};
        color: ${unsafeCSS(getThemeColor('text-disabled-1'))};
      }
    }
  `;

  @property({ type: String })
  value: string;

  @property({ type: Boolean })
  disabled = false;

  @consume({ context: dropdownContext, subscribe: true })
  dropdownContext: DropdownContext;

  render() {
    const selected = this.dropdownContext.value === this.value;
    return html`<button
      class=${classMap({ option: true, disabled: this.disabled, selected: selected })}
      @click=${this.updateValue}
    >
      <slot></slot>
    </button>`;
  }

  private updateValue = () => {
    this.dropdownContext.updateValue(this.value);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    'e-option': EOption;
  }
}
