import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('checkbox1', { static: true }) checkbox: any;
  checkBoxVal = true;

  @ViewChild('progressbarExamp1', { static: true }) progressbar: any;
  @ViewChild('progressbarExamp2', { static: true }) progressbarIndeterminite: any;
  @ViewChild('progressbarExamp3', { static: true }) progressbarError: any;
  progressValue = 0;
  indeterminate = false;
  progressError = false;

  increaseProgress() {
    this.progressValue += 10;
    this.progressbar.nativeElement.setProps({ rangeValue: this.progressValue });
  }

  decreaseProgress() {
    this.progressValue -= 10;
    this.progressbar.nativeElement.setProps({ rangeValue: this.progressValue });
  }

  resetProgress() {
    this.progressValue = 0;
    this.progressbar.nativeElement.setProps({ rangeValue: this.progressValue });
  }

  ngOnInit(): void {
    // Listen checkbox changes
    this.checkbox.nativeElement.addEventListener('props-changed', (event: any) => {
      this.checkBoxVal = event.detail.checked;
    });
    this.checkbox.nativeElement.setProps({ checked: true });
    this.checkbox.nativeElement.getProps();

    // send props to progress-linear components
    this.progressbarIndeterminite.nativeElement.setProps({ indeterminate: true, });
    this.progressbarError.nativeElement.setProps({ error: true, });
  }
}
