import { Component, Input, ViewChild } from '@angular/core';

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

  ngAfterViewInit(): void {
    this.cegFrame.nativeElement.innerHTML = this.codeWebComponent;
  }
}
