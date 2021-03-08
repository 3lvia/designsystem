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
  @Input() componentData;
  @Input() width = 100;
  @Input() hasPreview = true;
  codeWebComponentSub: Subscription;
  hasCegAttributes = false;

  constructor(private codeService: ExampleCodeService) {}

  ngOnInit(): void {
    this.codeWebComponentSub = this.codeService.listenCodeWebComponent().subscribe((code: string) => {
      this.cegFrame.nativeElement.innerHTML = code;
    });
  }

  ngAfterViewInit(): void {
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
