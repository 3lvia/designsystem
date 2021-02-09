import { Component, Input, OnInit } from '@angular/core';
import { ExampleCodeService } from '../../../example-code.service';

@Component({
  selector: 'app-ceg-filters',
  templateUrl: './ceg-filters.component.html',
  styleUrls: ['./ceg-filters.component.scss'],
})
export class CegFiltersComponent implements OnInit {
  @Input() componentData;
  @Input() codeReact;
  @Input() codeWebComponent;
  props = [];

  emptyLineRegex = /^\s*[\r\n]/gm;

  constructor(private codeService: ExampleCodeService) {}

  ngOnInit(): void {
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
          this.props.push(newObject);
        }
      });
    });
  }

  getPropRegex(prop: string): RegExp {
    return new RegExp(prop + '=".*', 'gi');
  }

  getNewLineRegex(elementName: string): RegExp {
    return new RegExp('<' + elementName, 'gi');
  }

  getReplaceValueString(prop: string, newValue: string): string {
    return prop + '="' + newValue + '"';
  }

  getNewPropStringW(prop: string, newValue: string): string {
    return '<' + this.componentData.elementNameW + '\n  ' + prop + '="' + newValue + '"';
  }

  getNewPropStringR(prop: string, newValue: string): string {
    return '<' + this.componentData.elementNameR + '\n  ' + prop + '="' + newValue + '"';
  }

  updateRadioProp(prop: string, newValue: string): void {
    if (this.codeWebComponent.includes(prop)) {
      // Replaces old value for prop
      this.codeReact = this.codeReact.replace(
        this.getPropRegex(prop),
        this.getReplaceValueString(prop, newValue),
      );
      this.codeWebComponent = this.codeWebComponent.replace(
        this.getPropRegex(prop),
        this.getReplaceValueString(prop, newValue),
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
    this.codeService.updateCodeReact(this.codeReact);
    this.codeService.updateCodeWebComponent(this.codeWebComponent);
  }

  updateToggleProp(prop: string, newValue: string): void {
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
    this.codeService.updateCodeReact(this.codeReact);
    this.codeService.updateCodeWebComponent(this.codeWebComponent);
  }
}
