import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('checkbox1', { static: true }) checkbox: any;
  checkBoxVal = true;
  checkBoxVal2 = true;
  progressValue = 0;

  items = [
    { label: 'Epler' },
    { label: 'Appelsin' },
    { label: 'Bananer' },
    { label: 'Druer' },
    { label: 'Kiwi', disabled: true },
  ];
  value = 0;

  nativeJSApproach(): void {
    // Non-angular approach, not necessary when using angular:
    this.checkbox.nativeElement.addEventListener('checkedOnChange', (event: any) => {
      this.checkBoxVal2 = event.detail.checked;
    });
    this.checkbox.nativeElement.setProps({ checked: this.checkBoxVal2 });
    // If you need to get data at any other time: this.checkbox.nativeElement.getProps();
  }

  ngOnInit(): void {
    this.nativeJSApproach();
  }
}
