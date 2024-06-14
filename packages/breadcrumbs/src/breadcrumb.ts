import arrowRightBold from '@elvia/elvis-assets-icons/dist/icons/arrowRightBold';
import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, queryAssignedElements } from 'lit/decorators.js';

const arrowRightIcon = arrowRightBold.getIcon();

@customElement('e-breadcrumb')
export class ElviaBreadcrumb extends LitElement {
  static styles = css`
    :host {
      // We use these variables for mobile view
      --font-weight: 400;
      --flex-direction: row;
      --icon-rotation: 0deg;

      display: flex;
      flex-direction: var(--flex-direction);
      gap: 8px;
      align-items: center;
    }

    :host(.active) {
      .arrow-icon {
        display: none;
      }

      ::slotted(a) {
        --font-weight: 500;
        pointer-events: none;
        cursor: default;
        color: ${unsafeCSS(getThemeColor('text-1'))};
      }
    }

    ::slotted(a) {
      ${unsafeCSS(getTypographyCss('text-sm'))};
      color: ${unsafeCSS(getThemeColor('text-2'))};
      font-weight: var(--font-weight);
      display: block;
      position: relative;
      box-sizing: border-box;
      font-style: normal;
      letter-spacing: 0.2px;
      text-align: left;
      text-decoration: none;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    ::slotted(a)::before {
      content: '';
      position: absolute;
      inset: auto 0 0;
      height: 2px;
      border-radius: 99rem;
      background: ${unsafeCSS(getThemeColor('background-hover-1'))};
      transition: scale 0.3s ease;
      scale: 0 1;
      transform-origin: center left;
    }

    :host(:not(.active)) ::slotted(a:hover)::before {
      scale: 1 1;
    }

    .arrow-icon {
      --icon-size: 8px;
      display: flex;
      width: var(--icon-size);
      height: var(--icon-size);
      rotate: var(--icon-rotation);

      svg {
        width: inherit;
        height: inherit;
      }
    }
  `;

  @queryAssignedElements({ selector: 'a' })
  anchors!: HTMLAnchorElement[];

  render() {
    return html`
      <slot></slot>
      <div class="arrow-icon" .innerHTML=${arrowRightIcon}></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-breadcrumb': ElviaBreadcrumb;
  }
}
