import { convertStringToIllustrationColor, type IllustrationColor } from './colors';

export class ElvisIllustration extends HTMLElement {
  static readonly observedAttributes = ['color'];
  private wrapper: HTMLSpanElement;
  private shadow?: ShadowRoot;
  private _color: IllustrationColor = 'grey';

  constructor(
    private illustration: string,
    private css: string,
  ) {
    super();
  }

  get color(): IllustrationColor {
    return this._color;
  }
  set color(newColor: string) {
    const convertedColor = convertStringToIllustrationColor(newColor);
    this._color = convertedColor;
    this.wrapper.classList.remove('grey', 'purple', 'green', 'blue', 'orange');
    this.wrapper.classList.add(convertedColor);
  }

  connectedCallback() {
    if (!this.shadow) {
      this.shadow = this.attachShadow({ mode: 'open' });
      this.wrapper = document.createElement('span');
      this.wrapper.innerHTML = this.illustration;
      this.shadow.appendChild(this.wrapper);
    }

    this.attachStyles();
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'color') {
      this.color = convertStringToIllustrationColor(newValue);
    }
  }

  private attachStyles() {
    if (!this.shadow || this.shadow?.querySelector(':host > style')) {
      return;
    }
    const styleElement = document.createElement('style');
    styleElement.textContent = this.css;
    this.shadow.appendChild(styleElement);
  }
}
