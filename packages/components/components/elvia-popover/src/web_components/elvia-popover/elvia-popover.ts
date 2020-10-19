import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as retargetEvents from 'react-shadow-dom-retarget-events';
import * as ReactPopoverComponent from '../../../../dist/react/js/elvia-popover/elvia-popover.js';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElviaPopover extends HTMLElement {
  static get observedAttributes() {
    return ['title'];
  }

  mountPoint = document.createElement('span');

  createPopover(title?: string) {
    const data = { title };
    return React.createElement(ReactPopoverComponent.Popover, data, React.createElement('slot'));
  }

  connectedCallback() {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = style;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.mountPoint);
    shadowRoot.appendChild(styleTag);

    const title = this.getAttribute('title');
    ReactDOM.render(this.createPopover(title), this.mountPoint);
    retargetEvents(shadowRoot);
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    console.log("attributeChangedCallback");
    console.log(oldValue, newValue);
    if (name === 'title') {
      ReactDOM.render(this.createPopover(newValue), this.mountPoint);
    }
  }
}

window.customElements.define('elvia-popover', ElviaPopover);