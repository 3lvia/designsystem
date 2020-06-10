import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityStartComponent } from './accessibility-start.component';
import { RouterModule } from '@angular/router';
import { NavbarModule } from 'src/app/shell/navbar/navbar.module';
import { PageStructureModule } from 'src/app/shared/page-structure/page-structure.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NavbarModule,
    PageStructureModule
  ],
  declarations: [AccessibilityStartComponent],
  exports: [AccessibilityStartComponent]
})
export class AccessibilityStartModule { }
