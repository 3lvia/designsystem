import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExampleCodeService } from '../../../example-code.service';

@Component({
  selector: 'app-ceg-filters',
  templateUrl: './ceg-filters.component.html',
  styleUrls: ['./ceg-filters.component.scss'],
})
export class CegFiltersComponent implements OnInit {
  @Input() componentData;
  @Input() props;
  @Input() selectedType;
  codeWebComponentSub: Subscription;
  codeReactSub: Subscription;
  counterNumber: number;
  codeReact;
  codeWebComponent;
  checkboxesLength = 0;
  checkboxes = [];
  checkboxGroups = [];
  hasCheckboxes = false;
  emptyLineRegex = /^\s*[\r\n]/gm;
  objectKeys = Object.keys;

  constructor(private cegService: ExampleCodeService) {}

  ngOnInit(): void {
    this.codeReact = this.componentData.codeReact;
    this.codeWebComponent = this.componentData.codeWebComponent;
    this.codeWebComponentSub = this.cegService.listenCodeWebComponent().subscribe((code: string) => {
      this.codeWebComponent = code;
    });
    this.codeReactSub = this.cegService.listenCodeReact().subscribe((code: string) => {
      this.codeReact = code;
    });
    this.initializeComponentProps();
  }

  ngOnDestroy(): void {
    this.codeWebComponentSub.unsubscribe();
    this.codeReactSub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedType) {
      this.selectedType = changes.selectedType.currentValue;
    }
    if (changes.props) {
      this.props = changes.props.currentValue;
    }
  }

  initializeComponentProps(): void {
    Object.keys(this.componentData.attributes).forEach((attribute) => {
      Object.keys(this.componentData.attributes[attribute]).forEach((value) => {
        if (value === 'cegFormType' && this.componentData.attributes[attribute].cegFormType === 'checkbox') {
          const newObject = {
            attribute,
            ...this.componentData.attributes[attribute],
          };
          this.hasCheckboxes = true;
          this.checkboxes.push(newObject);
        }
      });
    });
    if (this.hasCheckboxes) {
      this.checkboxGroups = this.sortCheckboxArrays(this.checkboxes);
      this.checkboxesLength = Object.keys(this.checkboxGroups).length;
    }
  }

  sortCheckboxArrays(checkboxGroups: any): [] {
    const checkboxArrays = checkboxGroups.reduce((obj, value) => {
      const key = `${value.cegDisplayGroup}`;
      if (obj[key] == null) {
        obj[key] = [];
      }
      obj[key].push(value);
      return obj;
    }, {});
    return checkboxArrays;
  }

  updateProps(): void {
    this.cegService.updateCodeReact(this.codeReact);
    this.cegService.updateCodeWebComponent(this.codeWebComponent);
  }

  updateRadioProp(prop: any, newValue: string): void {
    if (this.codeWebComponent.includes(prop.attribute)) {
      // Replaces old value for prop
      this.codeReact = this.codeReact.replace(
        this.cegService.getPropRegex(prop.attribute),
        this.cegService.getReplaceValueString(prop.attribute, newValue, true, prop.cegType),
      );
      this.codeWebComponent = this.codeWebComponent.replace(
        this.cegService.getPropRegex(prop.attribute),
        this.cegService.getReplaceValueString(prop.attribute, newValue, false, prop.cegType),
      );
    } else {
      // Adds new prop to code
      const newLineRegexW = this.cegService.getNewLineRegex(this.componentData.elementNameW);
      const newStringW = this.cegService.getNewPropStringW(
        this.componentData.elementNameW,
        prop.attribute,
        newValue,
      );
      this.codeWebComponent = this.codeWebComponent.replace(newLineRegexW, newStringW);

      const newLineRegexR = this.cegService.getNewLineRegex(this.componentData.elementNameR);
      const newStringR = this.cegService.getNewPropStringR(
        this.componentData.elementNameR,
        prop.attribute,
        newValue,
        prop.cegType,
      );
      this.codeReact = this.codeReact.replace(newLineRegexR, newStringR);
    }
    this.updateProps();
  }

  updateToggleCheckboxProp(prop: any): void {
    if (this.codeWebComponent.includes(prop.attribute)) {
      // Removes old prop and line in code
      this.codeReact = this.codeReact
        .replace(this.cegService.getPropRegex(prop.attribute), '')
        .replace(this.emptyLineRegex, '');
      this.codeWebComponent = this.codeWebComponent
        .replace(this.cegService.getPropRegex(prop.attribute), '')
        .replace(this.emptyLineRegex, '');
    } else {
      // Adds new prop in code
      const newLineRegexW = this.cegService.getNewLineRegex(this.componentData.elementNameW);
      const newStringW = this.cegService.getNewPropStringW(
        this.componentData.elementNameW,
        prop.attribute,
        prop.cegOption,
      );
      this.codeWebComponent = this.codeWebComponent.replace(newLineRegexW, newStringW);

      const newLineRegexR = this.cegService.getNewLineRegex(this.componentData.elementNameR);
      const newStringR = this.cegService.getNewPropStringR(
        this.componentData.elementNameR,
        prop.attribute,
        prop.cegOption,
        prop.cegType,
      );
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
        this.cegService.getPropRegex(prop.attribute),
        this.cegService.getReplaceValueString(
          prop.attribute,
          this.counterNumber.toString(),
          true,
          prop.cegType,
        ),
      );
      this.codeWebComponent = this.codeWebComponent.replace(
        this.cegService.getPropRegex(prop.attribute),
        this.cegService.getReplaceValueString(
          prop.attribute,
          this.counterNumber.toString(),
          false,
          prop.cegType,
        ),
      );
    }
    this.updateProps();
  }
}
