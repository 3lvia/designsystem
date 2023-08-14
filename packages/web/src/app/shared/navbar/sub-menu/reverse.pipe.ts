import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {
  transform<T>(value: T[]): T[] {
    return value.slice().reverse();
  }
}
