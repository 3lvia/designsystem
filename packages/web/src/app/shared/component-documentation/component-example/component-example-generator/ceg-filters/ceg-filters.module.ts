import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CegFiltersComponent } from './ceg-filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [CegFiltersComponent],
  exports: [CegFiltersComponent],
})
export class CegFiltersModule {}
