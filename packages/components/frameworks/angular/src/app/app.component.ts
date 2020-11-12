import { Component, OnInit, ViewChild } from '@angular/core';
import { Popover } from '@elvia/popover/web_component';
import { Checkbox } from '@elvia/checkbox/web_component';
// import { Popover } from '@elvia/popover';

Popover;
Checkbox;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('checkbox1', { static: true }) checkbox: any;
  title = 'angular';
  checkBoxVal = true;

  ngOnInit() {

    // LISTEN TO CHANGES ON COMPONENT
    this.checkbox.nativeElement.addEventListener('props-changed', (event: any) => {
      const data = event.detail;
      this.checkBoxVal = data.checked;
    });

    this.checkbox.nativeElement.setProps({ checked: true });
    this.checkbox.nativeElement.getProps();


    this.checkbox.nativeElement.data.checked = false;

  }
}
