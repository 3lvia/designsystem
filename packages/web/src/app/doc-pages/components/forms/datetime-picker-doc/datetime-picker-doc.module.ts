import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatetimePickerDocComponent } from './datetime-picker-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { RouterModule } from '@angular/router';
import { CodeBlockModule } from 'src/app/shared/component-documentation/component-example/component-example-v1/component-example-v1.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    RouterModule,
    CodeBlockModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    WhenToUseModule,
  ],
  declarations: [DatetimePickerDocComponent],
})
export class DatetimePickerDocModule {}
