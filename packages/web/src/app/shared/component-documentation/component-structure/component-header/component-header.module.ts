import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentHeaderComponent } from './component-header.component';
import { RouterModule } from '@angular/router';
import { ComponentDocumentationDatePipe } from '../../component-documentation-date-pipe';
import { NavbarModule } from '../../../navbar/navbar.module';
import { ViewportSizeModule } from '../../../viewport-size/viewport-size.module';
import { ComponentHeaderQuickInstallComponent } from './component-header-quick-install/component-header-quick-install.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ComponentDocumentationDatePipe,
    NavbarModule,
    ViewportSizeModule,
    ComponentHeaderQuickInstallComponent,
  ],
  exports: [ComponentHeaderComponent],
  declarations: [ComponentHeaderComponent],
})
export class ComponentHeaderModule {}
