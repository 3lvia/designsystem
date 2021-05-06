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
    if (this.webComponent.getComponentData().useWrapper) {
      this.mountPoint = document.createElement('span');
      this.appendChild(this.mountPoint);
    }
    this.renderReactDOM();
    this.attachStyle();
  }

  attributeChangedCallback(): void {
    this.throttleRenderReactDOM();
  }

  protected addConditionalStyle(): void {
    const conditionalElements = this.webComponent.getComponentData().conditionalElementStyle;
    const attributeElements = this.webComponent.getComponentData().attributes;
    this.style.cssText = this.webComponent.getComponentData().elementStyle;

    attributeElements.forEach((attribute: any) => {
      if (this.getProps()[attribute.toLowerCase()] === 'true' || this.getProps()[attribute.toLowerCase()] === true) {
        if (conditionalElements) {
          Object.keys(conditionalElements).forEach((obj) => {
            if (obj.toLowerCase() === attribute.toLowerCase()) {
              this.style.cssText += conditionalElements[obj];
            }
          });
        }
      }
    });
  }

  protected attachStyle(): void {
    this.addConditionalStyle();
    if (this.webComponent.getComponentData().wrapperStyle) {
      this.mountPoint.style.cssText = this.webComponent.getComponentData().wrapperStyle;
    }
    const styleTag = document.createElement('style');
    styleTag.innerHTML = this.cssStyle;
    this.appendChild(styleTag);
  }

  protected setProps(newProps: any, preventRerender?: boolean): void {
    Object.keys(newProps).forEach((key) => {
      if (!isEqual(this._data[key], newProps[key])) {
        this._data[key] = newProps[key];
        this.addConditionalStyle();
        this.changedEvent(key);
        this.changedEvent(this.mapNameToRealName(key));
      }
    });

    if (!preventRerender) {
      this.throttleRenderReactDOM();
    }
  }

  protected createReactData(): Record<string, any> {
    const reactData: { [key: string]: boolean } = {};
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
    if (!this.webComponent.getComponentData().useWrapper) {
      ReactDOM.render(this.createReactElement(this.createReactData()), this);
      return;
    }
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
