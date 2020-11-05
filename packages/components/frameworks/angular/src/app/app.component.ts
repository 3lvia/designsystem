import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Popover } from '@elvia/popover/web_component';
import { Checkbox } from '@elvia/checkbox/web_component';

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
    this.checkbox.nativeElement.addEventListener('data-changed', (event: any) => {
      const data = event.detail;
      this.checkBoxVal = data.checked;
    });

    // MAP DATA FROM ANGULAR TO COMPONENT
    this.checkbox.nativeElement.data = {
      checked: this.checkBoxVal,
      size: 'small'
    };

  }
}
