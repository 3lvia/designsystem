import { ElvisIllustration } from './ElvisIllustration';

const illustration = `{{INSERT_SVG}}`;

export class INSERT_ILLUSTRATION_CLASS_NAME extends ElvisIllustration {
  constructor() {
    super(illustration);
  }
}

window.customElements.define(`{{INSERT_COMPONENT_NAME}}`, INSERT_ILLUSTRATION_CLASS_NAME);
