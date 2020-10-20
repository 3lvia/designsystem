import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFeedbackDocComponent } from './user-feedback-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { DoDontModule } from 'src/app/shared/do-dont/do-dont.module';
import { ComponentSectionModule } from 'src/app/shared/component-structure/component-section/component-section.module';


@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    DoDontModule,
    ComponentSectionModule,

  ],
  declarations: [UserFeedbackDocComponent],
})
export class UserFeedbackDocModule { }
