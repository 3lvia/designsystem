import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentHeaderComponent } from './component-header.component';
import { RouterModule } from '@angular/router';
import { ComponentDocumentationDatePipe } from '../../component-documentation-date-pipe';

@NgModule({
  imports: [CommonModule, RouterModule, ComponentDocumentationDatePipe],
  exports: [ComponentHeaderComponent],
  declarations: [ComponentHeaderComponent],
})
export class ComponentHeaderModule {}
