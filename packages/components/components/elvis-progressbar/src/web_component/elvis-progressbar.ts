import * as ReactProgressbarrComponent from '../../../react.js';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElvisProgressbar extends ElvisComponentWrapper {
  static get observedAttributes(): any[] {
    return [];
  }

  constructor() {
    super(ElvisProgressbar, ReactProgressbarrComponent.Progressbar, style, '');
  }
}

window.customElements.define('elvis-progressbar', ElvisProgressbar as any);
