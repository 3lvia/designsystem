import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('checkbox1', { static: true }) checkbox: any;
  checkBoxVal = true;
  tabLabels = ['Option', 'Option', 'Option', 'option', 'Option'];
  tabSelected = 2;
  tabDisabled = [3, 4];
  checkBoxVal2 = true;


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

  updateSelected(sel) {
    if (sel !== undefined) {
      this.tabSelected = sel;
    }
  }
}
