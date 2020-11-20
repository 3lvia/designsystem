import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('checkbox1', { static: true }) checkbox: any;
  checkBoxVal = true;

  ngOnInit(): void {
    // Listen checkbox changes
    this.checkbox.nativeElement.addEventListener('props-changed', (event: any) => {
      this.checkBoxVal = event.detail.checked;
    });
    this.checkbox.nativeElement.setProps({ checked: true });
    this.checkbox.nativeElement.getProps();
  }
}
