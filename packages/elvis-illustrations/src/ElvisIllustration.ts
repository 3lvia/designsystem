import { getThemeColor } from '@elvia/elvis-colors';
import { convertStringToIllustrationColor, greyColors, purpleColors, type IllustrationColor } from './colors';

export class ElvisIllustration extends HTMLElement {
  static readonly observedAttributes = ['size', 'color'];
  size?: string;

  private wrapper: HTMLSpanElement;
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
    if (this.wrapper) {
      this.wrapper.innerHTML = this.getIllustration(convertedColor);
    }
  }

  connectedCallback() {
    this.wrapper = document.createElement('span');
    this.wrapper.innerHTML = this.getIllustration(this.color);
    this.wrapper.style.display = 'contents';
    this.appendChild(this.wrapper);
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'size') {
      this.style.display = 'block';
      this.style.height = newValue;
      this.style.width = newValue;
      this.size = newValue;
    } else if (name === 'color') {
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
