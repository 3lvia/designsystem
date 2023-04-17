import { Component, OnInit, Input } from '@angular/core';
import data from '@elvia/elvis/.internal/classlist.json';
import deprecated from '@elvia/elvis/.internal/deprecated-classes.json';

@Component({
  selector: 'app-component-properties',
  templateUrl: './component-properties.component.html',
  styleUrls: ['./component-properties.component.scss'],
})
export class ComponentPropertiesComponent implements OnInit {
  @Input() componentName: keyof typeof data.block;

  container: string;
  elements: { name: string; elementModifiers: string[] }[] = [];
  modifiers: string[] = [];
  pseudos: string[] = [];
  allElementModifiers: string[] = [];
  deprecatedClasses: string[] = [];

  ngOnInit(): void {
    this.makePropertyLists();
  }

  isCustom(componentName: string): boolean {
    return componentName.includes('custom');
  }

  isDeprecated(componentClass: string): boolean {
    return this.deprecatedClasses.includes(componentClass);
  }

  getDeprecatedClasses(): void {
    this.deprecatedClasses = Object.keys(deprecated);
  }

  makePropertyLists(): void {
    Object.keys(data.block).forEach((block) => {
      if (block === this.componentName) {
        this.getDeprecatedClasses();
        this.getContainer();
        this.getAllElements();
        this.getAllModifiers();
        this.getAllPsuedo();
      }
    });
  }

  getContainer(): void {
    const component = data.block[this.componentName];
    if ('container' in component) {
      Object.keys(component.container).forEach((el) => {
        this.container = el;
      });
    }
  }

  getAllElements(): void {
    const component = data.block[this.componentName];
    if ('element' in component) {
      const element = component.element;
      Object.keys(element).forEach((el) => {
        const elementModifiers: string[] = [];
        if ('modifier' in element[el as keyof typeof element]) {
          Object.keys((element[el as keyof typeof element] as any).modifier).forEach((el2) => {
            if (!this.isCustom(el2) && !this.isDeprecated(el2)) {
              this.allElementModifiers.push(el2);
            }
          });
        }
        const el1 = { name: el, elementModifiers };
        if (!this.isCustom(el1.name) && !this.isDeprecated(el1.name)) {
          this.elements.push(el1);
        }
      });
    }
  }

  getAllModifiers(): void {
    const component = data.block[this.componentName];
    if ('modifier' in component) {
      Object.keys(component.modifier).forEach((mod) => {
        if (!this.isCustom(mod) && !this.isDeprecated(mod)) {
          this.modifiers.push(mod);
        }
      });
    }
  }

  getAllPsuedo(): void {
    const component = data.block[this.componentName];
    if ('psuedo' in component) {
      Object.keys(component.psuedo).forEach((psu) => {
        if (!this.isCustom(psu) && !this.isDeprecated(psu)) {
          this.pseudos.push(psu);
        }
      });
    }
  }
}
