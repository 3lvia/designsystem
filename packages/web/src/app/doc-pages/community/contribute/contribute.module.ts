import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContributeComponent } from './contribute.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-structure/component-subsection/component-subsection.module';

@NgModule({
  imports: [CommonModule, ComponentHeaderModule, ComponentSubsectionModule],
  declarations: [ContributeComponent],
})
export class ContributeModule {}
