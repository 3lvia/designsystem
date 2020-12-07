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

  timer;

  progressExamp = () => {
    if (this.progressValue < 100) {
      this.progressValue = this.progressValue + 10;
      this.progressbar.nativeElement.setProps({ rangeValue: this.progressValue });
      this.timer = setTimeout(this.progressExamp, 500);
    } else {
      return;
    }
  }

  resetProgress() {
    clearTimeout(this.timer);
    this.progressValue = 0;
    console.log('hello');
    this.progressbar.nativeElement.setProps({ rangeValue: this.progressValue });
    console.log(this.progressbar.nativeElement.getProps());
  }

  increaseProgress() {
    if (this.progressValue < 100) {
      this.progressValue = this.progressValue + 10;
      this.progressbar.nativeElement.setProps({ rangeValue: this.progressValue });
    } else {
    }
  }

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
    });
    // tslint:disable-next-line:max-line-length
    this.progressbarIndeterminite.nativeElement.addEventListener('props-changed', (event: any) => {
      this.indeterminate = event.detail.indeterminate;
    });
    this.progressbarIndeterminite.nativeElement.addEventListener('props-changed', (event: any) => {
      this.progressError = event.detail.error;
    });

    // this.progressbar.nativeElement.setProps({ rangeValue: this.progressValue, });
    this.progressbarIndeterminite.nativeElement.setProps({ indeterminate: true, });
    this.progressbarError.nativeElement.setProps({ error: true, });



  }
}
