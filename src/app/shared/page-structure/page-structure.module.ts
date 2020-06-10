import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageStructureComponent } from './page-structure.component';
import { NavbarModule } from 'src/app/shell/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule
  ],
  declarations: [PageStructureComponent],
  exports: [PageStructureComponent],
})
export class PageStructureModule { }
