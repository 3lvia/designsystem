import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentPropertiesTableComponent } from './component-properties-table.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ComponentPropertiesTableComponent],
  exports: [ComponentPropertiesTableComponent],
})
export class ComponentPropertiesTableModule {}
