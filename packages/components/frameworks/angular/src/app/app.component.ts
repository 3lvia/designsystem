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
    { label: 'Kiwi', isDisabled: true },
  ];
  value = 2;

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

    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);
  }
}
