import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CegComponent } from './ceg.component';
import { CodeGeneratorComponent } from './code-generator/code-generator.component';
import { ControlsComponent } from './controls/controls.component';
import { FormatCodePipe } from './code-generator/formatCode.pipe';
import { RadioGroupComponent } from './controls/radio-group/radio-group.component';
import { CheckboxComponent } from './controls/checkbox/checkbox.component';
import { SwitchComponent } from './controls/switch/switch.component';
import { CounterComponent } from './controls/counter/counter.component';
import { TypeSwitcherComponent } from './type-switcher/type-switcher.component';
import { HighlighterPipe } from './code-generator/highlighter.pipe';
import { ControlsPopoverComponent } from './controls-popover/controls-popover.component';
import { TextComponent } from './controls/text/text.component';
import { StaticCegComponent } from './static-ceg/static-ceg.component';
import { StaticCodeGeneratorComponent } from './code-generator/static-code-generator/static-code-generator.component';
import { DynamicCodeGeneratorComponent } from './code-generator/dynamic-code-generator/dynamic-code-generator.component';
import { PhoneShellComponent } from './phone-shell/phone-shell.component';

@NgModule({
  declarations: [
    CegComponent,
    StaticCegComponent,
    CodeGeneratorComponent,
    ControlsComponent,
    FormatCodePipe,
    RadioGroupComponent,
    CheckboxComponent,
    SwitchComponent,
    CounterComponent,
    TypeSwitcherComponent,
    HighlighterPipe,
    ControlsPopoverComponent,
    TextComponent,
    StaticCodeGeneratorComponent,
    DynamicCodeGeneratorComponent,
    PhoneShellComponent,
  ],
  exports: [CegComponent, StaticCegComponent, StaticCodeGeneratorComponent],
  imports: [CommonModule],
  providers: [FormatCodePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CegModule {}
