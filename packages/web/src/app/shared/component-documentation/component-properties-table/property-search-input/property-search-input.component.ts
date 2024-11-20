import { NgClass } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-property-search-input',
    templateUrl: './property-search-input.component.html',
    styleUrls: ['./property-search-input.component.scss'],
    imports: [FormsModule, NgClass],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PropertySearchInputComponent {
  @ViewChild('searchInputElement') inputElement: ElementRef<HTMLInputElement>;

  @Output() search = new EventEmitter<string>();

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
