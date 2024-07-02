import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { get } from './store';

@customElement('e-icon')
export class ElvisIcon extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      width: 32px;
      height: 32px;
    }
  `;

  @property({ type: String })
  name = '';

  render() {
    return html`<i class="e-icon" .innerHTML=${get(this.name).svg}></i>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-icon': ElvisIcon;
  }
}
