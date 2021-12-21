import { Pipe, PipeTransform } from '@angular/core';
import { CegFormGroup, CegFormGroupOption, FormState } from '../ceg.interface';

@Pipe({
  name: 'visibleFields',
})
export class VisibleFieldsPipe implements PipeTransform {
  transform(formField: CegFormGroup | CegFormGroupOption, formStates: FormState): any {
    if (!formField.dependency) {
      return true;
    }
    const visibility = formField.dependency.every((dependency) => {
      // If formfield has all dependencies true
      if (!formStates[dependency.name]) {
        return true;
      }
      let visibility = false;
      if (typeof dependency.value === 'object') {
        visibility = dependency.value.some((element) => {
          return formStates[dependency.name].toString() === element.toString().toLowerCase();
        });
      } else {
        visibility = formStates[dependency.name].toString() === dependency.value.toString().toLowerCase();
      }
      return visibility;
    });

    return visibility;
  }
}
