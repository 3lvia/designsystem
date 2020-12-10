import * as ReactProgressbarrComponent from '../../../react.js';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElvisProgressbar extends ElvisComponentWrapper {
  static get observedAttributes(): any[] {
    return ['rangeValue', 'indeterminate', 'error'];
  }

  constructor() {
    super(ElvisProgressbar, ReactProgressbarrComponent.ProgressLinear, style, 'progressbar');
  }
}

window.customElements.define('elvis-progress-linear', ElvisProgressbar as any);
