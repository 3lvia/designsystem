import { NgModule } from '@angular/core';
import { RadiobuttonDocComponent } from './radiobutton-doc.component';
import { RadiobuttonCegComponent } from './radiobutton-ceg/radiobutton-ceg.component';
import { RadiobuttonSmCegComponent } from './radiobutton-sm-ceg/radiobutton-sm-ceg.component';
import { RadiobuttonMdCegComponent } from './radiobutton-md-ceg/radiobutton-md-ceg.component';
import { RadiobuttonStatesCegComponent } from './radiobutton-states-ceg/radiobutton-states-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';
@NgModule({
  declarations: [
    RadiobuttonDocComponent,
    RadiobuttonCegComponent,
    RadiobuttonSmCegComponent,
    RadiobuttonMdCegComponent,
    RadiobuttonStatesCegComponent,
  ],
  imports: [SharedDocumentationModule],
})
export class RadiobuttonDocModule {}
