import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-datetime-picker-doc',
  templateUrl: './datetime-picker-doc.component.html',
  styleUrls: ['./datetime-picker-doc.component.scss']
})
export class DatetimePickerDocComponent implements OnInit {

  externalUrl = getComponent('datetime-picker-doc').externalUrl;
  componentStatus = getComponent('datetime-picker-doc').status;

  constructor() { }

  ngOnInit() {
  }

}
