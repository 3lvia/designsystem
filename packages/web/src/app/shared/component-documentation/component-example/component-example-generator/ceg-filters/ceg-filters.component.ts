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

  constructor(private codeService: ExampleCodeService) {}

  ngOnInit(): void {
    this.getComponentVariables();
  }

  getComponentVariables(): void {
    Object.keys(this.componentData.attributes).forEach((attribute) => {
      Object.keys(this.componentData.attributes[attribute]).forEach((value) => {
        if (value === 'formType') {
          const newObject = {
            attribute,
            ...this.componentData.attributes[attribute],
          };
          this.props.push(newObject);
        }
      });
    });
  }

  updateRadioProp(prop: string, label: string): void {
    if (this.codeWebComponent.includes(prop)) {
      // Replaces old prop in code
      const customRegex = new RegExp(prop + '=".*?"', 'gi');
      this.codeReact = this.codeReact.replace(customRegex, prop + '="' + label + '"');
      this.codeWebComponent = this.codeWebComponent.replace(customRegex, prop + '="' + label + '"');
      this.codeService.updateCodeReact(this.codeReact);
      this.codeService.updateCodeWebComponent(this.codeWebComponent);
    } else {
      // Adds new prop to code
      const customRegexW = new RegExp('<' + this.componentData.elementNameW, 'gi');
      const newStringW = '<' + this.componentData.elementNameW + '\n  ' + prop + '="' + label + '"';
      const customRegexR = new RegExp('<' + this.componentData.elementNameR, 'gi');
      const newStringR = '<' + this.componentData.elementNameR + '\n  ' + prop + '="' + label + '"';
      this.codeWebComponent = this.codeWebComponent.replace(customRegexW, newStringW);
      this.codeReact = this.codeReact.replace(customRegexR, newStringR);
      this.codeService.updateCodeReact(this.codeReact);
      this.codeService.updateCodeWebComponent(this.codeWebComponent);
    }
  }

  updateToggleProp(prop: string, label: string): void {
    if (this.codeWebComponent.includes(prop)) {
      // Removes old prop and line in code
      this.codeReact = this.codeReact
        .replace(new RegExp(prop + '=".*', 'gi'), '')
        .replace(/^\s*[\r\n]/gm, '');
      this.codeWebComponent = this.codeWebComponent
        .replace(new RegExp(prop + '=".*', 'gi'), '')
        .replace(/^\s*[\r\n]/gm, '');
      this.codeService.updateCodeReact(this.codeReact);
      this.codeService.updateCodeWebComponent(this.codeWebComponent);
    } else {
      // Adds new prop in code
      const customRegexW = new RegExp('<' + this.componentData.elementNameW, 'gi');
      const newStringW = '<' + this.componentData.elementNameW + '\n  ' + prop + '="' + label + '"';
      const customRegexR = new RegExp('<' + this.componentData.elementNameR, 'gi');
      const newStringR = '<' + this.componentData.elementNameR + '\n  ' + prop + '="' + label + '"';
      this.codeWebComponent = this.codeWebComponent.replace(customRegexW, newStringW);
      this.codeReact = this.codeReact.replace(customRegexR, newStringR);
      this.codeService.updateCodeReact(this.codeReact);
      this.codeService.updateCodeWebComponent(this.codeWebComponent);
    }
  }
}
