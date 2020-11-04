import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as retargetEvents from 'react-shadow-dom-retarget-events';
import * as ReactCheckboxComponent from '../../react/js/elvia-checkbox.js';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElviaCheckbox extends HTMLElement {
  mountPoint!: HTMLSpanElement;

  static get observedAttributes(): any[] {
    return ['label', 'name', 'value', 'id', 'size', 'checked', 'disabled', 'required'];
  }
  _data: any;
  constructor() {
    super();
    this._data = {};
  }


  set data(val: any) {
    this._data = val;
    let rand = Math.random() > 0.5 ? true : false;
    val.checked = rand;
    this.mountPoint.dispatchEvent(new CustomEvent('data-changed', {
      bubbles: true,
      composed: true,
      detail: this._data
    }));

    this.renderReactDOM();
  }

  get data() {
    return this._data;
  }

  connectedCallback(): void {
    console.log("CONNECTED CALLBACK")
    this.mountPoint = document.createElement('span');
    const styleTag = document.createElement('style');
    styleTag.innerHTML = style;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.mountPoint);
    shadowRoot.appendChild(styleTag);

    this.renderReactDOM();
    retargetEvents(shadowRoot);
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any): void {
    this.renderReactDOM();
  }

  /**
   * Maps the attributes prefixed with "elvia-" to the data object
   */
  mapAttributesToData() {
    ElviaCheckbox.observedAttributes.forEach((attr: any) => {
      this._data[attr] = this.getAttribute(attr);
    });
  }

  renderReactDOM(): void {
    this.mapAttributesToData();
    ReactDOM.render(this.createCheckbox(this._data), this.mountPoint);
  }

  createCheckbox(data: any): React.ReactElement {
    return React.createElement(ReactCheckboxComponent.Checkbox, data, React.createElement('slot'));
  }
}

window.customElements.define('elvia-checkbox', ElviaCheckbox);
