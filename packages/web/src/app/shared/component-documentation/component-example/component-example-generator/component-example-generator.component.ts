import { AfterContentInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ExampleCodeService } from '../../example-code.service';

@Component({
  selector: 'app-component-example-generator',
  templateUrl: './component-example-generator.component.html',
  styleUrls: ['./component-example-generator.component.scss'],
})
export class ComponentExampleGeneratorComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild('cegFrame') cegFrame;
  @ViewChild('cegContent') cegContent;
  @Input() delayInnerHtml = false;
  @Input() componentData;
  @Input() width = 100;
  @Input() hasPreview = true;
  @Input() accordionCustom = false;
  @Input() overflowY;
  @Input() alignedTop = false;
  codeAngularSub: Subscription;
  codeReactSub: Subscription;
  codeNativeSub: Subscription;
  hasCegAttributes = false;
  props = [];
  modifiers = [];
  typeObject;
  backgroundObject;
  hasCheckboxes = false;
  typeOptions = [];
  bgOptions = [];
  selectedBg;
  selectedType;
  codeReact;
  codeNative;
  codeAngular;
  hasTopFilters = false;
  typeDefault;
  bgDefault;
  bgList = [];
  dynamicCode;

  constructor(private cegService: ExampleCodeService, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.codeAngular = this.componentData.codeAngular;
    this.codeReact = this.componentData.codeReact;
    this.codeNative = this.componentData.codeNativeHTML;
    this.codeAngularSub = this.cegService.listenCodeAngular().subscribe((code: string) => {
      this.codeAngular = code;
    });
    this.codeReactSub = this.cegService.listenCodeReact().subscribe((code: string) => {
      this.codeReact = code;
    });
    this.codeNativeSub = this.cegService.listenCodeNative().subscribe((code: string) => {
      this.codeNative = code;
      this.updateCegFrame(code);
    });

    this.initializeComponentProps();
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      if (!this.hasPreview) {
        return;
      }
      this.dynamicCode = this.domSanitizer.bypassSecurityTrustHtml(this.componentData.codeNativeHTML)
      if (this.componentData.codeNativeScript) {
        setTimeout(() => eval(this.componentData.codeNativeScript), 200);
      }
      Object.keys(this.componentData.attributes).forEach((attribute) => {
        Object.keys(this.componentData.attributes[attribute]).forEach((value) => {
          if (value === 'cegFormType') {
            this.hasCegAttributes = true;
            return;
          }
        });
      });
    }, 200);
  }

  ngOnDestroy(): void {
    this.codeAngularSub.unsubscribe();
    this.codeReactSub.unsubscribe();
    this.codeNativeSub.unsubscribe();
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
          } else if (this.componentData.attributes[attribute].cegFormType === 'type') {
            this.typeObject = newObject;
            this.selectedType = newObject.cegOptions[0];
            this.hasTopFilters = true;
            this.typeDefault = this.componentData.attributes[attribute].cegDefault;
          } else if (this.componentData.attributes[attribute].cegFormType === 'background') {
            this.backgroundObject = newObject;
            this.bgDefault = newObject.cegDefault;
            this.selectedBg = newObject.cegDefault;
            this.hasTopFilters = true;
          } else {
            this.props.push(newObject);
          }
        }
      });
      if (
        this.bgList.filter((object) => object === this.backgroundObject).length < 1 &&
        this.backgroundObject
      ) {
        this.bgList.push(this.backgroundObject);
      }
    });
    if (this.hasCheckboxes) {
      const modifiersObject = {
        cegFormType: 'checkbox',
        modifiers: this.modifiers,
      };
      this.props.push(modifiersObject);
    }
    if (this.typeObject) {
      let i = 0;
      this.typeObject.cegOptions.forEach((option) => {
        const label = option.charAt(0).toUpperCase() + option.slice(1);
        const type = { value: i, label: label };
        this.typeOptions.push(type);
        i++;
      });
    }
    if (this.backgroundObject) {
      let i = 0;
      this.backgroundObject.cegOptions.forEach((option) => {
        const type = { value: i, label: option };
        this.bgOptions.push(type);
        i++;
      });
    }
  }

  updateCegFrame(code: string): void {
    this.dynamicCode = this.domSanitizer.bypassSecurityTrustHtml(code);
    if (this.componentData.codeNativeScript) {
      setTimeout(() => eval(this.componentData.codeNativeScript), 200);
    }
  }

  updateProps(): void {
    this.cegService.updateCodeReact(this.codeReact);
    this.cegService.updateCodeAngular(this.codeAngular);
    this.cegService.updateCodeNative(this.codeNative);
  }

  updateSelectedType(selected: { value: any; label: any }): void {
    this.selectedType = selected.label;
    const attribute = this.typeObject.attribute;
    const newValue = selected.label.toLowerCase();
    const cegType = this.typeObject.cegType;
    this.updateSelected(attribute, newValue, cegType);
  }

  updateSelectedBg(selected: { value: any; label: any }): void {
    this.selectedBg = selected.label;
    this.bgList.forEach((bg) => {
      if (bg.cegOptions[bg.cegDefault] === selected.label) {
        this.updateSelected(bg.attribute, bg.default, 'boolean');
      } else {
        this.updateSelected(bg.attribute, '' + (bg.default == 'false'), 'boolean');
      }
    });
  }

  updateSelected(attribute: string, newValue: string, cegType: string): void {
    if (this.codeAngular.includes(attribute)) {
      // Replaces old value for prop
      this.codeReact = this.cegService.replaceOldProp(this.codeReact, attribute, newValue, 'react', cegType);
      this.codeAngular = this.cegService.replaceOldProp(this.codeAngular, attribute, newValue, 'angular', cegType);
      this.codeNative = this.cegService.replaceOldProp(this.codeNative, attribute, newValue, 'native', cegType);
    } else {
      // Adds new prop to code
      this.codeReact = this.cegService.addNewProp(this.codeReact, attribute, newValue, 'react', cegType, this.componentData.elementNameR);
      this.codeAngular = this.cegService.addNewProp(this.codeAngular, attribute, newValue, 'angular', cegType, this.componentData.elementNameW);
      this.codeNative = this.cegService.addNewProp(this.codeNative, attribute, newValue, 'native', cegType, this.componentData.elementNameW);
    }
    this.updateProps();
  }
}
