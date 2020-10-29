import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as retargetEvents from 'react-shadow-dom-retarget-events';
import * as ReactCheckboxComponent from '../../react/js/elvia-checkbox.js';
import { Checkbox } from '@elvia/checkbox/web_component';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElviaCheckbox extends HTMLElement {
  mountPoint!: HTMLSpanElement;
  static get observedAttributes(): string[] {
    return ['label', 'name', 'value', 'id', 'size'];
  }

  createCheckbox(label: string, name: string, value: string, id: string, size: string): React.ReactElement {
    const data = { label, name, value, id, size };
    return React.createElement(ReactCheckboxComponent.Checkbox, data, React.createElement('slot'));
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
    const label = this.getAttribute('label')!;
    const name = this.getAttribute('name')!;
    const value = this.getAttribute('value')!;
    const id = this.getAttribute('id')!;
    const size = this.getAttribute('size')!;
    ReactDOM.render(this.createCheckbox(label, name, value, id, size), this.mountPoint);
  }
}

window.customElements.define('elvia-checkbox', ElviaCheckbox);
