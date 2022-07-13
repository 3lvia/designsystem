import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CegFiltersComponent } from './ceg-filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VisibleFieldsPipe } from './ceg-filters-visibility.pipe';
import { CheckboxChildFieldsPipe } from './ceg-filters-checkbox-child.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [CegFiltersComponent, VisibleFieldsPipe, CheckboxChildFieldsPipe],
  exports: [CegFiltersComponent],
})
export class CegFiltersModule {}
