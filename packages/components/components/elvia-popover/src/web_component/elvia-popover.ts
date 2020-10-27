import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as retargetEvents from 'react-shadow-dom-retarget-events';
import * as ReactPopoverComponent from '../../react/js/elvia-popover.js';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElviaPopover extends HTMLElement {
  mountPoint!: HTMLSpanElement;
  static get observedAttributes(): string[] {
    return ['title', 'description', 'trigger'];
  }

  createPopover(title: string, description: string, trigger?: string): React.ReactElement {
    const data = { title, description, trigger };
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
    const trigger = this.getAttribute('trigger');
    if (!trigger) {
      ReactDOM.render(this.createPopover(title, description, undefined), this.mountPoint);
    } else if (trigger && title && description) {
      ReactDOM.render(this.createPopover(title, description, trigger), this.mountPoint);
    }
  }
}

window.customElements.define('elvia-popover', ElviaPopover);
