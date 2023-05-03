import { Pipe, PipeTransform } from '@angular/core';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';
import { CegFormGroup, CegFormGroupOption } from '../ceg.interface';

@Pipe({
  name: 'checkboxChildFields',
})
export class CheckboxChildFieldsPipe implements PipeTransform {
  transform(formField: CegFormGroup | CegFormGroupOption, componentData: ComponentData): any {
    if (!formField.dependency) {
      return false;
    }
    let isCheckboxChild = false;
    formField.dependency.every((dependency) => {
      Object.keys(componentData.attributes).forEach((attribute) => {
        if (attribute === dependency.name) {
          const fieldDisplayGroup = componentData.attributes[formField.propName!].cegDisplayGroup;
          const dependencyDisplayGroup = componentData.attributes[attribute].cegDisplayGroup;
          if (fieldDisplayGroup === dependencyDisplayGroup) {
            isCheckboxChild = true;
          }
        }
      });
    });

    return isCheckboxChild;
  }
}
