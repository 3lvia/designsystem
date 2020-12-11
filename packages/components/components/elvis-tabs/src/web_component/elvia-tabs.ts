import * as ReactTabsComponent from '../../../react.js';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElviaTabs extends ElvisComponentWrapper {

  static get observedAttributes(): any[] {
    return ['labels', 'selected', 'disabled'];
  }

  set labels(newValue: string[]) {
    super.setAttribute('labels', JSON.stringify(newValue));
  }
  get labels(): string[] {
    return super.getAttribute('labels');
  }

  set selected(newValue: number) {
    super.setAttribute('selected', JSON.stringify(newValue));
  }
  get selected(): number {
    return super.getAttribute('selected');
  }

  set disabled(newValue: number[]) {
    super.setAttribute('disabled', JSON.stringify(newValue));
  }
  get disabled(): number[] {
    return super.getAttribute('disabled');
  }

  constructor() {
    super(ElviaTabs, ReactTabsComponent.Tabs, style, 'tabs');
  }
}

window.customElements.define('elvia-tabs', ElviaTabs as any);
