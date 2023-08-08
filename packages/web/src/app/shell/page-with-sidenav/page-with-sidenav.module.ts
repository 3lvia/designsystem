import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWithSidenavComponent } from './page-with-sidenav.component';
import { FeedbackModule } from '../../shared/feedback/feedback.module';
import { NavbarModule } from '../navbar/navbar.module';

@NgModule({
  declarations: [PageWithSidenavComponent],
  imports: [CommonModule, FeedbackModule, NavbarModule],
  exports: [PageWithSidenavComponent],
})
export class PageWithSidenavModule {}
