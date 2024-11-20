import { NgTemplateOutlet } from '@angular/common';
import { Component, booleanAttribute, contentChild, input } from '@angular/core';

import { StaticCodeGeneratorComponent } from '../code-generator/static-code-generator/static-code-generator.component';
import { PhoneShellComponent } from '../phone-shell/phone-shell.component';
import { StaticComponentExample } from './static-component-example';

@Component({
    selector: 'app-static-ceg',
    templateUrl: './static-ceg.component.html',
    styleUrls: ['./static-ceg.component.scss', '../shared-styles.scss'],
    imports: [PhoneShellComponent, NgTemplateOutlet, StaticCodeGeneratorComponent]
})
export class StaticCegComponent {
  staticContent = contentChild.required(StaticComponentExample);

  fullWidth = input(false, { transform: booleanAttribute });
  hideReact = input(false, { transform: booleanAttribute });
  phoneExample = input(false, { transform: booleanAttribute });
  nonInteractive = input(false, { transform: booleanAttribute });
}
