import * as ReactCheckboxComponent from '../../../react.js';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElviaCheckbox extends ElvisComponentWrapper {

  static get observedAttributes(): any[] {
    return ['label', 'name', 'value', 'id', 'size', 'checked', 'disabled', 'required'];
  }

  constructor() {
    super(ElviaCheckbox, ReactCheckboxComponent.Checkbox, style, 'checkbox');
  }
}

window.customElements.define('elvia-checkbox', ElviaCheckbox as any);
