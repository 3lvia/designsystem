import { OnInit, Component, Input, OnDestroy } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UnknownCegControlManager } from '../cegControlManager';
import { Controls, StaticProps } from '../controlType';
import { FormatCodePipe } from './formatCode.pipe';
import { Language } from './language';

interface Prop {
  name: string;
  value: string | number | boolean;
}

type Tab = 'Angular' | 'React' | 'Vue';

const LANGUAGE_STORAGE_KEY = 'preferredCegLanguage';

@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.component.html',
  styleUrls: ['./code-generator.component.scss'],
})
export class CodeGeneratorComponent implements OnInit, OnDestroy {
  private unsubscriber = new Subject();
  @Input() staticContent: string;
  @Input() controlManager: UnknownCegControlManager;
  @Input() elementName = '';
  @Input() componentSlots: Observable<string[]>;
  initialProps: Prop[] = [];
  activeTabIndex = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    ? localStorage.getItem(LANGUAGE_STORAGE_KEY)
    : 0;
  tabs: Tab[] = ['Angular', 'React', 'Vue'];

  copyMessage = '';
  angularCode = '';
  reactCode = '';
  vueCode = '';

  constructor(private codeFormatter: FormatCodePipe) {}

  ngOnInit() {
    if (this.staticContent) {
      this.angularCode = this.staticContent;
      this.vueCode = this.staticContent.slice().replace(/\[/g, ':').replace(/]/g, '');
      this.reactCode = this.createReactCodeFromStaticContent(this.staticContent);
    } else if (this.controlManager) {
      this.initialProps = this.getFlatPropList(
        this.controlManager.getControlSnapshot(),
        this.controlManager.getStaticPropsSnapshot(),
        this.controlManager.getCurrentComponentTypeNameSnapshot(),
      );

      combineLatest([
        this.controlManager.getCurrentControls(),
        this.componentSlots,
        this.controlManager.currentComponentTypeName,
        this.controlManager.getStaticProps(),
      ])
        .pipe(takeUntil(this.unsubscriber))
        .subscribe(([controls, slots, type, staticProps]) => {
          const props = this.getFlatPropList(controls, staticProps, type);

          this.angularCode = this.createWebComponentCode(props, slots, '[', ']');
          this.vueCode = this.createWebComponentCode(props, slots, ':');
          this.reactCode = this.createReactCode(props, slots);
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  get language(): Language {
    return this.activeTab === 'React' ? 'jsx' : 'html';
  }

  get activeTab() {
    return this.tabs[this.activeTabIndex];
  }

  get activeCode() {
    if (this.activeTab === 'Angular') {
      return this.angularCode;
    } else if (this.activeTab === 'React') {
      return this.reactCode;
    } else {
      return this.vueCode;
    }
  }

  setActiveTab(newIndex: number): void {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, newIndex.toString());
    this.activeTabIndex = newIndex;
  }

  /**
   * Create a flat list of all props, which is easier to iterate.
   * We also include eventual children of checkbox-controls.
   */
  private getFlatPropList(controls: Controls, staticProps: StaticProps<unknown>, type: string): Prop[] {
    const props = Object.entries(controls)
      .map(([controlName, control]) => {
        const props: Prop[] = [{ name: controlName, value: control.value }];
        if (control.type === 'checkbox' && control.children) {
          Object.entries(control.children).forEach(([childName, child]) => {
            props.push({ name: childName, value: child.value });
          });
        }
        return props;
      })
      .flat();

    if (staticProps) {
      const staticPropsArray = Object.entries(staticProps).map(([name, value]) => ({ name, value }));
      props.unshift(...(staticPropsArray as Prop[]));
    }
    if (type) {
      props.unshift({ name: 'type', value: type.toLowerCase() });
    }
    return props;
  }

  private propShouldBeIncluded(prop: Prop): boolean {
    const initialProp = this.initialProps.find((p) => p.name === prop.name);
    // All values that are not boolean are always included.
    // If a boolean prop is undefined initially, we compare against 'false'
    const valueIsDifferentFromInitialValue =
      typeof prop.value !== 'boolean' || (initialProp.value || false) !== prop.value;

    return prop.value != null && valueIsDifferentFromInitialValue && typeof prop.value !== 'function';
  }

  private getCleanSlot(slots: string[]): string[] {
    return slots
      .map((slot) => {
        if (slot.includes('e-icon')) {
          const parsedSlot = new DOMParser().parseFromString(slot, 'text/html');
          const iconElements = parsedSlot.querySelectorAll('i.e-icon');
          iconElements.forEach((icon) => {
            icon.removeAttribute('e-id');
            icon.childNodes.forEach((child) => icon.removeChild(child));
          });
          return parsedSlot.body.innerHTML;
        }
        return slot;
      })
      .map((slot) => slot.replace(/_ngcontent.{11}/g, ''))
      .map((slot) => slot.replace(/ng-reflect.*Object]"/g, ''));
  }

  private getWebComponentSlots(slots: string[]): string {
    const sanitizedSlots = this.getCleanSlot(slots).join('');
    return sanitizedSlots ? `\n${sanitizedSlots}\n` : '';
  }

  private getReactSlots(slots: string[]): string {
    const sanitizedSlots = this.getCleanSlot(slots)
      .map((slot) => slot.replace(/class=/g, 'className='))
      .map((slot) => {
        // Convert conventional slots to be a prop on the element.
        const parsedSlot = new DOMParser().parseFromString(slot, 'text/html');
        const slotContent = parsedSlot.querySelector('[slot]');
        const slotName = slotContent.getAttribute('slot');
        slotContent.removeAttribute('slot');
        return `${slotName}={<>${slotContent.outerHTML}</>}`;
      })
      .join('');

    return sanitizedSlots ? `${sanitizedSlots}\n` : '';
  }

  private createWebComponentCode(
    props: Prop[],
    slots: string[],
    attributePrefix = '',
    attributePostfix = '',
  ): string {
    const propsToInclude = props.filter((prop) => this.propShouldBeIncluded(prop));
    return `<elvia-${this.elementName} ${propsToInclude
      .map((prop) => {
        const propName = `${attributePrefix}${prop.name}${attributePostfix}`;
        switch (typeof prop.value) {
          case 'string':
            return `${propName}="'${prop.value}'" `;
          default:
            /** JSON.stringify gives us a string with double quotes for objects,
             * which we need to replace with single quotes for the web components. */
            return `${propName}="${JSON.stringify(prop.value).replace(/"/g, "'")}" `;
        }
      })
      .join('')}>${this.getWebComponentSlots(slots)}</elvia-${this.elementName}>`;
  }

  private transformAngularAttributeToReact(attribute: string): string {
    const keyValue = attribute.split('=');
    const key = keyValue[0].replace('[', '').replace(']', '');
    const value = keyValue[1].trim().replace(/"/g, '').replace('>', '');
    let output = `${key}={${value}}`;
    if (attribute.trim().endsWith('>')) {
      return `${output}>\n`;
    }
    return output;
  }

  private capitalize(s: string): string {
    return s.substring(0, 1).toUpperCase() + s.substring(1);
  }

  private convertSlotsIntoAttributes(code: string): string {
    const parsedCode = new DOMParser().parseFromString(code, 'text/html');
    parsedCode.querySelectorAll('[slot]').forEach((slotElement) => {
      const slotName = slotElement.getAttribute('slot');
      slotElement.removeAttribute('slot');
      /**
       * We add __ to identify the slots in the HTML so that we can remove the quotations
       * that is added by the DOMParer.
       **/
      slotElement.parentElement.setAttribute(slotName, `__{<>${slotElement.outerHTML}</>}__`);
      slotElement.parentElement.removeChild(slotElement);
    });
    // Remove quotes around curly braces and convert \&quot; to "
    return parsedCode.body.innerHTML
      .replace(/\&quot;/g, '"')
      .replace(/"__{/g, '{')
      .replace(/}__"/g, '}');
  }

  private createReactCodeFromStaticContent(angularCode: string): string {
    const out = this.convertSlotsIntoAttributes(angularCode)
      .replace(/class=/g, 'className=')
      .split(' ')
      .map((attribute) => {
        if (attribute.startsWith('[')) {
          return this.transformAngularAttributeToReact(attribute);
        } else if (attribute.startsWith('<elvia-') || attribute.startsWith('</elvia-')) {
          const bracket = attribute.startsWith('</') ? '</' : '<';
          const attributeParts = attribute.split('-');
          attributeParts.shift();
          return `${bracket}${attributeParts.map((part) => this.capitalize(part)).join('')}`;
        }
        return attribute;
      })
      .join(' ');

    return out;
  }

  private createReactCode(props: Prop[], slots: string[]): string {
    const propsToInclude = props.filter((prop) => this.propShouldBeIncluded(prop));
    const elementName = this.elementName
      .split('-')
      .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
      .join('');

    return `<${elementName} ${propsToInclude
      .map((prop) => {
        switch (typeof prop.value) {
          case 'string':
            return `${prop.name}={"${prop.value}"}`;
          default:
            return `${prop.name}={${JSON.stringify(prop.value)}}`;
        }
      })
      .join('')} ${this.getReactSlots(slots)}></${elementName}>`;
  }

  copyCode() {
    navigator.clipboard.writeText(this.codeFormatter.transform(this.activeCode, this.language)).then(() => {
      this.copyMessage = 'Copied!';
      const copyTimeout = setTimeout(() => {
        this.copyMessage = '';
        clearTimeout(copyTimeout);
      }, 3000);
    });
  }
}
