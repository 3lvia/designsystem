import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchMenuComponent } from './search-menu.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import '@elvia/elvis-divider';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [SearchMenuComponent],
})
export class SearchMenuModule {}
