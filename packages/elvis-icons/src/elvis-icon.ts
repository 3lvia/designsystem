import DOMPurify from 'dompurify';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { getIcon } from './store';

@customElement('e-icon')
export class ElvisIcon extends LitElement {
  static readonly styles = css`
    :host {
      display: inline-block;
      width: 24px;
      height: 24px;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  `;

  @property({ type: String })
  name = '';

  render() {
    return html`${unsafeHTML(DOMPurify.sanitize(getIcon(this.name).svg))}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-icon': ElvisIcon;
  }
}
