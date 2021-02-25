import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as isEqual from 'lodash.isequal';
import toolbox from '@elvia/elvis-toolbox';

export class ElvisComponentWrapper extends HTMLElement {
  protected _data: any;
  protected reactComponent: any;
  protected webComponent: any;
  protected cssStyle: string;
  protected throttleRenderReactDOM;
  private mountPoint!: HTMLSpanElement;

  constructor(webComponent: any, reactComponent: any, cssStyle: string) {
    super();
    this._data = {};
    this.webComponent = webComponent;
    this.reactComponent = reactComponent;
    this.cssStyle = cssStyle;
    this.throttleRenderReactDOM = toolbox.throttle(this.renderReactDOM, 50, { trailing: true });
  }

  get data(): any {
    return this._data;
  }

  getProps(): any {
    return this._data;
  }

  connectedCallback(): void {
    this.style.width = 'auto'
    this.style.display = 'inline-block';

    this.attachStyle();
    this.renderReactDOM();
  }

  attributeChangedCallback(): void {
    this.throttleRenderReactDOM();
  }

  protected attachStyle(): void {
    this.mountPoint = document.createElement('span');
    const styleTag = document.createElement('style');
    styleTag.innerHTML = this.cssStyle;
    this.appendChild(styleTag);
    this.appendChild(this.mountPoint);
  }

  protected setProps(newProps: any, preventRerender?: boolean): void {
    Object.keys(newProps).forEach((key) => {
      if (!isEqual(this._data[key], newProps[key])) {
        this._data[key] = newProps[key];
        this.changedEvent(key);
        this.changedEvent(this.mapNameToRealName(key));
      }
    });

    if (!preventRerender) {
      this.throttleRenderReactDOM();
    }
  }

  protected createReactData() {
    const reactData = {};
    Object.keys(this._data).forEach((key: string) => {
      reactData[this.mapNameToRealName(key)] = this._data[key];
    });
    return reactData;
  }

  // Finds the real name of an attribute
  protected mapNameToRealName(attr: string): string {
    return this.webComponent.getComponentData().attributes.find((compAttr: string) => {
      return compAttr.toLowerCase() === attr;
    });
  }

  protected renderReactDOM(): void {
    this.mapAttributesToData();
    if (this.mountPoint) {
      ReactDOM.render(this.createReactElement(this.createReactData()), this.mountPoint);
    }
  }

  private changedEvent(propName: string) {
    this.dispatchEvent(
      new CustomEvent(propName + 'OnChange', {
        bubbles: false,
        composed: true,
        detail: this._data,
      }),
    );
  }

  /**
   * Maps the attributes to the data object unless data is set
   */
  private mapAttributesToData() {
    this.webComponent.observedAttributes.forEach((attr: any) => {
      const val = this.getAttribute(attr);
      if (val !== null && (this._data[attr] === null || typeof this._data[attr] === 'undefined')) {
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
