import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentPropertiesTableComponent } from './component-properties-table.component';
import { FormsModule } from '@angular/forms';
import { PropertySearchInputComponent } from './property-search-input/property-search-input.component';
import { PropertyTableDesktopComponent } from './property-table-desktop/property-table-desktop.component';
import { PropertyTableMobileComponent } from './property-table-mobile/property-table-mobile.component';
import { PropertyTableBaseDirective } from './table-base';
import { SearchHighlighterPipe } from '../../search-highlighter.pipe';
import { EscapeHTMLPipe } from '../../pipes/escape-html.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, SearchHighlighterPipe],
  declarations: [
    EscapeHTMLPipe,
    ComponentPropertiesTableComponent,
    PropertySearchInputComponent,
    PropertyTableDesktopComponent,
    PropertyTableMobileComponent,
    PropertyTableBaseDirective,
  ],
  exports: [ComponentPropertiesTableComponent],
})
export class ComponentPropertiesTableModule {}
