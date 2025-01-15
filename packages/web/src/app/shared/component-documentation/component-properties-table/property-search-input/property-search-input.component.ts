import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-search-input',
  templateUrl: './property-search-input.component.html',
  styleUrls: ['./property-search-input.component.scss'],
  imports: [FormsModule, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PropertySearchInputComponent {
  // @ts-expect-error TS2564 (LEGO-3683)
  @ViewChild('searchInputElement') inputElement: ElementRef<HTMLInputElement>;

  readonly search = output<string>();

  searchTerm = '';

  emitSearch(): void {
    this.search.emit(this.searchTerm);
  }

  clearSearchField(): void {
    this.searchTerm = '';
    this.emitSearch();
    this.inputElement.nativeElement?.focus();
  }
}
