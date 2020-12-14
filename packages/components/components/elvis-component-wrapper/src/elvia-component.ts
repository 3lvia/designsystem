import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as retargetEvents from 'react-shadow-dom-retarget-events'
import * as throttle from 'lodash.throttle';

export class ElvisComponentWrapper extends HTMLElement {

  protected _data: any;
  protected reactComponent: any;
  protected webComponent: any;
  protected cssStyle: string;
  protected role: string;
  protected throttleRenderReactDOM;
  protected throttleChangedEvent;
  private mountPoint!: HTMLSpanElement;

  constructor(webComponent: any, reactComponent: any, cssStyle: string, role: string) {
    super();
    this._data = {};
    this.webComponent = webComponent;
    this.reactComponent = reactComponent;
    this.cssStyle = cssStyle;
    this.role = role;
    this.throttleRenderReactDOM = throttle(this.renderReactDOM, 50, { 'trailing': true });
    this.throttleChangedEvent = throttle(() => {
      this.mountPoint.dispatchEvent(new CustomEvent('changed', {
        bubbles: false,
        composed: true,
        detail: this._data
      }));
    }, 50, { 'trailing': true });
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
    this.throttleRenderReactDOM();
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

    this.throttleChangedEvent();

    if (!preventRerender) {
      this.throttleRenderReactDOM();
    }
  }

  protected createReactData() {
    const reactData = {}
    Object.keys(this._data).forEach((key: string) => {
      reactData[this.mapNameToLowercaseName(key)] = this._data[key];
    });
    return reactData;
  }

  // Finds the real name of an attribute
  protected mapNameToLowercaseName(attr: string): string {
    return this.webComponent.getComponentData().attributes.find((compAttr: string) => {
      return compAttr.toLowerCase() === attr
    })
  }

  protected renderReactDOM(): void {
    this.mapAttributesToData();
    ReactDOM.render(this.createReactElement(this.createReactData()), this.mountPoint);
  }

  /**
  * Maps the attributes to the data object unless data is set
  */
  private mapAttributesToData() {
    this.webComponent.observedAttributes.forEach((attr: any) => {
      const val = this.getAttribute(attr);
      if (this._data[attr] === null) {
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