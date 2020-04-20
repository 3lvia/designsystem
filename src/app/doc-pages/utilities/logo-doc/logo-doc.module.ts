import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoDocComponent } from './logo-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule
  ],
  declarations: [LogoDocComponent]
})
export class LogoDocModule { }
