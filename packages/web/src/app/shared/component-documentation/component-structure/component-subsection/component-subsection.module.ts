import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentSubsectionComponent } from './component-subsection.component';
import { CopyModule } from '../../../copy/copy.module';

@NgModule({
  imports: [CommonModule, CopyModule],
  declarations: [ComponentSubsectionComponent],
  exports: [ComponentSubsectionComponent],
})
export class ComponentSubsectionModule {}
