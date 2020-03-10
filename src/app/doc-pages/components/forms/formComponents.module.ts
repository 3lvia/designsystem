import { NgModule } from '@angular/core';
import { CheckboxDocModule } from './checkbox-doc/checkbox-doc.module';
import { CheckboxToggleDocModule } from './checkbox-toggle-doc/checkbox-toggle-doc.module';
import { InputDocModule } from './input-doc/input-doc.module';
import { RadiobuttonDocModule } from './radiobutton-doc/radiobutton-doc.module';
import { SelectDocModule } from './select-doc/select-doc.module';

@NgModule({
    imports: [
        CheckboxDocModule,
        CheckboxToggleDocModule,
        InputDocModule,
        RadiobuttonDocModule,
        SelectDocModule
    ],
})
export class FormComponentsModule { }

