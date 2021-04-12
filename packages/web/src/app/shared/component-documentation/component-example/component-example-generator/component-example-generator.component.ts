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
  @Input() flexAlignStart = false;
  @Input() overflowY;
  codeWebComponentSub: Subscription;
  hasCegAttributes = false;

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
}
