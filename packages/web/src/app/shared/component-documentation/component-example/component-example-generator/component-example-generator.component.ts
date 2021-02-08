import { Component, Input, ViewChild } from '@angular/core';
import { ExampleCodeService } from '../../example-code.service';

@Component({
  selector: 'app-component-example-generator',
  templateUrl: './component-example-generator.component.html',
  styleUrls: ['./component-example-generator.component.scss'],
})
export class ComponentExampleGeneratorComponent {
  @ViewChild('cegFrame') cegFrame;
  @Input() codeInstallation = '';
  @Input() codeReact = '';
  @Input() codeWebComponent = '';
  @Input() componentData;

  showTypeDropdown = false;
  showBgDropdown = false;
  currentBackground = 'White';

  constructor(private codeService: ExampleCodeService) {}

  ngOnInit(): void {
    this.codeService.listenCodeWebComponent().subscribe((code: string) => {
      this.cegFrame.nativeElement.innerHTML = code;
    });
  }

  ngAfterViewInit(): void {
    this.cegFrame.nativeElement.innerHTML = this.codeWebComponent;
  }
}
