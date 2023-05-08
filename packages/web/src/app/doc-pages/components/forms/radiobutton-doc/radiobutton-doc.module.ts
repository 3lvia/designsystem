import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentExampleV1Module } from 'src/app/shared/component-documentation/component-example/component-example-v1/component-example-v1.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { RadiobuttonDocComponent } from './radiobutton-doc.component';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { RadiobuttonCegComponent } from './radiobutton-ceg/radiobutton-ceg.component';
import { RadiobuttonSmCegComponent } from './radiobutton-sm-ceg/radiobutton-sm-ceg.component';
import { RadiobuttonMdCegComponent } from './radiobutton-md-ceg/radiobutton-md-ceg.component';
import { RadiobuttonStatesCegComponent } from './radiobutton-states-ceg/radiobutton-states-ceg.component';
@NgModule({
  declarations: [
    RadiobuttonDocComponent,
    RadiobuttonCegComponent,
    RadiobuttonSmCegComponent,
    RadiobuttonMdCegComponent,
    RadiobuttonStatesCegComponent,
  ],
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentExampleV1Module,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    WhenToUseModule,
    RouterModule,
    ComponentChangelogModule,
    CegModule,
  ],
})
export class RadiobuttonDocModule {}
