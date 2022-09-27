import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderModule {}
