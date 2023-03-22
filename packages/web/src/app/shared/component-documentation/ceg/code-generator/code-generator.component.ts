import { OnInit, Component, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CegCustomText, ControlConfiguration, Controls } from '../controlType';

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
  @Input() configuration: BehaviorSubject<ControlConfiguration>;
  @Input() elementName = '';
  unsubscriber = new Subject();
  initialProps: Prop[] = [];
  activeTabIndex = 0;
  tabs: Tab[] = ['Angular', 'React', 'Vue'];

  copyMessage = '';
  angularCode = '';
  reactCode = '';
  vueCode = '';

  ngOnInit() {
    this.initialProps = this.getFlatPropList(
      this.configuration.value.controls,
      this.configuration.value.customText,
    );

    this.configuration.pipe(takeUntil(this.unsubscriber)).subscribe((configuration) => {
      const props = this.getFlatPropList(configuration.controls, configuration.customText);

      this.angularCode = this.createWebComponentCode(props, '[', ']');
      this.vueCode = this.createWebComponentCode(props, ':');
      this.reactCode = this.createReactCode(props);
    });
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  get activeCode() {
    if (this.tabs[this.activeTabIndex] === 'Angular') {
      return this.angularCode;
    } else if (this.tabs[this.activeTabIndex] === 'React') {
      return this.reactCode;
    } else {
      return this.vueCode;
    }
  }

  get reactElementName() {
    const cmpName = this.elementName;
    return cmpName
      .split('-')
      .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
      .join('');
  }

  /**
   * Create a flat list of all props, both from the controls-object and the
   * customText object. We also include eventual children of checkbox-controls.
   */
  private getFlatPropList(controls: Controls, customText: CegCustomText): Prop[] {
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

    const texts = Object.entries(customText).map(([propName, control]) => {
      return { name: propName, value: control.value } as Prop;
    });

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

  private createWebComponentCode(props: Prop[], attributePrefix = '', attributePostfix = ''): string {
    const propsToInclude = props.filter((prop) => this.propShouldBeIncluded(prop));

    if (propsToInclude.length === 0) {
      return `<elvia-${this.elementName}></elvia-${this.elementName}>`;
    }

    return `<elvia-${this.elementName}
${propsToInclude
  .map((prop) => {
    const value = typeof prop.value === 'string' ? `'${prop.value}'` : prop.value;
    return `  ${attributePrefix}${prop.name}${attributePostfix}="${value}"`;
  })
  .join('\n')}
></elvia-${this.elementName}>`;
  }

  private createReactCode(props: Prop[]): string {
    const propsToInclude = props.filter((prop) => this.propShouldBeIncluded(prop));

    if (propsToInclude.length === 0) {
      return `<${this.reactElementName}></${this.reactElementName}>`;
    }

    return `<${this.reactElementName}
${propsToInclude
  .map((prop) => {
    const value = typeof prop.value === 'string' ? `'${prop.value}'` : prop.value;
    return `  ${prop.name}={${value}}`;
  })
  .join('\n')}
></${this.reactElementName}>`;
  }

  copyCode() {
    navigator.clipboard.writeText(this.activeCode).then(() => {
      this.copyMessage = 'Copied!';
      const copyTimeout = setTimeout(() => {
        this.copyMessage = '';
        clearTimeout(copyTimeout);
      }, 3000);
    });
  }
}
