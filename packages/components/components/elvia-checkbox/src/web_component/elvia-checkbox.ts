import * as ReactCheckboxComponent from '../../../react.js';
import { ElviaComponent } from '@elvia/component';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElviaCheckbox extends ElviaComponent {

  static get observedAttributes(): string[] {
    return ['label', 'name', 'value', 'id', 'size', 'checked', 'disabled', 'required'];
  }

  constructor() {
    super(ElviaCheckbox, ReactCheckboxComponent.Checkbox, style, 'checkbox');
  }
}

window.customElements.define('elvia-checkbox', ElviaCheckbox as any);
