import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltTextComponent } from './alt-text.component';
import { DoDontModule } from 'src/app/shared/do-dont/do-dont.module';


@NgModule({
  imports: [
    CommonModule,
    DoDontModule
  ],
  declarations: [AltTextComponent]
})
export class AltTextModule { }
