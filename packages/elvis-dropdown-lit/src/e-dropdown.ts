import arrowDownBold from '@elvia/elvis-assets-icons/dist/icons/arrowDownBold';
import { getShadow, getThemeColor } from '@elvia/elvis-colors';
import { provide } from '@lit/context';
import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { DropdownContext, dropdownContext } from './dropdown-context';

const arrowDownIcon = arrowDownBold.getIcon();

@customElement('e-dropdown')
export class EDropdown extends LitElement {
  static styles = css`
    :host {
      --width: 448px;
      --option-height: 48px;
      display: block;
      width: var(--width);
      position: relative;
    }

    .input {
      width: inherit;
      border: 1px solid ${unsafeCSS(getThemeColor('border-1'))};
      border-radius: 8px;

      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      padding: 8px 8px 8px 16px;

      input {
        all: unset;
        width: inherit;
      }

      &:focus-within {
        border-color: ${unsafeCSS(getThemeColor('border-hover-1'))};
      }

      .icon {
        display: grid;
        place-items: center;

        transition: transform 0.2s ease-in-out;
        &.open {
          transform: rotate(180deg);
        }
      }
    }

    .options {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      width: calc(var(--width) - calc(2 * 8px));
      display: flex;
      flex-direction: column;
      box-shadow: ${unsafeCSS(getShadow('medium'))};
      border-radius: 8px;
      z-index: 1;
      max-height: calc(var(--option-height) * 5.5);
      overflow-y: auto;
      background-color: ${unsafeCSS(getThemeColor('background-overlay-1'))};
    }

    .options e-option {
      &:hover {
        z-index: 2;
        background-color: ${unsafeCSS(getThemeColor('background-hover-1'))};
      }
    }
  `;

  @property({ type: String })
  label: string;

  @property({ type: String })
  placeholder: string;

  @property()
  isOpen = false;

  @property({ type: String })
  value = '';

  @provide({ context: dropdownContext })
  dropdownContext: DropdownContext = {
    value: this.value,
    updateValue: (value) => {
      this.value = value;
      this._selectedOptionLabel = this.findLabelFromValue(value) ?? '';
      this.triggerValueChangeEvent(value);
    },
  };

  @state()
  private _selectedOptionLabel = '';

  render() {
    return html`
      <label>
        ${this.label && html`<span>${this.label}</span>`}
        <div class="input">
          <input
            @focus=${this.handleOpen}
            value=${this._selectedOptionLabel}
            placeholder=${this.placeholder}
          />
          <div class=${classMap({ icon: true, open: this.isOpen })} .innerHTML=${arrowDownIcon}></div>
        </div>
      </label>
      ${this.isOpen
        ? html`<div class="options">
            <slot></slot>
          </div>`
        : ''}
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this.closeOnOutsideClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this.closeOnOutsideClick);
  }

  private handleOpen() {
    this.isOpen = true;
  }

  private handleClose = () => {
    this.isOpen = false;
  };

  private closeOnOutsideClick = (event: MouseEvent) => {
    if (!this.contains(event.target as Node)) {
      this.handleClose();
    }
  };

  private findLabelFromValue(value: string) {
    if (!value) {
      throw new Error(`No value found, have you set the value on the e-option?`);
    }
    const newLabel = Array.from(this.querySelectorAll(`e-option`)).find((option) => option.value === value);
    if (newLabel) {
      return newLabel.textContent;
    }
    throw new Error(`No option with value ${value} found, have you set the correct value on the e-option?`);
  }

  private triggerValueChangeEvent(value: string) {
    this.dispatchEvent(new CustomEvent('valueChange', { detail: { value } }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    'e-dropdown': EDropdown;
  }
}
