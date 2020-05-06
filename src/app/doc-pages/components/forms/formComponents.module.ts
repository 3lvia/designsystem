import { NgModule } from '@angular/core';
import { CheckboxDocModule } from './checkbox-doc/checkbox-doc.module';
import { CheckboxToggleDocModule } from './checkbox-toggle-doc/checkbox-toggle-doc.module';
import { InputDocModule } from './input-doc/input-doc.module';
import { RadiobuttonDocModule } from './radiobutton-doc/radiobutton-doc.module';
import { SelectDocModule } from './select-doc/select-doc.module';
import { SegmentedControlsDocModule } from './segmented-controls-doc/segmented-controls-doc.module';
import { DraganddropDocModule } from './draganddrop-doc/draganddrop-doc.module';

@NgModule({
    imports: [
        CheckboxDocModule,
        CheckboxToggleDocModule,
        DraganddropDocModule,
        InputDocModule,
        RadiobuttonDocModule,
        SegmentedControlsDocModule,
        SelectDocModule
    ],
})
export class FormComponentsModule { }

