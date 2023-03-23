import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CegComponent } from './ceg.component';
import { CodeGeneratorComponent } from './code-generator/code-generator.component';
import { ControlsComponent } from './controls/controls.component';
import { HighlightPipe } from './code-generator/highlight.pipe';
import { CustomTextComponent } from './custom-text/custom-text.component';
import { RadioGroupComponent } from './controls/radio-group/radio-group.component';
import { CheckboxComponent } from './controls/checkbox/checkbox.component';
import { SwitchComponent } from './controls/switch/switch.component';
import { CounterComponent } from './controls/counter/counter.component';
import { TypeSwitcherComponent } from './type-switcher/type-switcher.component';
import { CegInnerHtmlComponent } from './ceg-inner-html/ceg-inner-html.component';

@NgModule({
  declarations: [
    CegComponent,
    CodeGeneratorComponent,
    ControlsComponent,
    HighlightPipe,
    CustomTextComponent,
    RadioGroupComponent,
    CheckboxComponent,
    SwitchComponent,
    CounterComponent,
    TypeSwitcherComponent,
    CegInnerHtmlComponent,
  ],
  exports: [CegComponent],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CegModule {}
