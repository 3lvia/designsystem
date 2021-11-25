import { Pipe, PipeTransform } from '@angular/core';
import { CegFormGroup, CegFormGroupOption, FormState } from '../ceg.interface';

@Pipe({
  name: 'visibleFields',
})
export class VisibleFieldsPipe implements PipeTransform {
  transform(formField: CegFormGroup | CegFormGroupOption, formStates: FormState): any {
    if (!formField.dependency || !formStates[formField.dependency.name]) {
      return true;
    }
    let visibility = false;
    if (typeof formField.dependency.value === 'object') {
      visibility = formField.dependency.value.some((element) => {
        return formStates[formField.dependency.name].toString() === element.toString().toLowerCase();
      });
    } else {
      visibility =
        formStates[formField.dependency.name].toString() ===
        formField.dependency.value.toString().toLowerCase();
    }
    return visibility;
  }
}
