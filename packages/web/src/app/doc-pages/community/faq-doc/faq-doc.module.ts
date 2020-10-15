import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqDocComponent } from './faq-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, ComponentHeaderModule, RouterModule],
  declarations: [FaqDocComponent],
})
export class FaqDocModule { }
