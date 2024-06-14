import { LitElement, css, html } from 'lit';
import { customElement, queryAssignedElements } from 'lit/decorators.js';

import { ElviaBreadcrumb } from './breadcrumb';

@customElement('e-breadcrumbs')
export class ElviaBreadcrumbs extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .breadcrumbs-container {
      display: flex;
      align-items: center;
      gap: 8px;
      container: breadcrumbs / inline-size;
    }

    @container breadcrumbs (max-width: 576px) {
      ::slotted(e-breadcrumb:not(:nth-last-child(2))) {
        display: none;
      }

      ::slotted(e-breadcrumb:nth-last-child(2)) {
        --flex-direction: row-reverse;
        --icon-rotation: 180deg;
        --font-weight: 500;
      }
    }
  `;

  @queryAssignedElements({ selector: 'e-breadcrumb' })
  breadcrumbs!: ElviaBreadcrumb[];

  render() {
    return html`
      <nav class="breadcrumbs-container">
        <slot @slotchange=${this.onSlotChange}></slot>
      </nav>
    `;
  }

  private onSlotChange() {
    this.breadcrumbs.forEach((breadcrumb, index) => {
      const isLast = index === this.breadcrumbs.length - 1;
      breadcrumb.classList.toggle('active', isLast);

      const anchorElement = breadcrumb.anchors[0];
      if (anchorElement) {
        anchorElement.ariaCurrent = isLast ? 'page' : null;
      }
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-breadcrumbs': ElviaBreadcrumbs;
  }
}
