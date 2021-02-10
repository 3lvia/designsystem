import { Component, Input, OnInit } from '@angular/core';
import { ExampleCodeService } from '../../../example-code.service';

@Component({
  selector: 'app-ceg-filters',
  templateUrl: './ceg-filters.component.html',
  styleUrls: ['./ceg-filters.component.scss'],
})
export class CegFiltersComponent implements OnInit {
  @Input() componentData;
  @Input() chosenType;
  counterNumber: number;
  codeReact;
  codeWebComponent;
  props = [];
  isString = true;
  modifiers = [];

  emptyLineRegex = /^\s*[\r\n]/gm;

  constructor(private codeService: ExampleCodeService) {}

  ngOnInit(): void {
    this.codeReact = this.componentData.codeReact;
    this.codeWebComponent = this.componentData.codeWebComponent;
    this.initializeComponentProps();
  }

  initializeComponentProps(): void {
    Object.keys(this.componentData.attributes).forEach((attribute) => {
      Object.keys(this.componentData.attributes[attribute]).forEach((value) => {
        if (value === 'cegFormType') {
          const newObject = {
            attribute,
            ...this.componentData.attributes[attribute],
          };
          if (this.componentData.attributes[attribute].cegFormType === 'checkbox') {
            this.modifiers.push(newObject);
          } else {
            this.props.push(newObject);
          }
        }
      });
    });
    const modifiersObject = {
      cegFormType: 'checkbox',
      modifiers: this.modifiers,
    };
    this.props.push(modifiersObject);
  }

  getPropRegex(prop: string): RegExp {
    if (this.codeReact.includes(prop + '={')) {
      this.isString = false;
    } else {
      this.isString = true;
    }
    return new RegExp(prop + '=("|{).*', 'gi');
  }

  getNewLineRegex(elementName: string): RegExp {
    return new RegExp('<' + elementName, 'gi');
  }

  getReplaceValueString(prop: string, newValue: string, isReact: boolean): string {
    if (!this.isString && isReact) {
      return prop + '={' + newValue + '}';
    } else {
      return prop + '="' + newValue + '"';
    }
  }

  getNewPropStringW(prop: string, newValue: string): string {
    return '<' + this.componentData.elementNameW + '\n  ' + prop + '="' + newValue + '"';
  }

  getNewPropStringR(prop: string, newValue: string): string {
    if (this.isString) {
      return '<' + this.componentData.elementNameR + '\n  ' + prop + '="' + newValue + '"';
    } else {
      return '<' + this.componentData.elementNameR + '\n  ' + prop + '={' + newValue + '}';
    }
  }

  updateProps(): void {
    this.codeService.updateCodeReact(this.codeReact);
    this.codeService.updateCodeWebComponent(this.codeWebComponent);
  }

  updateRadioProp(prop: string, newValue: string): void {
    if (this.codeWebComponent.includes(prop)) {
      // Replaces old value for prop
      this.codeReact = this.codeReact.replace(
        this.getPropRegex(prop),
        this.getReplaceValueString(prop, newValue, true),
      );
      this.codeWebComponent = this.codeWebComponent.replace(
        this.getPropRegex(prop),
        this.getReplaceValueString(prop, newValue, false),
      );
    } else {
      // Adds new prop to code
      const newLineRegexW = this.getNewLineRegex(this.componentData.elementNameW);
      const newStringW = this.getNewPropStringW(prop, newValue);
      this.codeWebComponent = this.codeWebComponent.replace(newLineRegexW, newStringW);

      const newLineRegexR = this.getNewLineRegex(this.componentData.elementNameR);
      const newStringR = this.getNewPropStringR(prop, newValue);
      this.codeReact = this.codeReact.replace(newLineRegexR, newStringR);
    }
    this.updateProps();
  }

  updateToggleCheckboxProp(prop: string, newValue: string): void {
    if (this.codeWebComponent.includes(prop)) {
      // Removes old prop and line in code
      this.codeReact = this.codeReact.replace(this.getPropRegex(prop), '').replace(this.emptyLineRegex, '');
      this.codeWebComponent = this.codeWebComponent
        .replace(this.getPropRegex(prop), '')
        .replace(this.emptyLineRegex, '');
    } else {
      // Adds new prop in code
      const newLineRegexW = this.getNewLineRegex(this.componentData.elementNameW);
      const newStringW = this.getNewPropStringW(prop, newValue);
      this.codeWebComponent = this.codeWebComponent.replace(newLineRegexW, newStringW);

      const newLineRegexR = this.getNewLineRegex(this.componentData.elementNameR);
      const newStringR = this.getNewPropStringR(prop, newValue);
      this.codeReact = this.codeReact.replace(newLineRegexR, newStringR);
    }
    this.updateProps();
  }

  updateCounterProp(prop: string, cegCounterMax: number, cegDefault: number, newValue: number): void {
    if (
      this.counterNumber !== undefined &&
      (this.counterNumber + newValue > cegCounterMax || this.counterNumber + newValue < 0)
    ) {
      return;
    } else if (this.counterNumber === undefined) {
      this.counterNumber = cegDefault + newValue;
    } else {
      this.counterNumber += newValue;
    }

    if (this.codeWebComponent.includes(prop)) {
      // Replaces old value for prop
      this.codeReact = this.codeReact.replace(
        this.getPropRegex(prop),
        this.getReplaceValueString(prop, this.counterNumber.toString(), true),
      );
      this.codeWebComponent = this.codeWebComponent.replace(
        this.getPropRegex(prop),
        this.getReplaceValueString(prop, this.counterNumber.toString(), false),
      );
    }
    this.updateProps();
  }
}
