import { Component } from '@angular/core';

type Shortcut = 'custom' | 'today' | 'yesterday' | 'lastWeek' | 'lastMonth';

@Component({
  selector: 'app-datepicker-range-shortcut-example',
  templateUrl: './datepicker-range-shortcut-example.component.html',
  styleUrls: ['./datepicker-range-shortcut-example.component.scss'],
})
export class DatepickerRangeShortcutExampleComponent {
  radioFilterValue: Shortcut = 'custom';
  datepickerRangeValue?: { start: Date | null; end: Date | null };

  handleDatePickerRangeOnChange(value: { start: Date | null; end: Date | null }): void {
    console.log('Elvia Date Picker Range:', value);
    this.radioFilterValue = 'custom';
  }

  handleRadioFilterOnChange(value: Shortcut): void {
    this.setDatePickerRangeValue(value);
  }

  private setDatePickerRangeValue(value: Shortcut): void {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59);

    switch (value) {
      case 'today':
        this.datepickerRangeValue = {
          start: todayStart,
          end: todayEnd,
        };
        break;
      case 'yesterday':
        const yesterdayStart = new Date(todayStart);
        yesterdayStart.setDate(todayStart.getDate() - 1);

        const yesterdayEnd = new Date(todayEnd);
        yesterdayEnd.setDate(todayEnd.getDate() - 1);

        this.datepickerRangeValue = {
          start: yesterdayStart,
          end: yesterdayEnd,
        };
        break;
      case 'lastWeek':
        const lastWeekStart = new Date(todayStart);
        lastWeekStart.setDate(todayStart.getDate() - 7);

        this.datepickerRangeValue = {
          start: lastWeekStart,
          end: todayEnd,
        };
        break;
      case 'lastMonth':
        const lastMonthStart = new Date(todayStart);
        lastMonthStart.setDate(todayStart.getDate() - 30);

        this.datepickerRangeValue = {
          start: lastMonthStart,
          end: todayEnd,
        };
        break;
      case 'custom':
      default:
        break;
    }
  }
}
