import { OnInit, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Controls } from '../controlType';
import { isGroup } from '../helpers';

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
export class CodeGeneratorComponent implements OnInit {
  @Input() controls: BehaviorSubject<Controls>;
  @Input() elementName = '';
  initialProps: Prop[] = [];
  activeTabIndex = 0;
  tabs: Tab[] = ['Angular', 'React', 'Vue'];

  copyMessage = '';
  angularCode = '';
  reactCode = '';
  vueCode = '';

  ngOnInit() {
    this.initialProps = this.getFlatPropList(this.controls.value);
    this.controls.subscribe((content) => {
      const props = this.getFlatPropList(content);

      this.angularCode = this.createWebComponentCode(props, '[', ']');
      this.vueCode = this.createWebComponentCode(props, ':');
      this.reactCode = this.createReactCode(props);
    });
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

  private getFlatPropList(controls: Controls): Prop[] {
    const propList: Prop[] = [];

    for (let control of Object.keys(controls)) {
      const c = controls[control];

      if (isGroup(c)) {
        propList.push(...this.getFlatPropList(c.controls));
      } else {
        propList.push({ name: control, value: c.value });
      }
    }

    return propList;
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
