import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqDocComponent } from './faq-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { RouterModule } from '@angular/router';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';

@NgModule({
  imports: [CommonModule, ComponentHeaderModule, RouterModule, ComponentSubsubsectionModule],
  declarations: [FaqDocComponent],
})
export class FaqDocModule {}
