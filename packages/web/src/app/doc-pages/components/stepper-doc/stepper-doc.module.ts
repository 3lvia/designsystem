import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { StepperDocComponent } from './stepper-doc.component';
import { StepperCegComponent } from './stepper-ceg/stepper-ceg.component';
import '@elvia/elvis-stepper';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [StepperDocComponent, StepperCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StepperDocModule {}
