import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as isEqual from 'lodash.isequal';
import toolbox from '@elvia/elvis-toolbox';

export class ElvisComponentWrapper extends HTMLElement {
  protected _data: any;
  protected _slots: any;
  protected reactComponent: any;
  protected webComponent: any;
  protected cssStyle: string;
  protected throttleRenderReactDOM;
  private mountPoint!: HTMLSpanElement;

  constructor(webComponent: any, reactComponent: any, cssStyle: string) {
    super();
    this._data = {};
    this._slots = {};
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
    // Slot items
    if (this.webComponent.getComponentData().slotItems === true) {
      this.storeAllSlots();
    }
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
    const conditionalElementStyle = this.webComponent.getComponentData().conditionalElementStyle;
    const attributes = this.webComponent.getComponentData().attributes;
    this.style.cssText = this.webComponent.getComponentData().elementStyle;

    if (!conditionalElementStyle) {
      return;
    }
    attributes.forEach((attribute: any) => {
      if (
        this.getProps()[attribute.name.toLowerCase()] === 'true' ||
        this.getProps()[attribute.name.toLowerCase()] === true
      ) {
        Object.keys(conditionalElementStyle).forEach((obj) => {
          if (obj.toLowerCase() === attribute.name.toLowerCase()) {
            this.style.cssText += conditionalElementStyle[obj];
          }
        });
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
        if (key !== this.mapNameToRealName(key)) {
          this.changedEvent(key);
        }
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
    return this.webComponent.getComponentData().attributes.find((compAttr: any) => {
      return compAttr.name.toLowerCase() === attr;
    }).name;
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

  getSlot(str: string) {
    return this._slots[str];
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

  private storeAllSlots(): void {
    this.querySelectorAll('[slot]').forEach((element) => {
      const slotName = element.getAttribute('slot');
      if (!slotName) {
        return;
      }
      this._slots[slotName] = element;
      element.remove();
    });
  }

  private convertString(stringToConvert: string, attrType: string, attrName: string) {
    if (attrType === 'string' || attrType.indexOf('|') !== -1) {
      return stringToConvert;
    }
    if (attrType === 'boolean') {
      return stringToConvert.toLowerCase() === 'true' ? true : false;
    }
    if (attrType === 'number') {
      return parseFloat(stringToConvert);
    }
    if (attrType === 'object') {
      try {
        return JSON.parse(stringToConvert);
      } catch (error) {
        console.error(this.webComponent.getComponentData().name + ': The property "' + attrName + '" is not a valid JSON object. This is probably because the JSON object is containing single quotes instead of double quotes.')
      }
    }
    if (attrType === 'Date') {
      return new Date(stringToConvert);
    }
  }

  /**
   * Maps the attributes to the data object unless data is set
   */
  private mapAttributesToData() {
    this.webComponent.getComponentData().attributes.forEach((attr: any) => {
      const dataAttr = this._data[attr.name.toLowerCase()];
      const val = this.getAttribute(attr.name.toLowerCase());
      if (val !== null && (dataAttr === null || typeof dataAttr === 'undefined')) {
        this._data[attr.name.toLowerCase()] = this.convertString(val, attr.type, attr.name);
      }
    });
  }

  private createReactElement(data: any): React.ReactElement {
    const reactData = data;
    reactData.webcomponent = this;
    return React.createElement(this.reactComponent, reactData, React.createElement('slot'));
  }
}
