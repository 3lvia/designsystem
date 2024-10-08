import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import JSON5 from 'json5';
import isEqual from 'lodash.isequal';
import throttle from 'lodash.throttle';
import { FC, createElement } from 'react';
import { Root, createRoot } from 'react-dom/client';

let ewcReactRootIdentifierPrefix = 0;
export class ElvisComponentWrapper extends HTMLElement {
  public storeAllSlotsEvent = 'elvisStoreAllSlots' as const;
  protected _data: { [propName: string]: any };
  protected _slots: { [slotName: string]: Element };
  protected reactComponent: FC;
  protected webComponent: ElviaComponent;
  protected throttleRenderReactDOM;
  private mountPoint!: HTMLSpanElement;
  private reactRoot!: Root;

  constructor(webComponent: ElviaComponent, reactComponent: FC) {
    super();
    this._data = {};
    this._slots = {};
    this.webComponent = webComponent;
    this.reactComponent = reactComponent;
    this.throttleRenderReactDOM = throttle(this.renderReactDOM, 50, { trailing: true });
  }

  get data(): ElvisComponentWrapper['_data'] {
    return this._data;
  }

  getElementName(): string {
    return (
      'elvia' +
      this.webComponent
        .getComponentData()
        .name.replace(/([A-Z])/g, '-$1')
        .toLowerCase()
    );
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
    // Must be wrapped in a requestAnimationFrame to ensure that the children have been initialized
    // in case a component is used in Angular outside a router/ngIf/conditional rendering.
    window.requestAnimationFrame(() => {
      this.storeAllSlots();
    });
    this.storeAllSlots();
    const spanChildren = this.querySelectorAll('span');
    const hasWrapperElement =
      spanChildren[0] && spanChildren[0].getAttribute('name') === 'elvia-wrapper-element';
    if (!hasWrapperElement) {
      const wrapperElement = document.createElement('span');
      wrapperElement.setAttribute('name', 'elvia-wrapper-element');
      wrapperElement.style.cssText = 'display: contents;';
      this.mountPoint = wrapperElement;
      this.appendChild(this.mountPoint);
    }
    if (!this.reactRoot) {
      this.reactRoot = createRoot(this.mountPoint, {
        identifierPrefix: `ewc-${ewcReactRootIdentifierPrefix++}`,
      });
    }
    this.renderReactDOM();
    this.addDisplayStyleToCustomElement();
  }

  disconnectedCallback(): void {
    this.throttleRenderReactDOM.cancel();
    if (this.reactRoot) {
      this.reactRoot.render(null);
    }
  }

  attributeChangedCallback(): void {
    this.storeAllSlots();
    this.throttleRenderReactDOM();
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
  triggerEvent(callbackName: string, eventData?: any): void {
    this.onEvent(callbackName, eventData);
  }

  /**
   * Set prop values on webcomponent. Does **not** trigger an on-change event.
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
      if (!isEqual(this._data[key.toLowerCase()], newProps[key])) {
        this._data[key.toLowerCase()] = newProps[key];
      }
    });

    if (!preventRerender) {
      this.throttleRenderReactDOM();
    }
  }

  setSlots(slots: { [slotName: string]: Element }): void {
    this._slots = slots;
  }

  protected addDisplayStyleToCustomElement(): void {
    this.style.cssText = 'display: contents;';
  }

  protected createReactData(): { [key: string]: any } {
    const reactData: { [key: string]: any } = {};
    Object.keys(this._data).forEach((key) => {
      reactData[this.mapNameToRealName(key)] = this._data[key];
    });
    return reactData;
  }

  // Finds the real name of an attribute
  protected mapNameToRealName(attr: string): string {
    const attribute = this.webComponent.getComponentData().attributes.find((compAttr) => {
      return compAttr.name.toLowerCase() === attr.toLowerCase();
    });
    if (attribute) {
      return attribute.name;
    } else {
      this.logWarnMessage(
        'mapNameToRealName',
        "Did you forget to define the attribute '" + attr + "' in config.ts?",
      );
      return attr;
    }
  }

  protected renderReactDOM(): void {
    this.mapAttributesToData();
    if (this.reactRoot) {
      this.reactRoot.render(this.createEmotionCache(this.createReactElement(this.createReactData())));
    }
  }

  private logErrorMessage(functionName: string, error: string): void {
    console.error(
      '[' +
        this.getElementName() +
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
        this.getElementName() +
        '] elvia-component-wrapper: ' +
        "Failed at function '" +
        functionName +
        "'. " +
        warn,
    );
  }

  // Dispatches event
  private dispatchNewEvent(callbackName: string, eventData?: any) {
    this.dispatchEvent(
      new CustomEvent(callbackName, {
        bubbles: false,
        composed: true,
        detail: { value: eventData },
      }),
    );
  }

  /**
   * Trigger an event for both camelCase and kebab-case
   * @param callbackName Name of event in camelCase.
   * @param eventData Data to be sent with the event.
   */
  private onEvent(callbackName: string, eventData?: any) {
    // Kebab case events for Vue support
    const kebabCaseCallbackName = callbackName.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    this.dispatchNewEvent(callbackName, eventData);
    this.dispatchNewEvent(kebabCaseCallbackName, eventData);
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

    // In some rare situations, the wrapper stores a slot but the react component doesn't notice that the slot exists yet.
    // This event can then be used to manually re-trigger a "store slot"-action inside the component.
    this.dispatchEvent(
      new CustomEvent(this.storeAllSlotsEvent, {
        bubbles: false,
        composed: false,
      }),
    );
  }

  private convertString(stringToConvert: string, attrType: string, attrName: string) {
    if (attrType === 'string' || attrType.indexOf('|') !== -1) {
      return stringToConvert;
    }
    if (attrType === 'function') {
      return stringToConvert;
    }
    if (attrType === 'boolean') {
      return stringToConvert.toLowerCase() === 'true' || stringToConvert === '' ? true : false;
    }
    if (attrType === 'number') {
      return parseFloat(stringToConvert);
    }
    if (attrType === 'object') {
      try {
        return JSON5.parse(stringToConvert);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    this.webComponent.getComponentData().attributes.forEach((attr) => {
      const dataAttr = this._data[attr.name.toLowerCase()];
      const val = this.getAttribute(attr.name.toLowerCase());
      if (val !== null && (dataAttr === null || typeof dataAttr === 'undefined')) {
        this._data[attr.name.toLowerCase()] = this.convertString(val, attr.type, attr.name);
      } else if (attr.type !== 'string' && typeof dataAttr === 'string') {
        this._data[attr.name.toLowerCase()] = this.convertString(dataAttr, attr.type, attr.name);
      }
    });
  }

  private createReactElement(data: { [key: string]: any }): React.ReactElement {
    const reactData = data;
    reactData.webcomponent = this;
    return createElement(this.reactComponent, reactData, createElement('slot'));
  }

  private createEmotionCache(children: React.ReactElement): React.ReactElement {
    const cache = createCache({
      key: this.getElementName(),
      nonce: (globalThis.window as any).__webpack_nonce__ || (globalThis as any).__elvia_nonce__,
    });
    return createElement(CacheProvider, { value: cache }, children);
  }
}

/**
 * This is the class that is used to define a web component.
 * It comes from `elvia-component.template.js`, and one is built for each component.
 *
 * This is just a type declaration for use in this file.
 */
declare class ElviaComponent extends ElvisComponentWrapper {
  constructor();
  static get observedAttributes(): string[];
  /** Data from `config.ts`. */
  getComponentData(): {
    name: string;
    attributes: { name: string; type: string }[];
  };
}
