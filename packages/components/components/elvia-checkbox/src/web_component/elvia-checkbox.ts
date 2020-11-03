import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as retargetEvents from 'react-shadow-dom-retarget-events';
import * as ReactCheckboxComponent from '../../react/js/elvia-checkbox.js';
import { Checkbox } from '@elvia/checkbox/web_component';
import { check } from '../../../../../elvis/icons';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElviaCheckbox extends HTMLElement {
  mountPoint!: HTMLSpanElement;
  static get observedAttributes(): any[] {
    return ['label', 'name', 'id', 'value', 'size', 'checked', 'disabled', 'requiered'];
  }

  createCheckbox(
    label: string,
    name: string,
    id: string,
    value: string,
    size: string,
    checked: string,
    disabled: string,
    requiered: string,
  ): React.ReactElement {
    const data = { label, name, id, value, size, checked, disabled, requiered };
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
    const id = this.getAttribute('id')!;
    const value = this.getAttribute('value')!;
    const size = this.getAttribute('size')!;
    const checked = this.getAttribute('checked')!;
    const disabled = this.getAttribute('disabled')!;
    const requiered = this.getAttribute('requiered')!;
    ReactDOM.render(this.createCheckbox(label, name, id, value, size, checked, disabled, requiered), this.mountPoint);
  }
}

window.customElements.define('elvia-checkbox', ElviaCheckbox);
