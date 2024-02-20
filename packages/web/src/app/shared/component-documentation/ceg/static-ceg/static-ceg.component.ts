import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, booleanAttribute } from '@angular/core';

import { StaticCodeGeneratorComponent } from '../code-generator/static-code-generator/static-code-generator.component';
import { PhoneShellComponent } from '../phone-shell/phone-shell.component';
import { StaticComponentExample } from './static-component-example';

@Component({
  selector: 'app-static-ceg',
  templateUrl: './static-ceg.component.html',
  styleUrls: ['./static-ceg.component.scss', '../shared-styles.scss'],
  standalone: true,
  imports: [NgClass, NgIf, PhoneShellComponent, NgTemplateOutlet, StaticCodeGeneratorComponent],
})
export class StaticCegComponent {
  @ContentChild(StaticComponentExample, { static: true }) staticContent: StaticComponentExample;
  @Input({ transform: booleanAttribute }) hideReact: boolean;
  @Input({ transform: booleanAttribute }) phoneExample: boolean;
  @Input({ transform: booleanAttribute }) nonInteractive: boolean;
}
