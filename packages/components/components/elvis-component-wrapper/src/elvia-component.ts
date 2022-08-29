import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';
import isEqual from 'lodash.isequal';
import toolbox from '@elvia/elvis-toolbox';
import JSON5 from 'json5';

export class ElvisComponentWrapper extends HTMLElement {
  protected _data: { [propName: string]: any };
  protected _slots: { [slotName: string]: Element };
  protected reactComponent: any;
  protected webComponent: any;
  protected cssStyle: string;
  protected throttleRenderReactDOM;
  protected reactRoot: Root;
  private mountPoint!: HTMLSpanElement;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(webComponent: any, reactComponent: any, cssStyle: string) {
    super();
    this._data = {};
    this._slots = {};
    this.webComponent = webComponent;
    this.reactComponent = reactComponent;
    this.cssStyle = cssStyle;
    this.throttleRenderReactDOM = toolbox.throttle(this.renderReactDOM, 50, { trailing: true });
  }

  get data(): ElvisComponentWrapper['_data'] {
    return this._data;
  }

  getProp(propName: string): any {
    return this._data[propName.toLowerCase()];
  }

  getProps(): ElvisComponentWrapper['_data'] {
    return this._data;
  }

  /**
   * Get the value of a slot of the webcomponent.
   * @param slotName Name of slot.
   * @returns Value of slot.
   */
  getSlot(slotName: string): ElvisComponentWrapper['_slots'][0] {
    return this._slots[slotName];
  }

  /**
   * Get all slots of the webcomponent.
   * @returns An object containing all the slots of the webcomponent.
   */
  getAllSlots(): ElvisComponentWrapper['_slots'] {
    return this._slots;
  }

  connectedCallback(): void {
    // Slot items
    if (this.webComponent.getComponentData().slotItems === true) {
      this.storeAllSlots();
    }
    const spanChildren = this.querySelectorAll('span');
    const hasWrapperElement =
      spanChildren[0] && spanChildren[0].getAttribute('name') === 'elvia-wrapper-element';
    if (this.webComponent.getComponentData().useWrapper && !hasWrapperElement) {
      const wrapperElement = document.createElement('span');
      wrapperElement.setAttribute('name', 'elvia-wrapper-element');
      this.mountPoint = wrapperElement;
      this.appendChild(this.mountPoint);
    }
    this.renderReactDOM();
    if (this.querySelectorAll('style').length === 0) {
      this.attachStyle();
    }
  }

  attributeChangedCallback(): void {
    // Slot items
    if (this.webComponent.getComponentData().slotItems === true) {
      this.storeAllSlots();
    }
    this.throttleRenderReactDOM();
  }

  /**
   * Set prop values on webcomponent and dispatch onChange-event for each updated prop.
   *
   * @param newProps Object containing props to update.
   * @param preventRerender Set to true to avoid rerendering webcomponent.
   *
   * @example
   * webcomponent.setProps({propName: newValue}, true);
   * webcomponent.setProps({value: {id: myId, state: currentState}}, true);
   */
  setProps(newProps: { [propName: string]: any }, preventRerender?: boolean): void {
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

  /**
   * Trigger an event on webcomponent, optionally with a value.
   * @param callbackName Name of event.
   * @param eventData A value of any type to be sent with the event.
   *
   * @example
   * webcomponent.triggerEvent('onOpen');
   * webcomponent.triggerEvent('onDelete', deletedValue);
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  triggerEvent(callbackName: string, eventData?: any): void {
    this.onEvent(callbackName, eventData);
  }

  protected addConditionalStyle(): void {
    const conditionalElementStyle = this.webComponent.getComponentData().conditionalElementStyle;
    const attributes = this.webComponent.getComponentData().attributes;
    this.style.cssText = this.webComponent.getComponentData().elementStyle;
    if (!conditionalElementStyle) {
      return;
    }
    if (conditionalElementStyle.constructor.name === 'Array') {
      conditionalElementStyle.forEach((el: any) => {
        const propValue = this.getProps()[el.name.toLowerCase()];
        if (propValue === el.value || (propValue && propValue.toString() === el.value)) {
          this.style.cssText += el.style;
        }
      });
    } else {
      attributes.forEach((attribute: any) => {
        if (
          this.getProps()[attribute.name.toLowerCase()] === 'true' ||
          this.getProps()[attribute.name.toLowerCase()] === true
        ) {
          for (const obj in conditionalElementStyle) {
            if (obj.toLowerCase() === attribute.name.toLowerCase()) {
              this.style.cssText += conditionalElementStyle[obj];
            }
          }
        }
      });
    }
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

  protected createReactRoot(): void {
    if (!this.reactRoot) {
      if (!this.webComponent.getComponentData().useWrapper) {
        this.reactRoot = createRoot(this);
        return;
      }
      if (this.mountPoint) {
        this.reactRoot = createRoot(this.mountPoint);
      }
    }
  }

  protected renderReactDOM(): void {
    this.mapAttributesToData();
    this.createReactRoot();
    if (this.reactRoot) {
      this.reactRoot.render(this.createReactElement(this.createReactData()));
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

  // Dispatches event
  private dispatchNewEvent(callbackName: string, eventData?: any, isProp?: boolean) {
    const data = isProp ? this._data[eventData.toLowerCase()] : eventData;
    this.dispatchEvent(
      new CustomEvent(callbackName, {
        bubbles: false,
        composed: true,
        detail: { value: data },
      }),
    );
  }

  // Any type of event
  private onEvent(callbackName: string, data?: any) {
    // Kebab case events for Vue support
    const kebabCaseCallbackName = callbackName.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    this.dispatchNewEvent(callbackName, data, false);
    this.dispatchNewEvent(kebabCaseCallbackName, data, false);
  }

  // 'OnChange' events
  private onChangeEvent(propName: string) {
    if (this._data[propName.toLowerCase()] === undefined) {
      this.logWarnMessage(
        'onChangeEvent',
        ': Cannot dispatch OnChange event because no data was found with prop-name: ' + propName + '.',
      );
      return;
    }
    const callbackName = propName + 'OnChange';
    // Kebab case events for Vue support
    const kebabCaseCallbackName = callbackName.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    this.dispatchNewEvent(callbackName, propName, true);
    this.dispatchNewEvent(kebabCaseCallbackName, propName, true);
  }

  private storeAllSlots(): void {
    this.querySelectorAll('[slot]').forEach((element) => {
      const slotName = element.getAttribute('slot');
      if (!slotName || element.parentElement !== this) {
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
    if (attrType === 'function') {
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
        return JSON5.parse(stringToConvert);
      } catch (error) {
        this.logErrorMessage(
          'convertString',
          ': The property "' +
            attrName +
            '" is not a valid JSON/JSON5 object, and could not be parsed. The parser used is JSON5.',
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
