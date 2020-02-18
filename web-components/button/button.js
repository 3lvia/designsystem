import { LitElement, html, css } from 'lit-element';

class Button extends LitElement {
  static get properties() {
    return { myString: { type: Array } };
  }

  static get styles() {
    return css`
      button {
        color: white;
        padding:1rem;
        border:1px solid black;
        background-color:#2196F3;
        border-radius:4px;
        text-transform:uppercase;
      }
      `;
  }

  constructor() {
    super();
  }
  
  render() {
    return html`<button><slot></slot> ${this.myString[0]}</button>`;
  }
}

customElements.define('elvis-button', Button);
