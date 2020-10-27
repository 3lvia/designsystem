import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as retargetEvents from 'react-shadow-dom-retarget-events';
import * as ReactPopoverComponent from '../../react/js/elvia-popover.js';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElviaPopover extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['trigger', 'title', 'description'];
  }

  createPopover(trigger?: string, title: string, description: string): React.ReactElement {
    const data = { trigger, title, description };
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
    const trigger = this.getAttribute('trigger');
    const title = this.getAttribute('title')!;
    const description = this.getAttribute('description')!;
    if (!trigger) {
      ReactDOM.render(this.createPopover(undefined, title, description), this.mountPoint);
    } else if (trigger && title && description) {
      ReactDOM.render(this.createPopover(trigger, title, description), this.mountPoint);
    }
  }
}

window.customElements.define('elvia-popover', ElviaPopover);
