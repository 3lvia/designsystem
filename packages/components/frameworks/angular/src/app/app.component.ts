import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('checkbox1', { static: true }) checkbox: any;
  checkBoxVal = true;

  @ViewChild('progressbarExamp', { static: true }) progressbar: any;
  progressValue = 10;
  indeterminate = false;
  progressError = false;

  ngOnInit(): void {
    // Listen checkbox changes
    this.checkbox.nativeElement.addEventListener('props-changed', (event: any) => {
      this.checkBoxVal = event.detail.checked;
    });
    this.checkbox.nativeElement.setProps({ checked: true });
    this.checkbox.nativeElement.getProps();

    // Listen progressbar changes
    this.progressbar.nativeElement.addEventListener('props-changed', (event: any) => {
      this.progressValue = event.detail.rangeValue;
      this.indeterminate = event.detail.indeterminate;
      this.progressError = event.detail.error;
    });
    this.progressbar.nativeElement.setProps({ indeterminate: true });
    this.progressbar.nativeElement.getProps();
  }
}
