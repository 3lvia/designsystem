import * as ReactProgressbarrComponent from '../../../react.js';
import { ElviaComponent } from '@elvia/component';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElvisProgressbar extends ElviaComponent {
  static get observedAttributes(): any[] {
    return [];
  }

  constructor() {
    super(ElvisProgressbar, ReactProgressbarrComponent.Progressbar, style, '');
  }
}

window.customElements.define('elvis-progressbar', ElvisProgressbar as any);
