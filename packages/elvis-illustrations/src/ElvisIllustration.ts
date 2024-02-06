import { getThemeColor } from '@elvia/elvis-colors';
import { convertStringToIllustrationColor, greyColors, purpleColors, type IllustrationColor } from './colors';

export class ElvisIllustration extends HTMLElement {
  static readonly observedAttributes = ['color'];

  private _color: IllustrationColor = 'grey';

  constructor(private illustration: string) {
    super();
  }

  get color(): IllustrationColor {
    return this._color;
  }
  set color(newColor: string) {
    const convertedColor = convertStringToIllustrationColor(newColor);
    this._color = convertedColor;
    this.innerHTML = this.getIllustration(convertedColor);
  }

  connectedCallback() {
    this.innerHTML = this.getIllustration(this.color);
    // this.style.display = 'contents';
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'color') {
      this.color = convertStringToIllustrationColor(newValue);
    }
  }

  private getIllustration(color: string | null) {
    let colors = greyColors;
    switch (convertStringToIllustrationColor(color)) {
      case 'grey': {
        colors = greyColors;
        break;
      }
      case 'purple': {
        colors = purpleColors;
        break;
      }
      default: {
        colors = greyColors;
        break;
      }
    }
    return this.illustration
      .replace(/fill="\$background"/g, `fill="${getThemeColor(colors['$background'])}"`)
      .replace(/fill="\$white"/g, `fill="${getThemeColor(colors['$white'])}"`)
      .replace(/fill="\$brand-accent"/g, `fill="${getThemeColor(colors['$brand-accent'])}"`);
  }
}
