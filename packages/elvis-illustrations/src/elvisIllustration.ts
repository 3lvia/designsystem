import { convertStringToIllustrationColor, type IllustrationColor } from './colors';

export class ElvisIllustration extends HTMLElement {
  static readonly observedAttributes = ['color'];
  private wrapper?: HTMLSpanElement;
  private _color: IllustrationColor = 'grey';

  constructor(illustration: string, css: string) {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    this.wrapper = document.createElement('span');
    this.wrapper.innerHTML = illustration;
    shadow.appendChild(this.wrapper);

    const styleElement = document.createElement('style');
    styleElement.textContent = css;
    shadow.appendChild(styleElement);

    this.updateClassList();
  }

  get color(): IllustrationColor {
    return this._color;
  }
  set color(newColor: string) {
    const convertedColor = convertStringToIllustrationColor(newColor);
    this._color = convertedColor;
    this.updateClassList();
  }

  connectedCallback() {
    this.updateClassList();
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'color') {
      this.color = convertStringToIllustrationColor(newValue);
    }
  }

  private updateClassList() {
    this.wrapper?.classList.remove('grey', 'purple', 'green', 'blue', 'orange');
    this.wrapper?.classList.add(this.color);
  }
}
