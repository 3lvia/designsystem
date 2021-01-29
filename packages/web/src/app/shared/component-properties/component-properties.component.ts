import { Component, OnInit, Input } from '@angular/core';
import * as data from '@elvia/elvis/.internal/classlist.json';

@Component({
  selector: 'app-component-properties',
  templateUrl: './component-properties.component.html',
  styleUrls: ['./component-properties.component.scss'],
})
export class ComponentPropertiesComponent implements OnInit {
  @Input() componentName: string;

  container;
  elements = [];
  modifiers = [];
  psuedos = [];
  allElementModifiers = [];

  ngOnInit(): void {
    this.makePropertyLists();
  }

  isCustom(componentName: string): boolean {
    return componentName.includes('custom');
  }

  makePropertyLists(): void {
    Object.keys(data.block).forEach((block) => {
      if (block === this.componentName) {
        this.getContainer();
        this.getAllElement();
        this.getAllModifiers();
        this.getAllPsuedo();
      }
    });
  }

  getContainer(): void {
    if (data.block[this.componentName].container) {
      Object.keys(data.block[this.componentName].container).forEach((el) => {
        this.container = el;
      });
    }
  }

  getAllElement(): void {
    if (data.block[this.componentName].element) {
      Object.keys(data.block[this.componentName].element).forEach((el) => {
        const elementModifiers = [];
        if (data.block[this.componentName].element[el].modifier) {
          Object.keys(data.block[this.componentName].element[el].modifier).forEach((el2) => {
            if (this.isCustom(el2)) {
              return;
            }
            this.allElementModifiers.push(el2);
          });
        }
        const el1 = { name: el, elementModifiers };
        this.elements.push(el1);
      });
    }
  }

  getAllModifiers(): void {
    if (data.block[this.componentName].modifier) {
      Object.keys(data.block[this.componentName].modifier).forEach((mod) => {
        if (this.isCustom(mod)) {
          return;
        }
        this.modifiers.push(mod);
      });
    }
  }

  getAllPsuedo(): void {
    if (data.block[this.componentName].psuedo) {
      Object.keys(data.block[this.componentName].psuedo).forEach((psu) => {
        if (this.isCustom(psu)) {
          return;
        }
        this.psuedos.push(psu);
      });
    }
  }
}
