import { LitElement, css, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('elvia-button')
export class ElviaButton extends LitElement {
  static styles = css`
    :host {
      color: blue;
    }
  `;

  // Declare reactive properties
  @property()
  name?: string = 'World';

  render(): TemplateResult {
    return html`
      <button><slot></slot></button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'elvia-button': ElviaButton;
  }
}
