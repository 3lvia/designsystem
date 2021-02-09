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
  @Input() codeInstallation = '';
  @Input() codeReact = '';
  @Input() codeWebComponent = '';
  @Input() componentData;
  codeWebComponentSub: Subscription;

  constructor(private codeService: ExampleCodeService) {}

  ngOnInit(): void {
    this.codeWebComponentSub = this.codeService.listenCodeWebComponent().subscribe((code: string) => {
      this.cegFrame.nativeElement.innerHTML = code;
    });
  }

  ngAfterViewInit(): void {
    this.cegFrame.nativeElement.innerHTML = this.codeWebComponent;
  }

  ngOnDestroy(): void {
    this.codeWebComponentSub.unsubscribe();
  }
}
