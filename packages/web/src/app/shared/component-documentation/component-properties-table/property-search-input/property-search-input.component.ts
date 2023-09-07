import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-property-search-input',
  templateUrl: './property-search-input.component.html',
  styleUrls: ['./property-search-input.component.scss'],
})
export class PropertySearchInputComponent {
  @Output() search = new EventEmitter<string>();

  searchTerm = '';

  emitSearch(): void {
    this.search.emit(this.searchTerm);
  }

  clearSearchField(): void {
    this.searchTerm = '';
    this.emitSearch();
  }
}
