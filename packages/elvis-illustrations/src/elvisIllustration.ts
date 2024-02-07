import { convertStringToIllustrationColor, grey, type IllustrationColor, replaceColors } from './colors';

export class ElvisIllustration extends HTMLElement {
  static readonly observedAttributes = ['color'];
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
    this.wrapper.innerHTML = this.getIllustration(convertedColor);
  }

  connectedCallback() {
    this.wrapper = document.createElement('span');
    this.wrapper.innerHTML = this.getIllustration(this.color);
    this.appendChild(this.wrapper);

    this.attachDefaultStyling();
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    this.attachDefaultStyling();
    if (name === 'color') {
      this.color = convertStringToIllustrationColor(newValue);
    }
  }

  private getIllustration(color: string | null) {
    let colors = grey;
    switch (convertStringToIllustrationColor(color)) {
      case 'grey': {
        colors = grey;
        break;
      }
      // case 'purple': {
      //   colors = purpleColors;
      //   break;
      // }
      default: {
        colors = grey;
        break;
      }
    }
    return replaceColors(this.illustration, colors);
  }

  private attachDefaultStyling() {
    if (this.querySelector(':scope > style')) {
      return;
    }
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      ${this.tagName.toLowerCase()} { display: block }
      ${this.tagName.toLowerCase()}[hidden] { display: none }
      ${this.tagName.toLowerCase()} > span { display: contents }
    `;
    this.appendChild(styleElement);
  }
}
