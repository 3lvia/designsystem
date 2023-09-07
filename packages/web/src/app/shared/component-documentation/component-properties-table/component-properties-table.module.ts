import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentPropertiesTableComponent } from './component-properties-table.component';
import { FormsModule } from '@angular/forms';
import { PropertySearchInputComponent } from './property-search-input/property-search-input.component';
@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ComponentPropertiesTableComponent, PropertySearchInputComponent],
  exports: [ComponentPropertiesTableComponent],
})
export class ComponentPropertiesTableModule {}
