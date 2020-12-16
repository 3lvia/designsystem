import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('checkbox1', { static: true }) checkbox: any;
  checkBoxVal = true;
  checkBoxVal2 = true;

  items = [
    { label: 'Option' },
    { label: 'Option', disabled: true },
    { label: 'Option' },
    { label: 'Option', disabled: true },
    { label: 'Option' }
  ];
  value = 2;


  nativeJSApproach() {
    // Non-angular approach, not necessary when using angular:
    this.checkbox.nativeElement.addEventListener('changed', (event: any) => {
      this.checkBoxVal2 = event.detail.checked;
    });
    this.checkbox.nativeElement.setProps({ checked: this.checkBoxVal2 });
    // If you need to get data at any other time: this.checkbox.nativeElement.getProps();
  }

  ngOnInit(): void {
    this.nativeJSApproach();
  }

  updateSelected(selected: number): void {
    if (selected !== undefined) {
      this.value = selected;
    }
  }
}
