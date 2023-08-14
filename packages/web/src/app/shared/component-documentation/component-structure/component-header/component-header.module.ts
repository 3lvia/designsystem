import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentHeaderComponent } from './component-header.component';
import { RouterModule } from '@angular/router';
import { ComponentDocumentationDatePipe } from '../../component-documentation-date-pipe';
import { NavbarModule } from '../../../navbar/navbar.module';

@NgModule({
  imports: [CommonModule, RouterModule, ComponentDocumentationDatePipe, NavbarModule],
  exports: [ComponentHeaderComponent],
  declarations: [ComponentHeaderComponent],
})
export class ComponentHeaderModule {}
