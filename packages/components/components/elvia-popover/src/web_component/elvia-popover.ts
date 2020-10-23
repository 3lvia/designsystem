import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as retargetEvents from 'react-shadow-dom-retarget-events';
import * as ReactPopoverComponent from '../../react/js/elvia-popover.js';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElviaPopover extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'description'];
  }

  // title = '';
  // description = '';
  mountPoint = document.createElement('span');

  createPopover(title?: string, description?: string) {
    const data = { title, description };
    return React.createElement(ReactPopoverComponent.Popover, data, React.createElement('slot'));
  }

  getFonts() {
    const link = document.createElement('link');
    link.setAttribute('href', "https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@400;500&display=swap");
    link.setAttribute('rel', 'stylesheet');
    return link;
  }

  connectedCallback() {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = style;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.mountPoint);
    shadowRoot.appendChild(this.getFonts());
    shadowRoot.appendChild(styleTag);

    const title = this.getAttribute('title');
    const description = this.getAttribute('description');
    ReactDOM.render(this.createPopover(title, description), this.mountPoint);
    retargetEvents(shadowRoot);
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    const title = this.getAttribute('title');
    const description = this.getAttribute('description');
    ReactDOM.render(this.createPopover(title, description), this.mountPoint);
  }
}

window.customElements.define('elvia-popover', ElviaPopover);