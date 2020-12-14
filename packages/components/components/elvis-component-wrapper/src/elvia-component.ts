import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as retargetEvents from 'react-shadow-dom-retarget-events'

export class ElvisComponentWrapper extends HTMLElement {

  protected _data: any;
  protected reactComponent: any;
  protected webComponent: any;
  protected cssStyle: string;
  protected role: string;
  private mountPoint!: HTMLSpanElement;

  constructor(webComponent: any, reactComponent: any, cssStyle: string, role: string) {
    super();
    this._data = {};
    this.webComponent = webComponent;
    this.reactComponent = reactComponent;
    this.cssStyle = cssStyle;
    this.role = role;
  }


  get data(): any {
    return this._data;
  }

  getProps(): any {
    return this._data;
  }

  connectedCallback(): void {
    this.attachStyle();
    this.renderReactDOM();
  }

  attributeChangedCallback(): void {
    this.renderReactDOM();
  }

  protected attachStyle(): void {
    this.setAttribute('role', this.role)
    this.mountPoint = document.createElement('span');
    const styleTag = document.createElement('style');
    styleTag.innerHTML = this.cssStyle;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.mountPoint);
    shadowRoot.appendChild(styleTag);
    retargetEvents(shadowRoot);
  }

  protected setProps(newProps: any, preventRerender?: boolean): void {
    Object.keys(newProps).forEach(key => {
      this._data[key] = newProps[key];
    });

    // Consider throttling to every 25-50ms and last event
    this.mountPoint.dispatchEvent(new CustomEvent('changed', {
      bubbles: false,
      composed: true,
      detail: this._data
    }));

    if (!preventRerender) {
      this.renderReactDOM();
    }

  }


  // Consider throttling to every 25-50ms and last event
  protected renderReactDOM(): void {
    this.mapAttributesToData();
    ReactDOM.render(this.createReactElement(this._data), this.mountPoint);
  }

  /**
  * Maps the attributes prefixed with "elvia-" to the data object unless data is set
  */
  private mapAttributesToData() {
    this.webComponent.observedAttributes.forEach((attr: any) => {
      const val = this.getAttribute(attr);
      if (!this._data[attr]) {
        this._data[attr] = val;
      }
    });
  }

  private createReactElement(data: any): React.ReactElement {
    const reactData = data;
    reactData.webcomponent = this;
    return React.createElement(this.reactComponent, reactData, React.createElement('slot'));
  }
}