import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchMenuComponent } from './search-menu.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [SearchMenuComponent],
})
export class SearchMenuModule { }
