import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnknownCegControlManager } from '../../cegControlManager';
import { Controls, StaticProps } from '../../controlType';

interface Prop {
  name: string;
  value: string | number | boolean;
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
  staticProps: Prop[] = [];
  angularCode = '';
  reactCode = '';
  vueCode = '';

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
      this.staticProps = staticPropsArray as Prop[];
      props.unshift(...(staticPropsArray as Prop[]));
    }
    if (type) {
      props.unshift({ name: 'type', value: type.toLowerCase() });
    }
    return props;
  }

  private propShouldBeIncluded(prop: Prop): boolean {
    const initialProp = this.initialProps.find((p) => p.name === prop.name);
    const staticProp = this.staticProps.find((p) => p.name === prop.name);

    // Static props that are truthy are included.
    // All values that are not boolean are always included.
    // If a boolean prop is undefined initially, we compare against 'false'
    const valueIsDifferentFromInitialValue =
      typeof prop.value !== 'boolean' || (initialProp.value || false) !== prop.value;

    return (
      !!staticProp?.value ||
      (prop.value != null && valueIsDifferentFromInitialValue && typeof prop.value !== 'function')
    );
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
      .map((slot) => {
        // Convert conventional slots to be a prop on the element.
        const parsedSlot = new DOMParser().parseFromString(slot, 'text/html');
        const slotContent = parsedSlot.querySelector('[slot]');
        const slotName = slotContent.getAttribute('slot');
        slotContent.removeAttribute('slot');
        return `${slotName}={<>${slotContent.outerHTML}</>}`;
      })
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
