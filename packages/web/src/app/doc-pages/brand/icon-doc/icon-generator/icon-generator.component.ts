import { CUSTOM_ELEMENTS_SCHEMA, Component, computed, input } from '@angular/core';

import { kebabCaseToCamelCase } from '../icon-preview/utils';

@Component({
  selector: 'app-icon-generator',
  standalone: true,
  template: `<e-icon [name]="transformedName()" [size]="size()" />`,
  styles: [':host { line-height: 0; }'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IconGeneratorComponent {
  name = input.required<string | undefined>();
  size = input<'sm' | 'md'>();
  transformedName = computed(() => kebabCaseToCamelCase(this.name() ?? ''));
}
