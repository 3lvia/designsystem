import { Component, Input, OnInit } from '@angular/core';
import { ComponentExample } from '../componentExample';
import { Controls, CegControl, CegControlGroup } from '../controlType';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent implements OnInit {
  @Input() cegContent: ComponentExample;
  controls: Controls;

  ngOnInit() {
    this.cegContent.controls.subscribe((controls) => (this.controls = controls));
  }

  isGroup(control: CegControlGroup | CegControl): control is CegControlGroup {
    console.log(control);
    return 'title' in control;
  }
}
