import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentHeaderComponent } from './component-header.component';
import { RouterModule } from '@angular/router';
import { CopyModule } from 'src/app/shared/copy/copy.module';

@NgModule({
  imports: [CommonModule, RouterModule, CopyModule],
  exports: [ComponentHeaderComponent],
  declarations: [ComponentHeaderComponent],
})
export class ComponentHeaderModule {}
