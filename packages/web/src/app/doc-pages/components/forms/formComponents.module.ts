import { NgModule } from '@angular/core';
import { CheckboxDocModule } from './checkbox-doc/checkbox-doc.module';
import { ToggleDocModule } from './toggle-doc/toggle-doc.module';
import { InputDocModule } from './input-doc/input-doc.module';
import { RadiobuttonDocModule } from './radiobutton-doc/radiobutton-doc.module';
import { SelectDocModule } from './select-doc/select-doc.module';
import { SegmentedControlsDocModule } from './segmented-controls-doc/segmented-controls-doc.module';
import { DraganddropDocModule } from './draganddrop-doc/draganddrop-doc.module';
import { DatepickerDocModule } from './datepicker-doc/datepicker-doc.module';
import { SearchDocModule } from './search-doc/search-doc.module';

@NgModule({
  imports: [
    CheckboxDocModule,
    ToggleDocModule,
    DatepickerDocModule,
    DraganddropDocModule,
    InputDocModule,
    RadiobuttonDocModule,
    SegmentedControlsDocModule,
    SelectDocModule,
    SearchDocModule,
  ],
})
export class FormComponentsModule {}
