import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as retargetEvents from 'react-shadow-dom-retarget-events';
import * as ReactPopoverComponent from '../../react/js/elvia-popover.js';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElviaPopover extends HTMLElement {
  mountPoint!: HTMLSpanElement;
  static get observedAttributes(): string[] {
    return ['title', 'description', 'posX', 'posY'];
  }

  createPopover(title: string, description: string, posX: string, posY: string): React.ReactElement {
    const data = { title, description, posX, posY };
    return React.createElement(ReactPopoverComponent.Popover, data, React.createElement('slot'));
  }

  connectedCallback(): void {
    this.mountPoint = document.createElement('span');
    const styleTag = document.createElement('style');
    styleTag.innerHTML = style;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.mountPoint);
    shadowRoot.appendChild(styleTag);

    setTimeout(() => this.renderReactDOM());
    retargetEvents(shadowRoot);
  }

  attributeChangedCallback(): void {
    setTimeout(() => this.renderReactDOM());
  }

  renderReactDOM(): void {
    const title = this.getAttribute('title')!;
    const description = this.getAttribute('description')!;
    const posX = this.getAttribute('posX')!;
    const posY = this.getAttribute('posY')!;
    ReactDOM.render(this.createPopover(title, description, posX, posY), this.mountPoint);
  }
}

window.customElements.define('elvia-popover', ElviaPopover);
