import * as ReactPopoverComponent from '../../../react.js';
import { ElviaComponent } from '@elvia/component';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElviaPopover extends ElviaComponent {
  static get observedAttributes(): string[] {
    return ['title', 'description', 'posX', 'posY'];
  }

  constructor() {
    super(ElviaPopover, ReactPopoverComponent.Popover, style, 'dialog');
  }
}

window.customElements.define('elvia-popover', ElviaPopover as any);
