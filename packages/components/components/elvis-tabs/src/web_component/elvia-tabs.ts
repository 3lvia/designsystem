import * as ReactTabsComponent from '../../../react.js';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElviaTabs extends ElvisComponentWrapper {

  static get observedAttributes(): any[] {
    return ['label'];
  }

  constructor() {
    super(ElviaTabs, ReactTabsComponent.Tabs, style, 'tabs');
  }
}

window.customElements.define('elvia-tabs', ElviaTabs as any);
