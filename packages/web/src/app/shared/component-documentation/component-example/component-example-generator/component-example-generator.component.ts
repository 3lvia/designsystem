import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExampleCodeService } from '../../example-code.service';

@Component({
  selector: 'app-component-example-generator',
  templateUrl: './component-example-generator.component.html',
  styleUrls: ['./component-example-generator.component.scss'],
})
export class ComponentExampleGeneratorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cegFrame') cegFrame;
  @ViewChild('cegContent') cegContent;
  @Input() delayInnerHtml = false;
  @Input() componentData;
  @Input() width = 100;
  @Input() hasPreview = true;
  @Input() accordionCustom = false;
  @Input() overflowY;
  codeWebComponentSub: Subscription;
  hasCegAttributes = false;
  props = [];
  modifiers = [];
  typeObject;
  backgroundObject;
  selectedBg;
  hasCheckboxes = false;

  constructor(private codeService: ExampleCodeService) {}

  ngOnInit(): void {
    this.codeWebComponentSub = this.codeService.listenCodeWebComponent().subscribe((code: string) => {
      if (!this.delayInnerHtml) {
        this.cegFrame.nativeElement.innerHTML = code;
        return;
      }
      this.cegContent.nativeElement.style.visibility = 'hidden';
      this.cegFrame.nativeElement.innerHTML = code;
      setTimeout(() => {
        this.cegContent.nativeElement.style.visibility = 'visible';
      }, 10);
    });
    this.initializeComponentProps();
  }

  ngAfterViewInit(): void {
    if (!this.hasPreview) {
      return;
    }
    this.cegFrame.nativeElement.innerHTML = this.componentData.codeWebComponent;
    Object.keys(this.componentData.attributes).forEach((attribute) => {
      Object.keys(this.componentData.attributes[attribute]).forEach((value) => {
        if (value === 'cegFormType') {
          this.hasCegAttributes = true;
          return;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.codeWebComponentSub.unsubscribe();
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
          if (this.componentData.attributes[attribute].cegFormType === 'type') {
            this.typeObject = newObject;
          }
          if (this.componentData.attributes[attribute].cegFormType === 'background') {
            this.backgroundObject = newObject;
            this.selectedBg = newObject.cegDefault;
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
    console.log(this.typeObject.cegOptions);
    console.log(this.backgroundObject.cegOptions);
  }
}
