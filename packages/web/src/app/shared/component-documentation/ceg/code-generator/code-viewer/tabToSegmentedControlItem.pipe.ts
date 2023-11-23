import { Pipe, PipeTransform } from '@angular/core';
import { Tab } from '../types';

@Pipe({
  standalone: true,
  name: 'tabToSegmentedControlItem',
})
export class TabToSegmentedControlItemPipe implements PipeTransform {
  transform(tabs: Tab[]): { label: Tab }[] {
    return tabs.map((tab) => ({ label: tab }));
  }
}
