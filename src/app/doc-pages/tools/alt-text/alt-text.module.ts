import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltTextComponent } from './alt-text.component';
import { DoDontModule } from 'src/app/shared/do-dont/do-dont.module';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';


@NgModule({
  imports: [
    CommonModule,
    DoDontModule,
    ComponentHeaderModule
  ],
  declarations: [AltTextComponent]
})
export class AltTextModule { }
