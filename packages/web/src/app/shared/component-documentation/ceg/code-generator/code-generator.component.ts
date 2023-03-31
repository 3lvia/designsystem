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

  private getWebComponentSlots(slots: string[]): string {
    const sanitizedSlots = slots.map((slot) => slot.replace(/_ngcontent.{11}/g, '')).join('');

    return sanitizedSlots ? `\n${sanitizedSlots}\n` : '';
  }

  private getReactSlots(slots: string[]): string {
    const sanitizedSlots = slots
      .map((slot) => {
        // Convert conventional slots to be a prop on the element.
        const parsedSlot = new DOMParser().parseFromString(slot, 'text/html');
        const slotContent = parsedSlot.querySelector('[slot]').innerHTML;
        const slotName = parsedSlot.querySelector('[slot]').getAttribute('slot');
        return `${slotName}={<>${slotContent}</>}`;
      })
      .map((slot) => slot.replace(/_ngcontent.{11}/g, ''))
      .map((slot) => slot.replace(/class=/g, 'className='))
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
            return `${prop.name}={'${prop.value}'}`;
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
