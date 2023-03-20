import { OnInit, Component, Input } from '@angular/core';

import { ComponentExample } from '../componentExample';
import { CegControl, CegControlGroup, Controls } from '../controlType';

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
  @Input() cegContent: ComponentExample;
  activeTabIndex = 0;
  tabs: Tab[] = ['Angular', 'React', 'Vue'];

  copyMessage = '';
  angularCode = '';
  reactCode = '';
  vueCode = '';

  ngOnInit() {
    this.cegContent.controls.subscribe((content) => {
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

  private getFlatPropList(controls: Controls): Prop[] {
    const propList: Prop[] = [];

    for (let control of Object.keys(controls)) {
      const c = controls[control];

      if (this.isGroup(c)) {
        propList.push(...this.getFlatPropList(c.controls));
      } else {
        propList.push({ name: control, value: c.value });
      }
    }

    return propList;
  }

  private isGroup(control: CegControlGroup | CegControl): control is CegControlGroup {
    return 'title' in control;
  }

  private createWebComponentCode(props: Prop[], attributePrefix = '', attributePostfix = ''): string {
    return `<elvia-${this.cegContent.elementName}
  ${props
    .filter((prop) => prop.value != null)
    .map((prop) => {
      const value = typeof prop.value === 'string' ? `'${prop.value}'` : prop.value;
      return `${attributePrefix}${prop.name}${attributePostfix}="${value}"`;
    })
    .map((prop, index) => (index === 0 ? prop : `  ${prop}`))
    .join('\n')}
></elvia-${this.cegContent.elementName}>`;
  }

  private createReactCode(props: Prop[]): string {
    const cmpName = this.cegContent.elementName;
    const reactName = cmpName
      .split('-')
      .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
      .join('');

    return `<${reactName}
  ${props
    .filter((prop) => prop.value != null)
    .map((prop) => {
      const value = typeof prop.value === 'string' ? `'${prop.value}'` : prop.value;
      return `${prop.name}={${value}}`;
    })
    .map((prop, index) => (index === 0 ? prop : `  ${prop}`))
    .join('\n')}
></${reactName}>`;
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
