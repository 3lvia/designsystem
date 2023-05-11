import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnknownCegControlManager } from '../../cegControlManager';
import { Controls, StaticProps } from '../../controlType';

interface Prop {
  name: string;
  value: string | number | boolean;
  isStatic?: boolean;
}

@Component({
  selector: 'app-dynamic-code-generator',
  templateUrl: './dynamic-code-generator.component.html',
  styleUrls: ['./dynamic-code-generator.component.scss'],
})
export class DynamicCodeGeneratorComponent implements OnInit, OnDestroy {
  private unsubscriber = new Subject();
  @Input() controlManager: UnknownCegControlManager;
  @Input() elementName = '';
  @Input() componentSlots: Observable<string[]>;
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

        this.angularCode = this.createWebComponentCode(props, slots, '[', ']');
        this.vueCode = this.createWebComponentCode(props, slots, ':');
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
        if (control?.type === 'slotToggle') {
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
      props.unshift(...(staticPropsArray as Prop[]));
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
          if (slot.includes('e-icon') || slot.includes('<elvia-')) {
            const parsedSlot = new DOMParser().parseFromString(slot, 'text/html');

            this.cleanIconsInSlot(parsedSlot);
            this.cleanElviaComponentsInSlot(slot, parsedSlot);
            return parsedSlot.body.innerHTML;
          }
          return slot;
        })
        // Ensure that each slot falls on a new line.
        .map((slot) => slot.replace(/></g, '>\n<'))
        .map((slot) => slot.replace(/_ngcontent[\S]+/g, ''))
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

  private cleanElviaComponentsInSlot(slotString: string, parsedSlot: Document) {
    slotString.split('<').forEach((slotPart) => {
      if (slotPart.startsWith('elvia-')) {
        const elviaTag = slotPart.split(' ')[0];

        Array.from(parsedSlot.getElementsByTagName(elviaTag)).forEach((elviaElement) => {
          elviaElement.getAttributeNames().forEach((attribute) => elviaElement.removeAttribute(attribute));
          elviaElement.innerHTML = 'Content removed for simplicity...';
        });
      }
    });
  }

  private getWebComponentSlots(slots: string[]): string {
    const sanitizedSlots = this.getCleanSlot(slots).join('');
    return sanitizedSlots ? `\n${sanitizedSlots}\n` : '';
  }

  private transformTagsToReactStyle(code: string): string {
    return code.replace(/elvia(^|-)([a-z])/g, (_match, _prefix, letter) => letter.toUpperCase());
  }

  private getReactSlots(slots: string[]): string {
    const sanitizedSlots = this.getCleanSlot(slots)
      .map((slot) => {
        // Convert conventional slots to be a prop on the element.
        const parsedSlot = new DOMParser().parseFromString(slot, 'text/html');
        const slotContent = parsedSlot.querySelector('[slot]');
        const slotName = slotContent?.getAttribute('slot');
        slotContent?.removeAttribute('slot');
        return `${slotName}={<>${slotContent?.outerHTML}</>}`;
      })
      .map((slot) => this.transformTagsToReactStyle(slot))
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
            return `${prop.name}={"${prop.value}"}`;
          default:
            return `${prop.name}={${JSON.stringify(prop.value)}}`;
        }
      })
      .join('')} ${this.getReactSlots(slots)}></${elementName}>`;
  }
}
