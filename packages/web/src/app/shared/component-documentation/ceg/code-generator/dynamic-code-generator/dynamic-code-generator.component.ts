import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UnknownCegControlManager } from '../../cegControlManager';
import { Controls, StaticProps } from '../../controlType';
import { CodeGeneratorComponent } from '../code-generator.component';
import { transformAttributesBackToOriginalSyntaxAfterDomParser } from './slotAttributeTransforms';
import { FrameworkSpec, frameworks } from './supportedFrameworks';

interface Prop {
  name: string;
  value: string | number | boolean;
  isStatic?: boolean;
}

@Component({
    selector: 'app-dynamic-code-generator',
    templateUrl: './dynamic-code-generator.component.html',
    styleUrls: ['./dynamic-code-generator.component.scss'],
    imports: [CodeGeneratorComponent, AsyncPipe]
})
export class DynamicCodeGeneratorComponent implements OnInit, OnDestroy {
  private unsubscriber = new Subject<void>();
  @Input() controlManager: UnknownCegControlManager;
  @Input() elementName = '';
  @Input() componentSlots: Observable<string[]>;
  @Input() reactSlotReplacement?: Partial<Record<string, string>>;
  @Input() typeScriptCode: Observable<string> | undefined;
  initialProps: Prop[] = [];
  angularCode = '';
  reactCode = '';
  vueCode = '';

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.initialProps = this.getFlatPropList(
      this.controlManager.getControlSnapshot() ?? {},
      this.controlManager.getStaticPropsSnapshot() ?? {},
      this.controlManager.getCurrentComponentTypeNameSnapshot(),
    );

    combineLatest([
      this.controlManager.getCurrentControls(),
      this.componentSlots,
      this.controlManager.currentComponentTypeName,
      this.controlManager.getStaticProps(),
      this.controlManager.getDisabledControls(),
    ])
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(([controls, slots, type, staticProps, disabledControls]) => {
        const props = this.getFlatPropList(controls ?? {}, staticProps ?? {}, type).filter(
          (prop) => !disabledControls.includes(prop.name),
        );

        this.angularCode = this.createWebComponentCode(props, slots, frameworks.angular);
        this.vueCode = this.createWebComponentCode(props, slots, frameworks.vue);
        this.reactCode = this.createReactCode(props, slots);

        /**
         * For some reason, changes in slots in our web components does
         * not trigger a change detection cycle in Angular, thus e.g. changes
         * in applied CSS classes are "late" and gets rendered on the next tick.
         * We fix this by explicitly telling Angular to trigger change detection.
         */
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  /**
   * Create a flat list of all props, which is easier to iterate.
   * We also include eventual children of checkbox-controls.
   */
  private getFlatPropList(
    controls: Controls,
    staticProps: StaticProps<unknown>,
    type: string | undefined,
  ): Prop[] {
    const props = Object.entries(controls)
      .map(([controlName, control]) => {
        if (control?.type === 'slotToggle' || control?.excludedFromDOM) {
          return [];
        }

        return [{ name: controlName, value: control?.value }];
      })
      .flat();

    if (staticProps) {
      const staticPropsArray = Object.entries(staticProps).map(([name, value]) => ({
        name,
        value,
        isStatic: true,
      }));

      const eventProps = staticPropsArray.filter((prop) => typeof prop.value === 'function');

      const arrayProps = staticPropsArray
        .filter((prop) => Array.isArray(prop.value))
        .map((prop) => ({ ...prop, value: (prop.value as unknown[]).slice(0, 5) }));

      const otherProps = staticPropsArray.filter(
        (prop) => typeof prop.value !== 'function' && !Array.isArray(prop.value),
      );

      props.push(...(eventProps as Prop[]));
      props.push(...(arrayProps as unknown as Prop[]));
      props.unshift(...(otherProps as Prop[]));
    }
    if (type) {
      props.unshift({ name: 'type', value: type.toLowerCase() });
    }
    return props;
  }

  private propShouldBeIncluded(prop: Prop): boolean {
    if (prop.isStatic) {
      return true;
    }

    // All values that are not boolean are always included.
    // If a boolean prop is undefined initially, we compare against 'false'
    const initialProp = this.initialProps.find((p) => p.name === prop.name);
    const valueIsDifferentFromInitialValue =
      typeof prop.value !== 'boolean' || (initialProp?.value || false) !== prop.value;

    const valueIsNotFunction = typeof prop.value !== 'function';

    return prop.value != null && valueIsDifferentFromInitialValue && valueIsNotFunction;
  }

  private getCleanSlot(slots: string[]): string[] {
    return (
      slots
        .map((slot) => {
          let parsedSlot = slot;

          if (slot.includes('e-icon')) {
            const document = new DOMParser().parseFromString(slot, 'text/html');
            this.cleanIconsInSlot(document);
            parsedSlot = document.body.innerHTML;
          } else if (slot.includes('<elvia-')) {
            parsedSlot = this.cleanElviaComponentsInSlot(slot);
          }
          return transformAttributesBackToOriginalSyntaxAfterDomParser(parsedSlot);
        })
        // Ensure that each slot falls on a new line.
        .map((slot) => slot.replace(/></g, '>\n<'))
        .map((slot) => slot.replace(/_ngcontent-[^\s>]+/g, ''))
        .map((slot) => slot.replace(/ng-reflect.*Object]"/g, ''))
    );
  }

  private cleanIconsInSlot(parsedSlot: Document) {
    const iconElements = parsedSlot.querySelectorAll('i.e-icon');
    iconElements.forEach((icon) => {
      icon.removeAttribute('e-id');
      icon.childNodes.forEach((child) => icon.removeChild(child));
    });
  }

  private cleanElviaComponentsInSlot(slotString: string) {
    const elviaElement = /elvia-\S+/.exec(slotString)?.[0] ?? '';
    const slotName = /slot="(\w+)"/.exec(slotString)?.[1] ?? '';
    const rootElement = /<(\S+)/.exec(slotString)?.[1] ?? '';
    const isElviaIllustration = slotString.includes('elvia-illustrations');

    if (isElviaIllustration) {
      return slotString;
    }
    return `<${rootElement} slot="${slotName}">
  <${elviaElement}>Content removed for simplicity...</${elviaElement}>
</${rootElement}>`;
  }

  private getWebComponentSlots(slots: string[]): string {
    const sanitizedSlots = this.getCleanSlot(slots).join('');
    return sanitizedSlots ? `\n${sanitizedSlots}\n` : '';
  }

  private transformTagsToReactStyle(code: string): string {
    return code.replace(/elvia(^|-)([a-z])/g, (_match, _prefix, letter) => letter.toUpperCase());
  }

  private formatReactSlotReplacement(): string {
    return Object.entries(this.reactSlotReplacement || {})
      .map(([key, value]) => {
        return `${key}={${value}}`;
      })
      .join('\n');
  }

  private getReactSlots(slots: string[]): string {
    if (this.reactSlotReplacement) {
      return this.formatReactSlotReplacement();
    }

    const sanitizedSlots = this.getCleanSlot(slots)
      .map((slot) => {
        // Convert conventional slots to be a prop on the element.
        const parsedSlot = new DOMParser().parseFromString(slot, 'text/html');
        const slotContent = parsedSlot.querySelector('[slot]');
        const slotName = slotContent?.getAttribute('slot');
        slotContent?.removeAttribute('slot');
        return `${slotName}={<>${slotContent?.outerHTML
          .replace(/<e-icon/g, '<Icon')
          .replace(/<\/e-icon>/g, '</Icon>')}</>}`;
      })
      .map((slot) => this.transformTagsToReactStyle(slot))
      .map((slot) => slot.replace(/class=/g, 'className='))
      .join('');

    return sanitizedSlots ? `${transformAttributesBackToOriginalSyntaxAfterDomParser(sanitizedSlots)}\n` : '';
  }

  private createWebComponentCode(props: Prop[], slots: string[], frameworkSpec: FrameworkSpec): string {
    const propsToInclude = props.filter((prop) => this.propShouldBeIncluded(prop));
    return `<elvia-${this.elementName} ${propsToInclude
      .map((prop) => {
        const propName = `${frameworkSpec.attributePrefix}${prop.name}${frameworkSpec.attributePostfix}`;
        switch (typeof prop.value) {
          case 'string': {
            return `${propName}="'${prop.value}'" `;
          }
          case 'function': {
            const eventName = `${frameworkSpec.eventPrefix}${prop.name}${frameworkSpec.eventPostfix}`;
            const eventObj = frameworkSpec.castEventDataAsAny ? '$any($event)' : '$event';
            return `${eventName}="handleOnChange(${eventObj}.detail.value)"`;
          }
          default: {
            /** JSON.stringify gives us a string with double quotes for objects,
             * which we need to replace with single quotes for the web components. */
            return `${propName}="${JSON.stringify(prop.value).replace(/"/g, "'")}" `;
          }
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
            return `${prop.name}={"${prop.value}"}`;
          case 'function':
            return `${prop.name}={(event) => handleOnChange(event)}`;
          default:
            return `${prop.name}={${JSON.stringify(prop.value)}}`;
        }
      })
      .join('')} ${this.getReactSlots(slots)}></${elementName}>`;
  }
}
