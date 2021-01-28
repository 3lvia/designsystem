import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-datetime-picker-doc',
  templateUrl: './datetime-picker-doc.component.html',
  styleUrls: ['./datetime-picker-doc.component.scss'],
})
export class DatetimePickerDocComponent {
  figmaUrl = getComponent('datetime-picker').figmaUrl;
  description = getComponent('datetime-picker').description;
  does = ["When it's more efficient than typing a date in a text field."];

  inputTimeExample = `<p class="e-title-caps">NB!!! This is not a finished component, style has to be applied based on the figma sketches</div>
<div class="e-form-field" style="width:140px">
  <label class="e-form-field__label" for="normal">Velg tid</label>
  <div class="e-input">
    <button class="e-btn e-btn--icon">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--clock"></i>
      </span>
    </button>
    <input id="normal" type="time" placeholder="">
  </div>
</div>`;

  inputDateExample = `<p class="e-title-caps">NB!!! This is not a finished component, style has to be applied based on the figma sketches</p>
<div class="e-form-field" style="width:250px">
  <label class="e-form-field__label" for="normal">Velg dato</label>
  <div class="e-input">
    <button class="e-btn e-btn--icon">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--calendar"></i>
      </span>
    </button>
    <input id="normal" type="date" placeholder="">
  </div>
</div>`;
}
