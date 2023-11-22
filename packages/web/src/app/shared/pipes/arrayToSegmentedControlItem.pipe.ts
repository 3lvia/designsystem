import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'arrayToSegmentedControlItem',
})
export class ArrayToSegmentedControlItemPipe implements PipeTransform {
  transform(tabs: string[]): { label: string }[] {
    return tabs.map((tab) => ({ label: tab }));
  }
}
