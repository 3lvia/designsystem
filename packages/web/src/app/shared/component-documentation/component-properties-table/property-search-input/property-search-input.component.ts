import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, output, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-search-input',
  templateUrl: './property-search-input.component.html',
  styleUrls: ['./property-search-input.component.scss'],
  imports: [FormsModule, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PropertySearchInputComponent {
  private readonly inputElement = viewChild.required<ElementRef<HTMLInputElement>>('searchInputElement');

  readonly search = output<string>();

  searchTerm = '';

  emitSearch(): void {
    this.search.emit(this.searchTerm);
  }

  clearSearchField(): void {
    this.searchTerm = '';
    this.emitSearch();
    this.inputElement().nativeElement?.focus();
  }
}
