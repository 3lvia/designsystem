import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as retargetEvents from 'react-shadow-dom-retarget-events';
import * as ReactCheckboxComponent from '../../react/js/elvia-checkbox.js';
import { ElviaComponent } from '@elvia/component';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElviaCheckbox extends ElviaComponent {

  private mountPoint!: HTMLSpanElement;

  static get observedAttributes(): any[] {
    return ['label', 'name', 'value', 'id', 'size', 'checked', 'disabled', 'required'];
  }

  get data(): any {
    return this._data;
  }

  constructor() {
    super();
    this._data = {};
  }

  // CAN REMOVE?
  connectedCallback(): void {
    this.setAttribute('role', 'checkbox')
    this.mountPoint = document.createElement('span');
    const styleTag = document.createElement('style');
    styleTag.innerHTML = style;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.mountPoint);
    shadowRoot.appendChild(styleTag);

    this.renderReactDOM();
    retargetEvents(shadowRoot);
  }

  // CAN REMOVE?
  attributeChangedCallback(): void {
    this.renderReactDOM();
  }

  /** Used to update _data and dispatch event */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setProps(newProps: any, preventRerender?: boolean): void {
    Object.keys(newProps).forEach(key => {
      this._data[key] = this.clone(newProps[key]);
    });

    // Consider throttling to every 25-50ms and last event
    this.mountPoint.dispatchEvent(new CustomEvent('props-changed', {
      bubbles: true,
      composed: true,
      detail: this.clone(this._data)
    }));

    if (!preventRerender) {
      this.renderReactDOM();
    }

  }

  /**
   * Maps the attributes prefixed with "elvia-" to the data object, but does not overwrite existing data
   */
  private mapAttributesToData() {
    ElviaCheckbox.observedAttributes.forEach((attr: any) => {
      if (!this._data[attr]) {
        this._data[attr] = this.getAttribute(attr);
      }
    });
  }

  private renderReactDOM(): void {
    this.mapAttributesToData();
    ReactDOM.render(this.createCheckbox(this._data), this.mountPoint);
  }

  private createCheckbox(data: any): React.ReactElement {
    // Does not create a reliable deep clone, but is sufficient for v1
    const reactData = this.clone(data);
    reactData.webcomponent = this;
    return React.createElement(ReactCheckboxComponent.Checkbox, reactData, React.createElement('slot'));
  }
}

window.customElements.define('elvia-checkbox', ElviaCheckbox);
