import { ElvisIllustration } from './common/elvisIllustration';

const illustration = `{{INSERT_SVG}}`;
const style = `{{INSERT_STYLE}}`;

export class INSERT_ILLUSTRATION_CLASS_NAME extends ElvisIllustration {
  constructor() {
    super(illustration, style);
  }
}

window.customElements.define(`{{INSERT_COMPONENT_NAME}}`, INSERT_ILLUSTRATION_CLASS_NAME);
