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
  progressValue = 19;
  indeterminate = false;
  progressError = false;


  increaseProgress() {
    this.progressValue = this.progressValue + 10;
    this.progressbar.nativeElement.setProps({ rangeValue: this.progressValue });
    console.log(this.progressbar.nativeElement.getProps());
  }

  IndeterminateLoading() {
    this.indeterminate = !this.indeterminate;
    this.progressbar.nativeElement.setProps({ indeterminate: this.indeterminate });
    console.log(this.progressbar.nativeElement.getProps());
  }

  updateErrorState() {
    this.progressError = !this.progressError;
    this.progressbar.nativeElement.setProps({ error: this.progressError });
    console.log(this.progressbar.nativeElement.getProps());
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
      this.progressValue = event.detail.rangeValue;
    });
    this.progressbarIndeterminite.nativeElement.addEventListener('props-changed', (event: any) => {
      this.progressValue = event.detail.rangeValue;
    });

    this.progressbar.nativeElement.setProps({ rangeValue: 50, });
    this.progressbarIndeterminite.nativeElement.getProps();
    this.progressbarIndeterminite.nativeElement.setProps({ indeterminate: true, });
    this.progressbarIndeterminite.nativeElement.getProps();
    this.progressbarError.nativeElement.setProps({ error: true, });
    this.progressbarIndeterminite.nativeElement.getProps();

  }
}
