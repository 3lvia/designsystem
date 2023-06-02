import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoDontComponent } from './do-dont.component';
import { CegModule } from '../component-documentation/ceg/ceg.module';

@NgModule({
  imports: [CommonModule, CegModule],
  exports: [DoDontComponent],
  declarations: [DoDontComponent],
})
export class DoDontModule {}
