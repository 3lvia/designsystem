import {Component} from '@angular/core';
import {getComponent} from 'src/app/shared/e-items';

@Component({
  selector: 'app-datetime-picker-doc',
  templateUrl: './datetime-picker-doc.component.html',
  styleUrls: ['./datetime-picker-doc.component.scss'],
})
export class DatetimePickerDocComponent {
  externalUrl = getComponent('datetime-picker-doc').externalUrl;
  componentStatus = getComponent('datetime-picker-doc').status;
  does = ["When it's more efficient than typing a date in a text field."];

  inputTimeExample = `<div class="e-form-field" style="width:140px">
  <label class="e-form-field__label" for="normal">Normal input field </label>
  <div class="e-input">
    <i class="e-icon e-icon--clock e-icon--xs"></i>
    <input id="normal" type="time" placeholder="">
  </div>
</div>`;

  inputDateExample = `<div class="e-form-field" style="width:250px">
  <label class="e-form-field__label" for="normal">Normal input field </label>
  <div class="e-input">
    <i class="e-icon e-icon--calendar e-icon--xs"></i>
    <input id="normal" type="date" placeholder="">
  </div>
</div>`;
}
