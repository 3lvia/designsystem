import * as ReactProgressbarComponent from '../../../react.js';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElvisProgressbar extends ElvisComponentWrapper {
  static get observedAttributes(): any[] {
    return ['range_value', 'indeterminate', 'error'];
  }

  set range_value(newValue: any) {
    super.setAttribute('range_value', newValue);
  }

  set indeterminate(newValue: any) {
    super.setAttribute('indeterminate', newValue);
  }
  set error(newValue: any) {
    super.setAttribute('error', newValue);
  }

  get range_value() {
    return super.getAttribute('range_value');
  }

  get indeterminate() {
    return super.getAttribute('indeterminate');
  }

  get error() {
    return super.getAttribute('error');
  }

  constructor() {
    super(ElvisProgressbar, ReactProgressbarComponent.ProgressLinear, style, 'progressbar');
  }
}

window.customElements.define('elvis-progress-linear', ElvisProgressbar as any);
