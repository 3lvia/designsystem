import DOMPurify from 'dompurify';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { getIcon } from './store';

@customElement('e-icon')
export class ElvisIcon extends LitElement {
  static readonly styles = css`
    :host {
      --_icon-size: 32px;

      display: inline-block;

      // Should this set height and width, or height/width + aspect ratio?
      width: var(--_icon-size);
      height: var(--_icon-size);
      line-height: 0;
    }

    :host([size='xxs']) {
      --_icon-size: 8px;
    }

    :host([size='xs']) {
      --_icon-size: 16px;
    }

    :host([size='sm']) {
      --_icon-size: 24px;
    }

    :host([size='md']) {
      --_icon-size: 32px;
    }

    :host([size='lg']) {
      --_icon-size: 40px;
    }

    :host([size='xl']) {
      --_icon-size: 48px;
    }

    :host([size='xxl']) {
      --_icon-size: 56px;
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
