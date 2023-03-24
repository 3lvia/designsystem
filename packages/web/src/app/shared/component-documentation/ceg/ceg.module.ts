import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CegComponent } from './ceg.component';
import { CodeGeneratorComponent } from './code-generator/code-generator.component';
import { ControlsComponent } from './controls/controls.component';
import { FormatCodePipe } from './code-generator/formatCode.pipe';
import { CustomTextComponent } from './custom-text/custom-text.component';
import { RadioGroupComponent } from './controls/radio-group/radio-group.component';
import { CheckboxComponent } from './controls/checkbox/checkbox.component';
import { SwitchComponent } from './controls/switch/switch.component';
import { CounterComponent } from './controls/counter/counter.component';
import { TypeSwitcherComponent } from './type-switcher/type-switcher.component';
import { HighlighterPipe } from './code-generator/highlighter.pipe';

@NgModule({
  declarations: [
    CegComponent,
    CodeGeneratorComponent,
    ControlsComponent,
    FormatCodePipe,
    CustomTextComponent,
    RadioGroupComponent,
    CheckboxComponent,
    SwitchComponent,
    CounterComponent,
    TypeSwitcherComponent,
    HighlighterPipe,
  ],
  exports: [CegComponent],
  imports: [CommonModule],
  providers: [FormatCodePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CegModule {}
