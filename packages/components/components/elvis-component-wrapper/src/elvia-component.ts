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

  getSlot(str: string): any {
    return this._slots[str];
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
    // Slot items
    if (this.webComponent.getComponentData().slotItems === true) {
      this.storeAllSlots();
    }
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
        this._data[key.toLowerCase()] = newProps[key];
        this.addConditionalStyle();
        this.onChangeEvent(this.mapNameToRealName(key));
      }
    });

    if (!preventRerender) {
      this.throttleRenderReactDOM();
    }
  }

  protected triggerEvent(callbackName: string, newProps?: any): void {
    if (newProps) {
      Object.keys(newProps).forEach((key) => {
        this.onEvent(callbackName, key);
      });
    } else {
      this.onEvent(callbackName);
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
    try {
      return this.webComponent.getComponentData().attributes.find((compAttr: any) => {
        return compAttr.name.toLowerCase() === attr.toLowerCase();
      }).name;
    } catch {
      this.logWarnMessage(
        'mapNameToRealName',
        "Did you forget to define the attribute '" + attr + "' in elvia-components.config.js?",
      );
      return attr;
    }
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

  private logErrorMessage(functionName: string, error: string): void {
    console.error(
      '[' +
      this.webComponent.getComponentData().name +
      '] elvia-component-wrapper: ' +
      "Failed at function '" +
      functionName +
      "'. " +
      error,
    );
  }

  private logWarnMessage(functionName: string, warn: string): void {
    console.warn(
      '[' +
      this.webComponent.getComponentData().name +
      '] elvia-component-wrapper: ' +
      "Failed at function '" +
      functionName +
      "'. " +
      warn,
    );
  }

  // Dispatches event for any type of event
  private onEvent(callbackName: string, propName?: string) {
    this.dispatchEvent(
      new CustomEvent(callbackName, {
        bubbles: false,
        composed: true,
        detail: { value: propName ? this._data[propName.toLowerCase()] : null },
      }),
    );
  }

  // Dispatches event and data for 'OnChange' events
  private onChangeEvent(propName: string) {
    if (this._data[propName.toLowerCase()] === null || this._data[propName.toLowerCase()] === undefined) {
      this.logWarnMessage(
        'onChangeEvent',
        ': Cannot dispatch OnChange event because no data was found with prop-name: ' + propName + '.',
      );
      return;
    }
    this.dispatchEvent(
      new CustomEvent(propName + 'OnChange', {
        bubbles: false,
        composed: true,
        detail: { value: this._data[propName.toLowerCase()] },
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
        this.logErrorMessage(
          'convertString',
          ': The property "' +
          attrName +
          '" is not a valid JSON object. This is probably because the JSON object is containing single quotes instead of double quotes.',
        );
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
      } else if (attr.type !== 'string' && typeof dataAttr === 'string') {
        this._data[attr.name.toLowerCase()] = this.convertString(dataAttr, attr.type, attr.name);
      }
    });
  }

  private createReactElement(data: any): React.ReactElement {
    const reactData = data;
    reactData.webcomponent = this;
    return React.createElement(this.reactComponent, reactData, React.createElement('slot'));
  }
}
