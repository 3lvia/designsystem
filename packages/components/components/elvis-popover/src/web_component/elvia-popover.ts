import * as ReactPopoverComponent from '../../../react.js';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElviaPopover extends ElvisComponentWrapper {
  static get observedAttributes(): any[] {
    return ['title', 'description', 'posX', 'posY', 'noClose'];
  }

  constructor() {
    super(ElviaPopover, ReactPopoverComponent.Popover, style, 'dialog');
  }
}

window.customElements.define('elvia-popover', ElviaPopover as any);
