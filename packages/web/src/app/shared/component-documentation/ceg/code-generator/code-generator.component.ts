import { OnInit, Component, Input, OnDestroy } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CegControlManager } from '../cegControlManager';
import { CegCustomText, Controls } from '../controlType';
import { FormatCodePipe } from './formatCode.pipe';
import { Language } from './language';

interface Prop {
  name: string;
  value: string | number | boolean;
}

type Tab = 'Angular' | 'React' | 'Vue';

@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.component.html',
  styleUrls: ['./code-generator.component.scss'],
})
export class CodeGeneratorComponent implements OnInit, OnDestroy {
  private unsubscriber = new Subject();
  @Input() controlManager: CegControlManager;
  @Input() elementName = '';
  @Input() componentSlots: Observable<string[]>;
  initialProps: Prop[] = [];
  activeTabIndex = 0;
  tabs: Tab[] = ['Angular', 'React', 'Vue'];

  copyMessage = '';
  angularCode = '';
  reactCode = '';
  vueCode = '';

  constructor(private codeFormater: FormatCodePipe) {}

  ngOnInit() {
    this.initialProps = this.getFlatPropList(
      this.controlManager.getControlSnapshot(),
      this.controlManager.getCustomTextSnapshot(),
    );

    combineLatest([
      this.controlManager.getCurrentControls(),
      this.controlManager.getCurrentCustomTexts(),
      this.componentSlots,
    ])
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(([controls, customTexts, slots]) => {
        const props = this.getFlatPropList(controls, customTexts);

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

  /**
   * Create a flat list of all props, both from the controls-object and the
   * customText object. We also include eventual children of checkbox-controls.
   */
  private getFlatPropList(controls: Controls, customText?: CegCustomText): Prop[] {
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

    const texts = customText
      ? Object.entries(customText).map(([propName, control]) => {
          return { name: propName, value: control.value } as Prop;
        })
      : [];

    return props.concat(...texts);
  }

  private propShouldBeIncluded(prop: Prop): boolean {
    const initialProp = this.initialProps.find((p) => p.name === prop.name);
    // All values that are not boolean are always shown.
    // If a boolean prop is undefined, we compare against 'false'
    const valueIsDifferentFromInitialValue =
      typeof prop.value !== 'boolean' || (initialProp.value || false) !== prop.value;

    return prop.value != null && valueIsDifferentFromInitialValue;
  }

  private getWebComponentSlots(slots: string[]): string {
    const sanitizedSlots = slots.map((slot) => slot.replace(/_ngcontent.{11}/g, '')).join('');

    return sanitizedSlots ? `\n${sanitizedSlots}\n` : '';
  }

  private getReactSlots(slots: string[]): string {
    const sanitizedSlots = slots
      .map((slot) => {
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
        const value = typeof prop.value === 'string' ? `'${prop.value}'` : prop.value;
        return `${attributePrefix}${prop.name}${attributePostfix}="${value}"`;
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
        const value = typeof prop.value === 'string' ? `'${prop.value}'` : prop.value;
        return `${prop.name}={${value}}`;
      })
      .join('')} ${this.getReactSlots(slots)}></${elementName}>`;
  }

  copyCode() {
    navigator.clipboard.writeText(this.codeFormater.transform(this.activeCode, this.language)).then(() => {
      this.copyMessage = 'Copied!';
      const copyTimeout = setTimeout(() => {
        this.copyMessage = '';
        clearTimeout(copyTimeout);
      }, 3000);
    });
  }
}
