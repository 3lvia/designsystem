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
  @Input() typesData;
  @Input() width = 100;
  @Input() hasPreview = true;
  @Input() inlineExample = false;
  @Input() accordionCustom = false;
  @Input() overflowY;
  @Input() overflowX;
  @Input() alignedTop = false;
  @Input() height = '340';
  enableFilters = true;
  typeHasFilter = false;
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
    if (this.inlineExample) {
      return;
    }
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
      this.dynamicCode = this.domSanitizer.bypassSecurityTrustHtml(this.componentData.codeNativeHTML);
      if (this.componentData.codeNativeScript) {
        setTimeout(() => eval(this.componentData.codeNativeScript), 200);
      }
      if (!this.componentData.attributes) {
        return;
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
    if (this.codeAngularSub) {
      this.codeAngularSub.unsubscribe();
    }
    if (this.codeReactSub) {
      this.codeReactSub.unsubscribe();
    }
    if (this.codeNativeSub) {
      this.codeNativeSub.unsubscribe();
    }
  }

  initializeComponentProps(): void {
    if (!this.componentData.attributes) {
      return;
    }
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
        const newType = { value: i, label: label };
        this.typeOptions.push(newType);
        i++;
      });
    }
    if (this.typesData) {
      let i = 0;
      this.typesData.forEach((option) => {
        const label = option.type.charAt(0).toUpperCase() + option.type.slice(1);
        const newType = { value: i, label: label };
        this.typeOptions.push(newType);
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

  updateSelectedTypeCustom(selected: { value: any; label: any }): void {
    this.typesData.forEach((element) => {
      if (element.type === selected.label.toLowerCase()) {
        this.selectedType = selected.label;
        this.codeReact = element.codeReact;
        this.codeAngular = element.codeAngular;
        this.codeNative = element.codeNativeHTML;
      }
    });
    this.enableFilters = false;
    setTimeout(() => {
      this.enableFilters = true;
      setTimeout(() => {
        this.updateProps();
      }, 100);
    }, 100);
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
      this.codeAngular = this.cegService.replaceOldProp(
        this.codeAngular,
        attribute,
        newValue,
        'angular',
        cegType,
      );
      this.codeNative = this.cegService.replaceOldProp(
        this.codeNative,
        attribute,
        newValue,
        'native',
        cegType,
      );
    } else {
      // Adds new prop to code
      this.codeReact = this.cegService.addNewProp(
        this.codeReact,
        attribute,
        newValue,
        'react',
        cegType,
        this.componentData.elementNameR,
      );
      this.codeAngular = this.cegService.addNewProp(
        this.codeAngular,
        attribute,
        newValue,
        'angular',
        cegType,
        this.componentData.elementNameW,
      );
      this.codeNative = this.cegService.addNewProp(
        this.codeNative,
        attribute,
        newValue,
        'native',
        cegType,
        this.componentData.elementNameW,
      );
    }
    this.updateProps();
  }

  getDependentFilter(): boolean {
    const hasDependenFilter = this.props.find((prop) => {
      return prop.cegTypeDependency;
    });
    if (!this.selectedType || !hasDependenFilter) {
      return true;
    }
    return this.props.find((prop) => {
      if (typeof prop.cegTypeDependency === 'string') {
        return (
          prop.cegTypeDependency && this.selectedType.toLowerCase() === prop.cegTypeDependency.toLowerCase()
        );
      } else {
        prop.cegTypeDependency.forEach((dep) => {
          return (
            prop.cegTypeDependency &&
            prop.cegTypeDependency &&
            this.selectedType.toLowerCase() === dep.toLowerCase()
          );
        });
      }
    });
  }
}
