// import { AfterContentInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AfterViewInit, Compiler, Component, ComponentRef, Input, NgModule, ViewChild, ViewContainerRef } from "@angular/core";
import { Subscription } from "rxjs";
import { ExampleCodeService } from "../../example-code.service";
@Component({
  selector: 'app-component-example-generator',
  templateUrl: './component-example-generator.component.html',
  styleUrls: ['./component-example-generator.component.scss'],
})
export class ComponentExampleGeneratorComponent implements AfterViewInit {
  @Input() delayInnerHtml = false;
  @Input() componentData;
  @Input() width = 100;
  @Input() hasPreview = true;
  @Input() accordionCustom = false;
  @Input() overflowY;
  @Input() alignedTop = false;
  @ViewChild('cegFrame', { read: ViewContainerRef }) cegFrame: ViewContainerRef;

  componentRef: ComponentRef<any>;
  codeWebComponentSub: Subscription;
  codeReactSub: Subscription;
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
  codeWebComponent;
  hasTopFilters = false;
  typeDefault;
  bgDefault;
  bgList = [];

  constructor(private cegService: ExampleCodeService, private compiler: Compiler) { }

  ngOnInit(): void {
    this.codeWebComponent = this.componentData.codeWebComponent;
    this.codeReact = this.componentData.codeReact;
    this.codeWebComponentSub = this.cegService.listenCodeWebComponent().subscribe((code: string) => {
      this.codeWebComponent = code;
      this.updateCegFrame(code);
    });
    this.codeReactSub = this.cegService.listenCodeReact().subscribe((code: string) => {
      this.codeReact = code;
    });

    this.initializeComponentProps();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.hasPreview) {
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

    this.updateCegFrame(this.componentData.codeWebComponent);
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.codeWebComponentSub.unsubscribe();
    this.codeReactSub.unsubscribe();
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
    const tmpCmp = Component({ template: code })(class { });
    const tmpModule = NgModule({ declarations: [tmpCmp] })(class { });
    this.compiler.compileModuleAndAllComponentsAsync(tmpModule)
      .then((factories) => {
        if (this.componentRef) {
          this.componentRef.destroy();
        }
        const factory = factories.componentFactories[0];
        this.componentRef = this.cegFrame.createComponent(factory);
        this.componentRef.instance.name = 'dynamic-ceg-component';
        this.componentRef.location.nativeElement.style.width = '100%';
        this.componentRef.location.nativeElement.style.display = 'flex';
        this.componentRef.location.nativeElement.style.justifyContent = 'center';
      });
  }

  updateProps(): void {
    this.cegService.updateCodeReact(this.codeReact);
    this.cegService.updateCodeWebComponent(this.codeWebComponent);
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
    const selectedBgObject = this.bgList.find((bg) => bg.displayName === selected.label);
    this.bgList.forEach((bg) => {
      if (selectedBgObject && selectedBgObject.attribute === bg.attribute) {
        this.updateSelected(bg.attribute, 'true', 'boolean');
      } else if (selectedBgObject) {
        this.updateSelected(bg.attribute, 'false', 'boolean');
      } else {
        this.updateSelected(bg.attribute, 'false', 'boolean');
      }
    });
  }

  updateSelected(attribute: string, newValue: string, cegType: string): void {
    if (this.codeWebComponent.includes(attribute)) {
      // Replaces old value for prop
      this.codeReact = this.codeReact.replace(
        this.cegService.getPropRegex(attribute),
        this.cegService.getReplaceValueString(attribute, newValue, true, cegType),
      );
      this.codeWebComponent = this.codeWebComponent.replace(
        this.cegService.getPropRegex(attribute),
        this.cegService.getReplaceValueString(attribute, newValue, false, ''),
      );
    } else {
      // Adds new prop to code
      const newLineRegexW = this.cegService.getNewLineRegex(this.componentData.elementNameW);
      const newStringW = this.cegService.getNewPropStringW(
        this.componentData.elementNameW,
        attribute,
        newValue,
      );
      this.codeWebComponent = this.codeWebComponent.replace(newLineRegexW, newStringW);

      const newLineRegexR = this.cegService.getNewLineRegex(this.componentData.elementNameR);
      const newStringR = this.cegService.getNewPropStringR(
        this.componentData.elementNameR,
        attribute,
        newValue,
        cegType,
      );
      this.codeReact = this.codeReact.replace(newLineRegexR, newStringR);
    }
    this.updateProps();
  }
}
