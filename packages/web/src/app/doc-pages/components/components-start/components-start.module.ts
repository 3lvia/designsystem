import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsStartComponent } from './components-start.component';
import { RouterModule } from '@angular/router';
import { PageStructureModule } from 'src/app/shared/page-structure/page-structure.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PageStructureModule
  ],
  declarations: [ComponentsStartComponent],
  exports: [ComponentsStartComponent]

})
export class ComponentsStartModule { }
