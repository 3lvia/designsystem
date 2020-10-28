import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as retargetEvents from 'react-shadow-dom-retarget-events';
import * as ReactPopoverComponent from '../../react/js/elvia-popover.js';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElviaPopover extends HTMLElement {
  mountPoint!: HTMLSpanElement;
  static get observedAttributes(): string[] {
    return ['title', 'description'];
  }

  createPopover(title: string, description: string): React.ReactElement {
    const data = { title, description };
    return React.createElement(ReactPopoverComponent.Popover, data, React.createElement('slot'));
  }

  connectedCallback(): void {
    this.mountPoint = document.createElement('span');
    const styleTag = document.createElement('style');
    styleTag.innerHTML = style;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.mountPoint);
    shadowRoot.appendChild(styleTag);

    this.renderReactDOM();
    retargetEvents(shadowRoot);
  }

  attributeChangedCallback(): void {
    this.renderReactDOM();
  }

  renderReactDOM(): void {
    const title = this.getAttribute('title')!;
    const description = this.getAttribute('description')!;
    ReactDOM.render(this.createPopover(title, description), this.mountPoint);
  }
}

window.customElements.define('elvia-popover', ElviaPopover);
