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

  updateCheckboxValue(value: boolean) {
    this.checkBoxVal = value;
    console.log(this.checkBoxVal);
  }

  ngOnInit() {
    this.checkbox.nativeElement.addEventListener('data-changed', (event: any) => {
      const data = event.detail;
      console.log("DATA CHANGED!:", data);
      this.checkBoxVal = data.checked;
    });

    window.setInterval(() => {
      console.log(this.checkbox.nativeElement);
      this.checkbox.nativeElement.data = {
        checked: this.checkBoxVal
      };
    }, 7000);
  }
}
