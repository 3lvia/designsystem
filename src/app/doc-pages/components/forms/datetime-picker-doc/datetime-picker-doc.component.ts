import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-datetime-picker-doc',
  templateUrl: './datetime-picker-doc.component.html',
  styleUrls: ['./datetime-picker-doc.component.scss'],
})
export class DatetimePickerDocComponent {
  figmaUrl = getComponent('datetime-picker-doc').figmaUrl;
  description = getComponent('datetime-picker-doc').description;
  does = ['When it\'s more efficient than typing a date in a text field.'];

  inputTimeExample = `<h3>NB!!! This is not a finished component, style has to be applied based on the figma sketches</h3>
<div class="e-form-field" style="width:140px">
  <label class="e-form-field__label" for="normal">Velg dato</label>
  <div class="e-input">
    <i class="e-icon e-icon--clock e-icon--xs"></i>
    <input id="normal" type="time" placeholder="">
  </div>
</div>`;

  inputDateExample = `<h3>NB!!! This is not a finished component, style has to be applied based on the figma sketches</h3>
<div class="e-form-field" style="width:250px">
  <label class="e-form-field__label" for="normal">Velg tid</label>
  <div class="e-input">
    <i class="e-icon e-icon--calendar e-icon--xs"></i>
    <input id="normal" type="date" placeholder="">
  </div>
</div>`;

  compactDatetimePicker = `<h3>NB!!! This is not a finished component, style has to be applied based on the figma sketches</h3>
<div class="e-form-field e-form-field--compact" style="width:250px">
  <label class="e-form-field__label" for="normal">Dato</label>
  <div class="e-input">
    <i class="e-icon e-icon--calendar e-icon--xs"></i>
    <input id="normal" type="date" placeholder="">
  </div>
</div>
<div class="e-form-field e-form-field--compact" style="width:140px">
  <label class="e-form-field__label" for="normal">Tid</label>
  <div class="e-input">
    <i class="e-icon e-icon--clock e-icon--xs"></i>
    <input id="normal" type="time" placeholder="">
  </div>
</div>`;
}
