import { Component, Input, OnInit } from '@angular/core';
import { ExampleCodeService } from '../../../example-code.service';

@Component({
  selector: 'app-ceg-filters',
  templateUrl: './ceg-filters.component.html',
  styleUrls: ['./ceg-filters.component.scss'],
})
export class CegFiltersComponent implements OnInit {
  @Input() componentData;
  counterNumber: number;
  codeReact;
  codeWebComponent;
  props = [];
  modifiers = [];
  hasCheckboxes = false;
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
            this.hasCheckboxes = true;
            this.modifiers.push(newObject);
          } else {
            this.props.push(newObject);
          }
        }
      });
    });
    if (this.hasCheckboxes) {
      const modifiersObject = {
        cegFormType: 'checkbox',
        modifiers: this.modifiers,
      };
      this.props.push(modifiersObject);
    }
  }

  getPropRegex(prop: string): RegExp {
    return new RegExp(prop + '=("|{).*', 'gi');
  }

  getNewLineRegex(elementName: string): RegExp {
    return new RegExp('<' + elementName, 'gi');
  }

  getReplaceValueString(prop: string, newValue: string, isReact: boolean, type: string): string {
    if (type !== 'string' && isReact) {
      return prop + '={' + newValue + '}';
    } else {
      return prop + '="' + newValue + '"';
    }
  }

  getNewPropStringW(prop: string, newValue: string): string {
    return '<' + this.componentData.elementNameW + '\n  ' + prop + '="' + newValue + '"';
  }

  getNewPropStringR(prop: string, newValue: string, type: string): string {
    if (type === 'string') {
      return '<' + this.componentData.elementNameR + '\n  ' + prop + '="' + newValue + '"';
    } else {
      return '<' + this.componentData.elementNameR + '\n  ' + prop + '={' + newValue + '}';
    }
  }

  updateProps(): void {
    this.codeService.updateCodeReact(this.codeReact);
    this.codeService.updateCodeWebComponent(this.codeWebComponent);
  }

  updateRadioProp(prop: any, newValue: string): void {
    if (this.codeWebComponent.includes(prop.attribute)) {
      // Replaces old value for prop
      this.codeReact = this.codeReact.replace(
        this.getPropRegex(prop.attribute),
        this.getReplaceValueString(prop.attribute, newValue, true, prop.cegType),
      );
      this.codeWebComponent = this.codeWebComponent.replace(
        this.getPropRegex(prop.attribute),
        this.getReplaceValueString(prop.attribute, newValue, false, prop.cegType),
      );
    } else {
      // Adds new prop to code
      const newLineRegexW = this.getNewLineRegex(this.componentData.elementNameW);
      const newStringW = this.getNewPropStringW(prop.attribute, newValue);
      this.codeWebComponent = this.codeWebComponent.replace(newLineRegexW, newStringW);

      const newLineRegexR = this.getNewLineRegex(this.componentData.elementNameR);
      const newStringR = this.getNewPropStringR(prop.attribute, newValue, prop.cegType);
      this.codeReact = this.codeReact.replace(newLineRegexR, newStringR);
    }
    this.updateProps();
  }

  updateToggleCheckboxProp(prop: any): void {
    if (this.codeWebComponent.includes(prop.attribute)) {
      // Removes old prop and line in code
      this.codeReact = this.codeReact
        .replace(this.getPropRegex(prop.attribute), '')
        .replace(this.emptyLineRegex, '');
      this.codeWebComponent = this.codeWebComponent
        .replace(this.getPropRegex(prop.attribute), '')
        .replace(this.emptyLineRegex, '');
    } else {
      // Adds new prop in code
      const newLineRegexW = this.getNewLineRegex(this.componentData.elementNameW);
      const newStringW = this.getNewPropStringW(prop.attribute, prop.cegOption);
      this.codeWebComponent = this.codeWebComponent.replace(newLineRegexW, newStringW);

      const newLineRegexR = this.getNewLineRegex(this.componentData.elementNameR);
      const newStringR = this.getNewPropStringR(prop.attribute, prop.cegOption, prop.cegType);
      this.codeReact = this.codeReact.replace(newLineRegexR, newStringR);
    }
    this.updateProps();
  }

  isAcceptedCounterValue(prop: any, newValue: number): boolean {
    return (
      this.counterNumber !== undefined &&
      (this.counterNumber + newValue > prop.cegCounterMax ||
        this.counterNumber + newValue < prop.cegCounterMin)
    );
  }

  updateCounterProp(prop: any, newValue: number): void {
    if (this.isAcceptedCounterValue(prop, newValue)) {
      return;
    } else if (this.counterNumber === undefined) {
      this.counterNumber = prop.cegDefault + newValue;
    } else {
      this.counterNumber += newValue;
    }

    if (this.codeWebComponent.includes(prop.attribute)) {
      // Replaces old value for prop
      this.codeReact = this.codeReact.replace(
        this.getPropRegex(prop.attribute),
        this.getReplaceValueString(prop.attribute, this.counterNumber.toString(), true, prop.cegType),
      );
      this.codeWebComponent = this.codeWebComponent.replace(
        this.getPropRegex(prop.attribute),
        this.getReplaceValueString(prop.attribute, this.counterNumber.toString(), false, prop.cegType),
      );
    }
    this.updateProps();
  }
}
