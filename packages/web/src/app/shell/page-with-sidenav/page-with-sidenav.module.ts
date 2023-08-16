import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWithSidenavComponent } from './page-with-sidenav.component';
import { FeedbackModule } from '../../shared/feedback/feedback.module';
import { NavbarModule } from '../../shared/navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { ViewportSizeModule } from '../../shared/viewport-size/viewport-size.module';

@NgModule({
  declarations: [PageWithSidenavComponent],
  imports: [CommonModule, RouterModule, FeedbackModule, NavbarModule, ViewportSizeModule],
  exports: [PageWithSidenavComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PageWithSidenavModule {}
