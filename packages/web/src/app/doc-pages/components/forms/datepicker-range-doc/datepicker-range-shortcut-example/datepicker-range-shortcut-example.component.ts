import { Component } from '@angular/core';

type Shortcut = 'custom' | 'today' | 'yesterday' | 'lastWeek' | 'lastMonth';

@Component({
  selector: 'app-datepicker-range-shortcut-example',
  templateUrl: './datepicker-range-shortcut-example.component.html',
  styleUrls: ['./datepicker-range-shortcut-example.component.scss'],
})
export class DatepickerRangeShortcutExampleComponent {
  radioFilterValue: Shortcut = 'custom';
  datepickerRangeValue?: { start: Date | null; end: Date | null } = undefined;

  handleDatePickerRangeOnChange(value: { start: Date | null; end: Date | null }): void {
    console.log('Elvia Date Picker Range:', value);
    this.radioFilterValue = 'custom';
  }

  handleRadioFilterOnChange(value: Shortcut): void {
    this.radioFilterValue = value;

    switch (value) {
      case 'today':
        this.datepickerRangeValue = {
          start: new Date(),
          end: new Date(),
        };
        break;
      case 'yesterday':
        this.datepickerRangeValue = {
          start: new Date(new Date().setDate(new Date().getDate() - 1)),
          end: new Date(new Date().setDate(new Date().getDate() - 1)),
        };
        break;
      case 'lastWeek':
        this.datepickerRangeValue = {
          start: new Date(new Date().setDate(new Date().getDate() - 7)),
          end: new Date(),
        };
        break;
      case 'lastMonth':
        this.datepickerRangeValue = {
          start: new Date(new Date().setDate(new Date().getDate() - 30)),
          end: new Date(),
        };
        break;
      case 'custom':
      default:
        break;
    }
  }
}
