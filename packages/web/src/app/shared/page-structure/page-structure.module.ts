import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageStructureComponent } from './page-structure.component';
import { NavbarModule } from 'src/app/shell/navbar/navbar.module';
import { FeedbackModule } from '../feedback/feedback.module';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    FeedbackModule,
  ],
  declarations: [PageStructureComponent],
  exports: [PageStructureComponent],
})
export class PageStructureModule { }
